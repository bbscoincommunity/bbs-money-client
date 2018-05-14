"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WalletClient_1 = require("./Wallet/WalletClient");
class Client {
    constructor(config) {
        this.appId = config.appId;
        this.appKey = config.appKey;
        // clients
        this.wallet = new WalletClient_1.default(this);
    }
    request(method, uri, data, authentication = true) {
    }
}
exports.default = Client;
