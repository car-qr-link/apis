import { NotificationChannel } from "../common";


/**
 * An interface representing a message to be sent.
 */
export interface SendMessage {
    /**
     * The channel through which the message should be sent.
     */
    channel: NotificationChannel;

    /**
     * The message to be sent.
     */
    message: string;

    /**
     * The recipient of the message.
     */
    to: string;

    /**
     * Whether the message is a notification.
     */
    isNotification?: boolean;
}


/**
 * An interface representing a received message.
 */
export interface MessageReceived {
    /**
     * The channel through which the message was received.
     */
    channel: NotificationChannel;

    /**
     * The message that was received.
     */
    message: string;

    /**
     * The sender of the message.
     */
    from: string;
}


export * from './schemas';