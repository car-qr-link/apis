export enum NotificationChannel {
    Phone = 'phone',
    Email = 'email',
    Telegram = 'telegram',
}

/**
 * An interface representing a contact information.
 */
export interface Contact {
    /**
     * The notification channel for the contact.
     */
    channel: NotificationChannel;
    /**
     * The address of the contact.
     */
    address: string;
}

/**
 * An interface representing an account.
 */
export interface BaseAccount {
    /**
     * The unique identifier of the account.
     */
    id: string;

    /**
     * Contacts associated with the account.
     */
    contacts: Contact[];
}

/**
 * An interface representing a QR code.
 */
export interface Qr {
    /**
     * The unique identifier of the QR code.
     */
    id: string;

    /**
     * The license plate number associated with the QR code.
     *
     * This field is optional and may not be present for all QR codes.
     */
    licensePlate?: string;

    /**
     * The account ID associated with the QR code.
     */
    accountId?: string;
}

/**
 * An interface representing an error response.
 */
export interface ErrorResponse {
    /**
     * The error message.
     */
    message: string;

    /**
     * Additional details about the error.
     *
     * This field can contain any type of data, as it is meant to carry
     * additional information about the error. The type of the data can
     * vary depending on the specific error.
     */
    details: any;
}
