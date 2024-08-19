import { BaseAccount as BaseAccount, Contact, Qr } from "../common";

export interface Account extends BaseAccount {
    name?: string;
}

export interface GetByQrParams {
    qr: Qr;
}

export interface GetContactParams {
    contact: Contact;
}

export type FindAccountRequest = GetByQrParams | GetContactParams;

export interface FindAccountResponse {
    account: Account;
    qrs: Qr[];
}

export interface LinkQRRequest {
    account: Omit<Account, "id">;
    qr: Qr;
}

export type LinkQrResponse = FindAccountResponse;

export interface EditAccountRequest {
    account: Omit<Account, "id">;
}

export type EditAccountResponse = FindAccountResponse;
