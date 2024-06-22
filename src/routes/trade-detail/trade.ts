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

    constructor(
        symbol: string,
        optionType: OptionType,
        tradeType: TradeType,
        strike: number,
        expirationDate: string,
        quantity: number, 
        premium: number,
        status: TradeStatus = TradeStatus.OPEN) {
        this.symbol = symbol;
        this.optionType = optionType;
        this.tradeType = tradeType;
        this.strike = strike;
        this.expirationDate = expirationDate;
        this.quantity = quantity;
        this.premium = premium;
        this.status = status;
        this.marketValue = premium;
    }
}

export const OptionTrades = writable<OptionTrade[]>([]);
