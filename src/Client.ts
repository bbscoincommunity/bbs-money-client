import * as rq from 'request-promise-native';
import * as crypto from 'crypto';
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

export class Client {
  public wallet: Wallet;
  public info: Info;
  public webhook: Webhook;

  private host: string;
  private appId: string;
  private appKey: string;

  constructor(config: ClientConfiguration) {
    this.host = config.host || 'https://api.bbs.money';
    this.appId = config.appId;
    this.appKey = config.appKey;

    // clients
    this.wallet = new Wallet(this);
    this.info = new Info(this);
    this.webhook = new Webhook(this);
  }

  private getSignature(data: string, timestamp: string): string {
    const hmac = crypto.createHmac('sha256', this.appKey);
    return hmac.update(Buffer.from(data + timestamp, 'utf-8')).digest('hex');
  }

  public async request(
    method: 'POST' | 'GET',
    uri: string,
    data: object | null = null,
    authentication: boolean = true
  ): Promise<SuccessResponse> {
    let serialized = data ? JSON.stringify(data) : '';
    let url = `${this.host}${uri}`;

    if (authentication) {
      const timestamp = String(Number(new Date()));
      const sign = this.getSignature(serialized, timestamp);
      url = `${url}?appid=${this.appId}&sign=${sign}&ts=${timestamp}`;
    }

    let raw;
    let success = true;
    try {
      raw = await rq({
        method,
        url,
        body: serialized,
        timeout: 30 * 1000,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (e) {
      raw = e.error;
      success = false;
    }

    let response;
    try {
      response = JSON.parse(raw);
    } catch (e) {
      response = raw;
    }

    if (typeof response !== 'object') {
      response = success ? 
        { success, data: response } : 
        { success, message: response };
    }

    if (!response.success) {
      throw new Error((<ErrorResponse>response).message);
    }

    return <SuccessResponse>response;
  }
}
