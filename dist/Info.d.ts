import { Client } from './Client';
export interface SystemInfo {
    lastSyncedHeight: number;
    currentHeight: number;
    lastUpdated: number;
}
export declare class Info {
    private client;
    constructor(client: Client);
    all(): Promise<SystemInfo>;
    supply(): Promise<string>;
}
