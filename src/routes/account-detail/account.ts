import { writable } from "svelte/store";

export class Account {
    id: number;
    name: string;
    email: string;
    balance: number;
    
    constructor(id: number, name: string, email: string = '', balance: number = 10_000) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.balance = balance;
    }
}
export const TradingAccounts = writable<Account[]>([]);
export let currentAccountStore = writable<Account | undefined>(undefined);