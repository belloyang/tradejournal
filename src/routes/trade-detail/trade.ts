import {writable} from 'svelte/store';

enum OptionType {
    CALL = 'CALL',
    PUT = 'PUT'
}
enum TradeType {
    BUY = 'BUY',
    SELL = 'SELL'
}
export class OptionTrade {
    symbol: string;
    optionType: OptionType;
    tradeType: TradeType;
    strike: number;
    expirationDate: string;
    quantity: number; 
    premium: number;

    constructor(
        symbol: string,
        optionType: OptionType,
        tradeType: TradeType,
        strike: number,
        expirationDate: string,
        quantity: number, 
        premium: number) {
        this.symbol = symbol;
        this.optionType = optionType;
        this.tradeType = tradeType;
        this.strike = strike;
        this.expirationDate = expirationDate;
        this.quantity = quantity;
        this.premium = premium;
    }
}

export const optionTrades = writable<OptionTrade[]>([]);
