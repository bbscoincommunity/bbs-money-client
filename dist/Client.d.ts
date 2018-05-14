import WalletClient from "./Wallet/WalletClient";
export interface ClientConfiguration {
    appId: string;
    appKey: string;
}
export interface BBSMoneyResponse {
}
declare class Client {
    private appId;
    private appKey;
    wallet: WalletClient;
    constructor(config: ClientConfiguration);
    request(method: 'POST' | 'GET', uri: string, data: object, authentication?: boolean): BBSMoneyResponse;
}
export default Client;
