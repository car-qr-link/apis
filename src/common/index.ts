export enum NotificationChannel {
    Sms = 'sms',
    Email = 'email',
    Telegram = 'telegram',
}

/**
 * An interface representing a contact information.
 */
export interface Contact {
    /**
     * The address of the contact.
     */
    address: string;
}

/**
 * An interface representing an account.
 */
export interface Account {
    /**
     * The unique identifier of the account.
     */
    id: string;

    /**
     * A map of notification channels to contact information.
     *
     * The keys of the map are the notification channels, and the values
     * are the contact information for the corresponding channels.
     */
    contacts: Record<NotificationChannel, Contact>;
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
