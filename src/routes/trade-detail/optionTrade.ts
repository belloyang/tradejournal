import {writable} from 'svelte/store';

export enum OptionType {
    CALL = 'CALL',
    PUT = 'PUT'
}
export enum TradeType {
    BUY = 'BUY',
    SELL = 'SELL'
}
export enum TradeStatus {
    OPEN = 'OPEN',
    CLOSED = 'CLOSED'
}
export class OptionTrade {
    symbol: string;
    optionType: OptionType;
    tradeType: TradeType;
    strike: number;
    expirationDate: string;
    quantity: number; 
    premium: number;
    marketValue: number;
    status: TradeStatus;
    created_at: string = '';
    updated_at: string = '';
    accountId: number = -1;// foreign key to account

    constructor(
        symbol: string,
        optionType: OptionType,
        tradeType: TradeType,
        strike: number,
        expirationDate: string,
        quantity: number, 
        premium: number,
        status: TradeStatus = TradeStatus.OPEN, accountId: number = -1) {
        this.symbol = symbol;
        this.optionType = optionType;
        this.tradeType = tradeType;
        this.strike = strike;
        this.expirationDate = expirationDate;
        this.quantity = quantity;
        this.premium = premium;
        this.status = status;
        this.marketValue = premium;
        this.accountId = accountId;
    }
    
}

export function calcPL(trade: OptionTrade): number {
    return (trade.marketValue - trade.premium) * trade.quantity * (trade.tradeType == TradeType.BUY ? 1 : -1) * 100;
}
export function calcPLPercent(trade: OptionTrade): number {
    return calcPL(trade) / (trade.premium * trade.quantity * 100) * 100;
}
export const OptionTrades = writable<OptionTrade[]>([]);
