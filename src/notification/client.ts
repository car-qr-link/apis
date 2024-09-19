import { HttpClient } from "../common";
import { GetReasonsResponse, SendNotificationRequest, SendNotificationResponse } from "./dto";

export class Client extends HttpClient {
    constructor(
        protected readonly baseUrl: string
    ) {
        super();
    }

    async getReasons(): Promise<GetReasonsResponse> {
        const response = await fetch(`${this.baseUrl}/notifications/reasons`);

        return await this.throwOnError(response);
    }

    async sendNotification(
        request: SendNotificationRequest
    ): Promise<SendNotificationResponse> {
        const response = await fetch(`${this.baseUrl}/notifications`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        });

        return await this.throwOnError(response);
    }
}
