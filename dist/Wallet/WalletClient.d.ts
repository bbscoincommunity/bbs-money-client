import Client from "../Client";
export declare enum TransactionStatus {
    NORMAL = 0,
    LOCKED = 1,
    PENDING = 2,
    CANCELLED = 3,
    SPENT = 4,
}
export interface Destination {
    address: string;
    amount: string;
}
export interface Transaction {
    hash: string;
    height: number;
    timestamp: number;
    in: string;
    out: string;
    fee: string;
    fusion: boolean;
    amonut: string;
    unlockTime: number;
    status: TransactionStatus;
}
export interface TransactionDetails extends Transaction {
    coinbase: boolean;
    confirmations: number;
    paymentId: string;
    destinations: Destination[];
}
export default class WalletClient {
    private client;
    constructor(client: Client);
    getBalance(): string;
    getTransactionDetails(hash: string): TransactionDetails | null;
    getTransactions(offset?: number, limit?: number): Transaction[];
}
