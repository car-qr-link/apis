import EventEmitter from "events";
import { ClientClosedError, createClient, RedisClientType } from "redis";

export class SubscribeOptions {
    public readonly interval: number;
    public readonly waitTime: number;

    public constructor(interval: number, waitTime: number) {
        if (waitTime > interval) {
            throw new Error('waitTime must be less than interval');
        }

        if (waitTime <= 0) {
            throw new Error('waitTime must be greater than or equal to 0');
        }

        if (interval <= 0) {
            throw new Error('interval must be greater than or equal to 0');
        }

        this.interval = interval;
        this.waitTime = waitTime;
    }
}

export abstract class QueueClient<O, I> extends EventEmitter<{ error: [Error] }> {
    protected readonly client: RedisClientType;

    public constructor(brokerUrl: string) {
        super();
        this.client = createClient({ url: brokerUrl });
        this.client.on('error', (err) => {
            throw err;
        })
    }

    public async start() {
        await this.client.connect();
    }

    public async subscribe(
        queueName: string,
        callback: (queueName: string, message: I) => Promise<void>,
        options?: SubscribeOptions
    ): Promise<() => void> {
        let isRunning = true;

        const readNext = async () => {
            let interval = options?.interval || 1;
            try {
                const message = await this.client.brPop(queueName, options?.waitTime || 0.5);
                if (!message) {
                    return;
                }

                const payload = JSON.parse(message.element);
                if (!payload) {
                    this.emit('error', new Error(`Invalid payload: ${message.element}`));
                    return;
                }

                await callback(message.key, payload);
                interval = 0;
            } catch (e) {
                if (e instanceof ClientClosedError) {
                    isRunning = false;
                    return;
                }

                if (e instanceof Error) {
                    this.emit('error', e);
                } else {
                    this.emit('error', new Error(`Unknown error: ${e}`));
                }
            } finally {
                if (!isRunning) {
                    return;
                }

                timer = setTimeout(readNext, interval);
            }
        };

        let timer = setTimeout(async () => {
            await readNext();
        }, 0);

        return () => {
            isRunning = false;
            clearTimeout(timer);
        };
    }

    public async publish(queueName: string, message: O) {
        await this.client.lPush(queueName, JSON.stringify(message));
    }

    public async close() {
        await this.client.quit();
    }
}
