import { Client } from './Client';
export interface WebhookResponse {
    id: string;
    action: string;
    params: string[];
    result?: string;
    lastCall?: Date;
}
export interface WebhookCreationResponse {
    webhookId: string;
}
export declare class Webhook {
    private client;
    constructor(client: Client);
    createOnTransactionConfirmed(hash: string): Promise<WebhookCreationResponse>;
    createOnNewTransaction(): Promise<WebhookCreationResponse>;
    list(): Promise<WebhookResponse[]>;
}
