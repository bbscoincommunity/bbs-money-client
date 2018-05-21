import { Client } from '../src/Client';

let client: Client;

beforeAll(() => {
    client = new Client({
        "appId": "8a013399d6b1ac7c0ab6cb3b7db9bc",
        "appKey": "dd6412645fe247d7961367a7cae2781a7284ca21b23424036e"
    });
});

it('should get system information', async () => {
    const {currentHeight, lastSyncedHeight, lastUpdated} = await client.info.all();
    expect(currentHeight).toBeTruthy();
    expect(lastSyncedHeight).toBeTruthy();
    expect(lastUpdated).toBeTruthy();
    expect(lastSyncedHeight).toBeLessThanOrEqual(currentHeight);
});

it('should get total supply', async () => {    
    const supply = await client.info.supply();
    expect(supply).toBeTruthy();
});