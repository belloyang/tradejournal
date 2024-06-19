import {writable} from 'svelte/store';

enum OptionType {
    CALL = 'CALL',
    PUT = 'PUT'
}
enum TradeType {
    BUY = 'BUY',
    SELL = 'SELL'
}
enum TradeStatus {
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

export const optionTrades = writable<OptionTrade[]>([]);
