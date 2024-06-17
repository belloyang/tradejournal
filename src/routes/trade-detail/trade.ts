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
    expiration: string;
    quantity: number; 
    premium: number;

    constructor(
        symbol: string,
        optionType: OptionType,
        tradeType: TradeType,
        strike: number,
        expiration: string,
        quantity: number, 
        premium: number) {
        this.symbol = symbol;
        this.optionType = optionType;
        this.tradeType = tradeType;
        this.strike = strike;
        this.expiration = expiration;
        this.quantity = quantity;
        this.premium = premium;
    }
}

export const optionTrades = writable<OptionTrade[]>([]);