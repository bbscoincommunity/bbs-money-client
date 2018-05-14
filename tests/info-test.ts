import Client from '../src/Client';

let client: Client;

beforeAll(() => {
    client = new Client({
        "appId": "4f9605f0cc5d4a202675635441b87b",
        "appKey": "a4f15708cf5d957d8f5c5825fca58ad7830d0fb65c67643fc3"
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