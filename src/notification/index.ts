import { Account } from "../common";


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
export interface Notification {
    /**
     * The unique identifier of the notification.
     */
    id: string;

    /**
     * The unique identifier of the reason for the notification.
     */
    reasonId: string;

    /**
     * The date and time when the notification was sent.
     */
    sentAt: Date;
}

/**
 * Represents the structure of an answer to a notification.
 */
export interface Answer {
    /**
     * The message of the answer.
     */
    message: string;

    /**
     * The date and time when the answer was received.
     */
    receivedAt: Date;
}

/**
 * Represents a request to send a notification.
 */
export interface SendNotificationRequest {
    /**
     * The account that the notification is being sent to.
     */
    account: Account;

    /**
     * The notification to be sent. This can be a partial notification where
     * only the reasonId is specified.
     */
    notification: Partial<Pick<Notification, "reasonId">>;
}

/**
 * Represents the response from the SendNotification request.
 */
export interface SendNotificationResponse {
    /**
     * The notification that was sent.
     */
    notification: Notification;

    /**
     * The answer from the user, if any.
     */
    answer?: Answer;
}
