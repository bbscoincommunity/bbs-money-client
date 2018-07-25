import { Client } from './Client';
export interface WebhookCreationResponse {
    webhookId: string;
}
export declare class Webhook {
    private client;
    constructor(client: Client);
    createOnTransactionConfirmed(hash: string): Promise<WebhookCreationResponse>;
    createOnNewTransaction(): Promise<WebhookCreationResponse>;
}
