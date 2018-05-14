import { Wallet } from './Wallet';
import { Info } from './Info';
export interface ClientConfiguration {
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
    static readonly HOST: string;
    wallet: Wallet;
    info: Info;
    private appId;
    private appKey;
    constructor(config: ClientConfiguration);
    private getSignature(data, timestamp);
    request(method: 'POST' | 'GET', uri: string, data?: object | null, authentication?: boolean): Promise<SuccessResponse>;
}
