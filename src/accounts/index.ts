import { BaseAccount as BaseAccount, Contact, Qr } from "../common";


/**
 * Interface representing an Account.
 *
 * This interface extends the BaseAccount interface and adds an optional
 * 'name' field.
 */
export interface Account extends BaseAccount {
    /**
     * User name. Optional.
     */
    name?: string;
}


/**
 * Interface representing the parameters for getting an account by QR.
 */
export interface GetByQrParams {
    /**
     * The QR object used to identify the account.
     */
    qr: Qr;
}

/**
 * Interface representing the parameters for getting an account by contact.
 */
export interface GetByContactParams {
    /**
     * The contact object used to identify the account.
     */
    contact: Contact;
}


/**
 * Union type representing the possible request types for finding an account.
 *
 * This type is used to represent the different ways in which an account can be
 * found. It can be either a `GetByQrParams` object or a `GetByContactParams`
 * object.
 */
export type FindAccountRequest =
    GetByQrParams |
    GetByContactParams;

/**
 * Interface representing the response from a FindAccount request.
 */
export interface FindAccountResponse {
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
 * Interface representing the request to link a QR to an account.
 */
export interface LinkQRRequest {
    /**
     * The account data.
     */
    account: Omit<Account, "id">;

    /**
     * The QR to link to the account.
     */
    qr: Qr;
}

export type LinkQrResponse = FindAccountResponse;

/**
 * Interface representing the request to edit an account.
 */
export interface EditAccountRequest {
    /**
     * The account data to update.
     */
    account: Omit<Account, "id">;
}

export type EditAccountResponse = FindAccountResponse;
