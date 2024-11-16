import { BaseAccount, Qr } from "../common";


/**
 * Interface representing an Account.
 *
 * This interface extends the BaseAccount interface.
 */
export interface Account extends BaseAccount {
    /**
     * User name. Optional.
     */
    name?: string;
}

/**
 * Interface representing the response from a GetAccounts request.
 */
export interface GetAccountsResponse {
    /**
     * The accounts that match the filters.
     */
    accounts: Account[];
}

export const enum GetAccountFieldParam {
    ID = "id",
    PHONE = "phone",
}

/**
 * Interface representing the response from a FindAccount request.
 */
export interface GetAccountResponse {
    /**
     * The account data.
     */
    account: Account;

    /**
     * The QRs associated with the account.
     */
    qrs: Qr[];
}

/**
 * Interface representing the request to edit an account.
 */
export interface EditAccountRequest {
    /**
     * The account data to update.
     */
    account: Omit<Account, "id">;
}

export type EditAccountResponse = GetAccountResponse;

/**
 * Interface representing the request parameters for getting QRs associated with an account.
 */
export interface GetQrsParams {
    /**
     * The ID of the account to get QRs for.
     * If it is empty or `null`, it will return all QRs not associated with any account.
     * If it is not provided, it will return all QRs.
     */
    accountId?: string | null;
}

/**
 * Interface representing the response from a GetQrs request.
 */
export interface GetQrsResponse {
    /**
     * An array of QR codes.
     */
    qrs: Qr[];
}

/**
 * Interface representing the response from a GetQr request.
 */
export interface GetQrResponse {
    /**
     * The QR code.
     */
    qr: Qr;

    /**
     * The account the QR code is associated with, if any.
     */
    account?: Account;
}

/**
 * Interface representing the request to generate QR codes.
 */
export interface EmitQrsRequest {
    /**
     * The number of QR codes to generate.
     */
    count: number;

    /**
     * The length of each QR code.
     */
    length: number;
}

export type EmitQrsResponse = GetQrsResponse;

/**
 * Interface representing the request to link a QR to an account.
 */
export interface LinkQrRequest {
    /**
     * The account data.
     */
    account: Omit<Account, "id">;

    /**
     * The QR to link to the account.
     */
    qr: Pick<Qr, "licensePlate">;
}

export type LinkQrResponse = GetQrResponse;
