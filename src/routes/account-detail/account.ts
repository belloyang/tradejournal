import { writable, type Writable } from "svelte/store";

export class Account {
    id: number = -1;
    name: string;
    cash: number;
    asset: number;
    
    constructor(name: string, cash: number = 10_000, asset: number = 0) {
        this.name = name;
        this.cash = cash;
        this.asset = asset;
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