import { Client } from './Client';

export interface WebhookResponse {
  id: string,
  action: string,
  params: string[],
  result?: string,
  lastCall?: Date
}

export interface WebhookCreationResponse {
  webhookId: string;
}

export class Webhook {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  public async createOnTransactionConfirmed(hash: string): Promise<WebhookCreationResponse> {
    return <WebhookCreationResponse>(await this.client.request(
      'POST',
      '/webhook/create',
      {
        action: 'tx_confirmed',
        params: { hash }
      }
    )).data;
  }

  public async createOnNewTransaction(): Promise<WebhookCreationResponse> {
    return <WebhookCreationResponse>(await this.client.request(
      'POST',
      '/webhook/create',
      {
        action: 'new_tx'
      }
    )).data;
  }

  public async list(): Promise<WebhookResponse[]> {
    return <WebhookResponse[]>(await this.client.request(
      'POST',
      '/webhook/list'
    )).data;
  }
}
