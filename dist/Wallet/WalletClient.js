"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus[TransactionStatus["NORMAL"] = 0] = "NORMAL";
    TransactionStatus[TransactionStatus["LOCKED"] = 1] = "LOCKED";
    TransactionStatus[TransactionStatus["PENDING"] = 2] = "PENDING";
    TransactionStatus[TransactionStatus["CANCELLED"] = 3] = "CANCELLED";
    TransactionStatus[TransactionStatus["SPENT"] = 4] = "SPENT";
})(TransactionStatus = exports.TransactionStatus || (exports.TransactionStatus = {}));
class WalletClient {
    constructor(client) {
        this.client = client;
    }
    getBalance() {
        return "";
    }
    getTransactionDetails(hash) {
        return this.client.request("POST", "/api/wallet/transaction-details", {
            hash
        });
    }
    getTransactions(offset = 0, limit = 10) {
        return [];
    }
}
exports.default = WalletClient;
