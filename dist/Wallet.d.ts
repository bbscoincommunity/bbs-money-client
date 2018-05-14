import { Client } from './Client';
export declare enum TransactionStatus {
    NORMAL = "normal",
    LOCKED = "locked",
    PENDING = "pending",
    CANCELLED = "cancelled",
    SPENT = "spent",
}
export interface Balance {
    address: string;
    available: string;
    locked: string;
    total: string;
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
    amount: string;
    unlockTime: number;
    status: TransactionStatus;
}
export interface TransactionDetails extends Transaction {
    coinbase: boolean;
    confirmations: number;
    paymentId: string;
    destinations: Destination[];
}
export declare class Wallet {
    private client;
    constructor(client: Client);
    getBalance(): Promise<Balance>;
    getTransactionDetails(hash: string): Promise<TransactionDetails>;
    getTransactions(offset?: number, limit?: number): Promise<Transaction[]>;
}
