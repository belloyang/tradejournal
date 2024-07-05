import { writable, type Writable } from "svelte/store";

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

function createPersistentStore(key: string, startValue: Account | undefined) {
    const isBrowser = typeof window !== 'undefined';
    let initialValue = startValue;
  
    if (isBrowser) {
      const storedValueStr = localStorage.getItem(key);
      if (storedValueStr && storedValueStr !== 'undefined') {
        initialValue = JSON.parse(storedValueStr);
      }
    }
  
    const store = writable(initialValue);
  
    if (isBrowser) {
      store.subscribe(value => {
        localStorage.setItem(key, JSON.stringify(value));
      });
    }
  
    return store;
  }
  
  export let currentAccountStore: Writable<Account|undefined> = createPersistentStore('currentAccount', undefined);