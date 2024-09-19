import { URLSearchParams } from "url";
import { ErrorResponse, HttpClient, HttpError } from "../common";
import { EditAccountRequest, EditAccountResponse, EmitQrsRequest, EmitQrsResponse, GetAccountFieldParam, GetAccountResponse, GetAccountsResponse, GetQrResponse, GetQrsResponse, LinkQrRequest, LinkQrResponse } from "./dto";

export class Client extends HttpClient {
    constructor(
        protected readonly baseUrl: string
    ) {
        super();
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
}
