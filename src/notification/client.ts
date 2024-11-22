import { plainToInstance } from "class-transformer";
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

    /**
     * Sends a notification to the specified account.
     *
     * @param request The request containing the account and the notification.
     * @returns A response containing the notification that was sent and the answer of the user, if any.
     */
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

        return plainToInstance(SendNotificationResponse, await this.throwOnError(response));
    }
}
