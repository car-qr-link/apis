import { ErrorResponse } from "./dto";
import { BaseError } from "./errors";

export class HttpError extends BaseError {
    constructor(message: string, public readonly status: number) {
        super(message);
    }
}

export class BadRequestError extends HttpError {
    constructor(message: string) {
        super(message, 400);
    }
}

export class NotFoundError extends HttpError {
    constructor(message: string) {
        super(message, 404);
    }
}

export class ConflictError extends HttpError {
    constructor(message: string) {
        super(message, 409);
    }
}

export abstract class HttpClient {
    protected async throwOnError<T>(response: Response): Promise<T> {
        if (response.ok) {
            return await response.json();
        }

        const body = await response.json();
        const { message } = body as ErrorResponse;

        switch (response.status) {
            case 400:
                throw new BadRequestError(message);
            case 404:
                throw new NotFoundError(message);
            case 409:
                throw new ConflictError(message);
        }

        throw new HttpError(message, response.status);
    }
}
