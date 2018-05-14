"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["NORMAL"] = "normal";
    TransactionStatus["LOCKED"] = "locked";
    TransactionStatus["PENDING"] = "pending";
    TransactionStatus["CANCELLED"] = "cancelled";
    TransactionStatus["SPENT"] = "spent";
})(TransactionStatus = exports.TransactionStatus || (exports.TransactionStatus = {}));
class Wallet {
    constructor(client) {
        this.client = client;
    }
    getBalance() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.client.request('POST', '/api/wallet/balance')).data;
        });
    }
    getTransactionDetails(hash) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.client.request('POST', '/api/wallet/transaction-details', {
                hash,
            })).data;
        });
    }
    getTransactions(offset = 0, limit = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = (yield this.client.request('POST', '/api/wallet/transactions', {
                offset,
                limit,
            })).data;
            return response.transactions;
        });
    }
}
exports.Wallet = Wallet;
