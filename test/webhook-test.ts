import * as config from './test-config';
import { Client } from '../src/Client';

let client: Client;

beforeAll(() => {
    client = new Client(config);
});

it('can create tx_confirmed webhook', async () => {
    const { webhookId } = await client.webhook.createOnTransactionConfirmed('11be46dcc3c10cd60bb54cb67dd72744d466c222b8401bb88d7f6850b0eb119f');
    expect(webhookId).toBeTruthy();
});

it('can create new_tx webhook', async () => {    
    const { webhookId } = await client.webhook.createOnNewTransaction();
    expect(webhookId).toBeTruthy();
});

it('can list webhooks', async () => {   
    await client.webhook.createOnTransactionConfirmed('11be46dcc3c10cd60bb54cb67dd72744d466c222b8401bb88d7f6850b0eb119f');
    await client.webhook.createOnNewTransaction();
    await client.webhook.createOnNewTransaction();

    const webhooks = await client.webhook.list();
    expect(webhooks).toHaveLength(2);
});