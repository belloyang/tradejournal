export class BalanceRecord {
    id: number = -1;
    cash: number;
    asset: number;
    accountId: number;
    created_at: string;
    updated_at: string;
    constructor(accountId: number, cash: number, asset: number, created_at: string, updated_at: string) {
        this.accountId = accountId;
        this.cash = cash;
        this.asset = asset;
        this.updated_at = updated_at;
        this.created_at = created_at;
    }

}