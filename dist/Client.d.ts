import { Wallet } from './Wallet';
import { Info } from './Info';
import { Webhook } from './Webhook';
export interface ClientConfiguration {
    host?: string;
    appId: string;
    appKey: string;
}
export interface Response {
    success: boolean;
}
export interface SuccessResponse extends Response {
    data: any;
}
export interface ErrorResponse extends Response {
    code: string;
    message: string;
}
export declare class Client {
    wallet: Wallet;
    info: Info;
    webhook: Webhook;
    private host;
    private appId;
    private appKey;
    constructor(config: ClientConfiguration);
    private getSignature(data, timestamp);
    request(method: 'POST' | 'GET', uri: string, data?: object | null, authentication?: boolean): Promise<SuccessResponse>;
}
