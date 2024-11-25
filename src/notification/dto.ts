import { Type } from "class-transformer";
import { BaseAccount } from "../common";


/**
 * Reason interface.
 *
 * This interface represents a reason for sending a notification. It contains
 * an id and a title.
 */
export interface Reason {
    /**
     * The unique identifier of the reason.
     */
    id: string;

    /**
     * The title of the reason.
     */
    title: string;
}


/**
 * Represents the response structure for the GetReasons request.
 */
export interface GetReasonsResponse {
    /**
     * An array of reasons. Each reason is represented by the Reason interface.
     */
    reasons: Reason[];
}

/**
 * Notification interface.
 */
export class Notification {
    /**
     * The unique identifier of the notification.
     */
    id: string;

    /**
     * The unique identifier of the reason for the notification.
     */
    reasonId?: string;

    /**
     * The date and time when the notification was sent.
     */
    @Type(() => Date)
    sentAt: Date;

    /**
     * Constructs a new Notification instance.
     *
     * @param id The unique identifier of the notification.
     * @param reasonId The unique identifier of the reason for the notification.
     * @param sentAt The date and time when the notification was sent. If not provided, the current date and time will be used.
     */
    constructor(id: string, reasonId?: string, sentAt?: Date) {
        this.id = id;
        this.reasonId = reasonId;
        this.sentAt = sentAt ?? new Date();
    }
}

/**
 * Represents the structure of an answer to a notification.
 */
export class Answer {
    /**
     * The message of the answer.
     */
    message: string;

    /**
     * The date and time when the answer was received.
     */
    @Type(() => Date)
    receivedAt: Date;

    /**
     * Constructs a new Answer.
     *
     * @param message The message of the answer.
     * @param receivedAt The date and time when the answer was received. If not provided, the current date and time will be used.
     */
    constructor(message: string, receivedAt?: Date) {
        this.message = message;
        this.receivedAt = receivedAt ?? new Date();
    }
}

/**
 * Represents a request to send a notification.
 */
export interface SendNotificationRequest {
    /**
     * The account that the notification is being sent to.
     */
    account: BaseAccount;

    /**
     * The notification to be sent. This can be a partial notification where
     * only the reasonId is specified.
     */
    notification: Partial<Pick<Notification, "reasonId">>;
}

/**
 * Represents the response from the SendNotification request.
 */
export class SendNotificationResponse {
    /**
     * The notification that was sent.
     */
    @Type(() => Notification)
    notification: Notification;

    /**
     * The answer from the user, if any.
     */
    @Type(() => Answer)
    answer?: Answer;

    /**
     * Constructs a new SendNotificationResponse.
     *
     * @param notification The notification that was sent.
     * @param answer The answer from the user, if any.
     */
    constructor(notification: Notification, answer?: Answer) {
        this.notification = notification;
        this.answer = answer;
    }
}
