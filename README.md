# BBS.money API Client

# Installation
```bash
npm install bbs-money-client --save
```

# Usage
```js
const { Client: BBSMoneyClient } = require('bbs-money-client');

const client = new BBSMoneyClient({ appId: "...", appKey: "..." });

client.wallet.getBalance().then(data => {
    console.log(data);
})
```

# Supported APIs
## Wallet
### Getting balance
```js
await client.wallet.getBalance();
```
Response example:
```json
{
  "address": "fySYVoeryY4WZmM6vpduKBccALWaLukXfQ6KwsFgg8pR8HhjHw3AeCiDrXfqEPSYnkgbK74CRBat9YETn8qwj7aN23TMRqiTh",
  "available": "0",
  "locked": "0",
  "total": "0"
}
```

### Getting transactions
```js
// offset is default to 0
// limit is default to 10
await client.wallet.getTransactions(offset, limit);
```
Response example:
```json
[
  {
    "hash": "9342f1c2db197f32ff861530ca6373b9ab9514948300b90db4199d0c30036d74",
    "height": 83011,
    "timestamp": 1526252697000,
    "in": "0",
    "out": "101",
    "fee": "1",
    "fusion": false,
    "amount": "-101",
    "unlockTime": 0,
    "status": "normal"
  }
]
```

### Getting transaction details
```js
await client.wallet.getTransactionDetails(hash);
```
Response example:
```json
{
  "hash": "e42a613ed6923fc02ecc7845b5eefd9110c4774b987ad897f054d9c52f069cad",
  "amount": "-1288",
  "coinbase": false,
  "fee": "1",
  "height": 73257,
  "confirmations": 10010,
  "status": "normal",
  "timestamp": 1525074024000,
  "unlockTime": 0,
  "paymentId": "",
  "destinations": [
    {
      "amount": "1287",
      "address": "fyTpS7UgsfTJaGWxKoBcYNAie7ZXkia8UKarA8mAEnusGpM1JQPAzvFd6S8fpDR7WgEN9wTVL6vdBe3PjPmqafpm2PogvpQna"
    }
  ]
}
```

### Send
```js
await client.wallet.send('fySYVoeryY4WZmM6vpduKBccALWaLukXfQ6KwsFgg8pR8HhjHw3AeCiDrXfqEPSYnkgbK74CRBat9YETn8qwj7aN23TMRqiTh', '0.00000001', '0.001');
```
Response example:
```json
"de0c8a26bf6a12d8769ae5e23a1ab0c05e605de6c9645294e490e5bba3f0afdd"
```


## System information
### Getting system synchronization status
```js
await client.info.all();
```
Response example:
```json
{
  "lastSyncedHeight": 83264,
  "currentHeight": 83264,
  "lastUpdated": 1526282907815
}
```

### Getting current coin supply
```js
await client.info.supply();
```
Response example:
```json
"40675615400.2547"
```