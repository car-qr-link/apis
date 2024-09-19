import { URLSearchParams } from "url";
import { ErrorResponse, HttpError } from "../common";
import { EditAccountRequest, EditAccountResponse, EmitQrsRequest, EmitQrsResponse, GetAccountFieldParam, GetAccountResponse, GetAccountsResponse, GetQrResponse, GetQrsResponse, LinkQrRequest, LinkQrResponse } from "./dto";

export class Client {
    constructor(
        protected readonly baseUrl: string
    ) {
    }

    //#region Accounts
    async getAccounts(): Promise<GetAccountsResponse> {
        const response = await fetch(`${this.baseUrl}/accounts`);

        return await this.throwOnError(response);
    }

    async getAccount(
        id: string
    ): Promise<GetAccountResponse> {
        return await this.searchAccount(id);
    }

    async searchAccount(
        value: string,
        field: GetAccountFieldParam = GetAccountFieldParam.ID
    ): Promise<GetAccountResponse> {
        const query = new URLSearchParams({ field });

        const response = await fetch(`${this.baseUrl}/accounts/${value}?${query.toString()}`);

        return await this.throwOnError(response);
    }

    async patchAccount(
        id: string,
        request: EditAccountRequest
    ): Promise<EditAccountResponse> {
        const response = await fetch(`${this.baseUrl}/accounts/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        });

        return await this.throwOnError(response);
    }
    //#endregion

    //#region QRs
    async getQr(
        id: string
    ): Promise<GetQrResponse> {
        const response = await fetch(`${this.baseUrl}/qrs/${id}`);

        return await this.throwOnError(response);
    }

    async getQrs(
        accountId: string | null | undefined = undefined
    ): Promise<GetQrsResponse> {
        const query = accountId === undefined
            ? new URLSearchParams()
            : new URLSearchParams({ accountId: accountId || '' });

        const response = await fetch(`${this.baseUrl}/qrs?${query.toString()}`);

        return await this.throwOnError(response);
    }

    async postEmitQrs(
        request: EmitQrsRequest
    ): Promise<EmitQrsResponse> {
        const response = await fetch(`${this.baseUrl}/qrs/emit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        });

        return await this.throwOnError(response);
    }

    async patchQr(
        id: string,
        request: LinkQrRequest
    ): Promise<LinkQrResponse> {
        const response = await fetch(`${this.baseUrl}/qrs/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        });

        return await this.throwOnError(response);
    }
    //#endregion

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

export class BadRequestError extends HttpError { }

export class NotFoundError extends HttpError { }

export class ConflictError extends HttpError { }