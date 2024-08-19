import { Account } from "../accounts";
import { Contact, Qr } from "../common";
import { Answer, Notification, Reason } from "../notification";

interface VerifyContactRequested {
    requestId: string;
}


/**
 * Interface representing the payload for verifying a contact.
 *
 * This interface represents the payload that is sent when a user verifies a
 * contact. It contains the requestId and the code that was sent to the user.
 */
interface VerifyContactPayload {
    /**
     * The id of the request.
     */
    requestId: string;

    /**
     * The code that was sent to the user for verification.
     */
    code: string;
}


/**
 * Interface representing the request for logging in.
 *
 * This interface represents the request sent when a user wants to log in.
 * It contains the phone number of the user.
 */
export interface LoginRequest {
    /**
     * The phone number of the user.
     */
    phoneNumber: string;
}

export type LoginResponse = VerifyContactRequested;

export type VerifyLoginRequest = VerifyContactPayload;

/**
 * Interface representing the response from a login attempt.
 *
 * This interface represents the response that is sent back when a user
 * attempts to log in.
 */
export interface VerifyLoginResponse {
    /**
     * The token that the user should use to authorize future requests.
     */
    token: string;
}

/**
 * Interface representing the response from a GetAccount request.
 *
 * This interface represents the response that is sent back when a user
 * requests their account information.
 */
export interface GetAccountResponse {
    /**
     * The account of the user.
     */
    account: Account;
    /**
     * The QR codes associated with the account.
     */
    qrs: Qr[];
}

/**
 * Interface representing the request to update a contact.
 *
 * This interface represents the request that is sent when a user wants to
 * update their contact information.
 */
export interface UpdateContactsRequest {
    /**
     * The contact information to be updated.
     */
    contact: Contact;
}

export type UpdateContactsResponse = VerifyContactRequested;

export type VerifyContactRequest = VerifyContactPayload;

export type VerifyContactResponse = GetAccountResponse;

/**
 * Interface representing the request to send a notification.
 *
 * This interface represents the request that is sent when a user wants to
 * send a notification. It contains the id of the QR code associated with
 * the account.
 */
export interface SendNotificationRequest {
    /**
     * The id of the QR code associated with the account.
     */
    qr: Pick<Qr, 'id'>;
}

/**
 * Interface representing the response from a notification request.
 *
 * This interface represents the response that is sent when a user requests
 * to send a notification.
 */
export interface SendNotificationResponse {
    /**
     * The notification that was sent.
     */
    notification: Notification;
    /**
     * The answer to the notification, if any.
     */
    answer?: Answer;
    /**
     * The contact information of the account.
     */
    contact?: Contact;
}

/**
 * Interface representing the request to update a notification.
 *
 * This interface represents the request that is sent when a user wants to
 * update a notification.
 */
export interface UpdateNotificationRequest {
    /**
     * The id of the reason associated with the notification.
     */
    reason: Pick<Reason, 'id'>;
}

export type UpdateNotificationResponse = SendNotificationResponse;