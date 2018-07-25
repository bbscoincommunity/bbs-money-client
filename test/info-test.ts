import * as config from './test-config';
import { Client } from '../src/Client';

let client: Client;

beforeAll(() => {
    client = new Client(config);
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