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
const rq = require("request-promise-native");
const crypto = require("crypto");
const Wallet_1 = require("./Wallet");
const Info_1 = require("./Info");
const Webhook_1 = require("./Webhook");
class Client {
    constructor(config) {
        this.host = config.host || 'https://api.bbs.money';
        this.appId = config.appId;
        this.appKey = config.appKey;
        // clients
        this.wallet = new Wallet_1.Wallet(this);
        this.info = new Info_1.Info(this);
        this.webhook = new Webhook_1.Webhook(this);
    }
    getSignature(data, timestamp) {
        const hmac = crypto.createHmac('sha256', this.appKey);
        return hmac.update(Buffer.from(data + timestamp, 'utf-8')).digest('hex');
    }
    request(method, uri, data = null, authentication = true) {
        return __awaiter(this, void 0, void 0, function* () {
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
                raw = yield rq({
                    method,
                    url,
                    body: serialized,
                    timeout: 30 * 1000,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            }
            catch (e) {
                raw = e.error;
                success = false;
            }
            let response;
            try {
                response = JSON.parse(raw);
            }
            catch (e) {
                response = raw;
            }
            if (typeof response !== 'object') {
                response = success ?
                    { success, data: response } :
                    { success, message: response };
            }
            if (!response.success) {
                throw new Error(response.message);
            }
            return response;
        });
    }
}
exports.Client = Client;
