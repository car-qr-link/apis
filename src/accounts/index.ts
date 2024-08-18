import { Account as BaseAccount, Contact } from "../common";

export interface Account extends BaseAccount {
    name?: string;
    licensePlate?: string;
}

export interface GetByQrParams {
    qrId: string;
}

export interface GetContactParams {
    contact: Contact;
}

export type FindAccountRequest = GetByQrParams | GetContactParams;

export interface FindAccountResponse {
    account: Account;
}

export interface LinkQRRequest {
    account: Omit<Account, "id">;
    qrId: string;
}

export type LinkQrResponse = FindAccountResponse;

export interface EditAccountRequest {
    account: Omit<Account, "id">;
}

export type EditAccountResponse = FindAccountResponse;
