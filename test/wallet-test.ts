import * as config from './test-config';
import { Client } from '../src/Client';

let client: Client;

beforeAll(() => {
    client = new Client(config);
});

it('should get balance', async () => {
    const { address, available, locked, total  } = await client.wallet.getBalance();
    expect(address).toBe('fySYVoeryY4WZmM6vpduKBccALWaLukXfQ6KwsFgg8pR8HhjHw3AeCiDrXfqEPSYnkgbK74CRBat9YETn8qwj7aN23TMRqiTh');
    expect(available).toBeDefined();
    expect(locked).toBeDefined();
    expect(total).toBeDefined();
});

it('should get transactions', async () => {    
    const transactions = await client.wallet.getTransactions();
    expect(transactions).toHaveLength(10);
});

it('should get transaction details', async () => {
    const { amount } = await client.wallet.getTransactionDetails('e42a613ed6923fc02ecc7845b5eefd9110c4774b987ad897f054d9c52f069cad');
    expect(amount).toBe('-1288');
});

// it('should send money', async () => {
//     const hash = await client.wallet.send('fySYVoeryY4WZmM6vpduKBccALWaLukXfQ6KwsFgg8pR8HhjHw3AeCiDrXfqEPSYnkgbK74CRBat9YETn8qwj7aN23TMRqiTh', '0.00000001', '0.001');
//     expect(hash).toBeTruthy();
// });