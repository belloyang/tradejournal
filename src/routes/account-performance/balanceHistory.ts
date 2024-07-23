export class BalanceHistory {
    id: number = -1;
    cash: number;
    asset: number;
    accountId: number; // foreign key
    timestamp: Date;
    constructor(accountId: number, cash: number, asset: number, timestamp: Date) {
        this.accountId = accountId;
        this.cash = cash;
        this.asset = asset;
        this.timestamp = timestamp;
    }

}