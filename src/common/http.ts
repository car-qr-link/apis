import { ErrorResponse } from "./dto";
import { BaseError } from "./errors";

export class HttpError extends BaseError {
    constructor(message: string, public readonly status: number) {
        super(message);
    }
}

export class BadRequestError extends HttpError { }

export class NotFoundError extends HttpError { }

export class ConflictError extends HttpError { }

export abstract class HttpClient {
    protected async throwOnError<T>(response: Response): Promise<T> {
        if (response.ok) {
            return await response.json();
        }

        const body = await response.json();
        const { message } = body as ErrorResponse;

        switch (response.status) {
            case 400:
                throw new BadRequestError(message, response.status);
            case 404:
                throw new NotFoundError(message, response.status);
            case 409:
                throw new ConflictError(message, response.status);
        }

        throw new HttpError(message, response.status);
    }
}
