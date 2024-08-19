import { Account } from "../accounts";
import { Contact, Qr } from "../common";
import { Notification, Reason } from "../notification";

interface VerifyContactRequested {
    requestId: string;
}

interface VerifyContactPayload {
    requestId: string;
    code: string;
}

export interface LoginRequest {
    phoneNumber: string;
}

export type LoginResponse = VerifyContactRequested;

export type VerifyLoginRequest = VerifyContactPayload;

export interface VerifyLoginResponse {
    token: string;
}

export interface GetAccountResponse {
    account: Account;
    qrs: Qr[];
}

export interface UpdateContactsRequest {
    contact: Contact;
}

export type UpdateContactsResponse = VerifyContactRequested;

export type VerifyContactRequest = VerifyContactPayload;

export type VerifyContactResponse = GetAccountResponse;

export interface SendNotificationRequest {
    qr: Pick<Qr, 'id'>;
}

export interface SendNotificationResponse {
    notification: Pick<Notification, 'id'>;
}

export interface UpdateNotificationRequest {
    reason: Pick<Reason, 'id'>;
}

export type UpdateNotificationResponse = SendNotificationResponse;