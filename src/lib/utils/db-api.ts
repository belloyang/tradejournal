import { OptionTrade, OptionTrades, TradeStatus, TradeType } from "../../routes/trade-detail/optionTrade";
import { DB_HOST, DB_PORT } from "./db-info";
import type { Account } from "../../routes/account-detail/account";
import { get, type Writable } from "svelte/store";

// define a function to fetch all optionTrades
export async function fetchAllOptionTrades(): Promise<OptionTrade[]> {
    const response = await fetch(`${DB_HOST}:${DB_PORT}/api/option_trades`);
    const result = await response.json();
    OptionTrades.set(result.data);
    return result.data;
}

export async function addTrade(trade: OptionTrade): Promise<{id: string}> {
    const response = await fetch(`${DB_HOST}:${DB_PORT}/api/option_trades`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...trade, created_at: new Date(), updated_at: new Date()})
    });
    return response.json();

   
   }

export async function updateTrade(trade: OptionTrade): Promise<{id: string}> {
  //update the optionTrade in DB
    const response = await fetch(`${DB_HOST}:${DB_PORT}/api/option_trades/${(trade as any).id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...trade, updated_at: new Date()})
    });
    return response.json();
}

export async function deleteTrade(trade: OptionTrade): Promise<{id: string}> {
    //delete the optionTrade in DB
    const response = await fetch(`${DB_HOST}:${DB_PORT}/api/option_trades/${(trade as any).id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.json();
}

export function removeTradefromAccount(currentAccountStore:  Writable<Account|undefined>, trade: OptionTrade) {
  let currentAccount = get(currentAccountStore);
  if(trade.tradeType === TradeType.BUY) {
      // subtract cash
      if(trade.status === TradeStatus.CLOSED) {
          // add p/l
          if(currentAccount) {
              currentAccount.cash -= (trade.marketValue - trade.premium)*trade.quantity*100;
              currentAccountStore.set(currentAccount);
          } else {
              console.error('Current Account is not defined');
          }
      } else {
          // substract cash and add asset
          if(currentAccount) {
              currentAccount.cash += trade.premium*trade.quantity*100;
              currentAccount.asset -= trade.marketValue*trade.quantity*100;
              currentAccountStore.set(currentAccount);
          } else {
              console.error('Current Account is not defined');
          }
      }
      
  } else {
      // subtract asset
      if(trade.status === TradeStatus.CLOSED) {
          // add p/l
          if(currentAccount) {
              currentAccount.asset += (trade.marketValue - trade.premium)*trade.quantity*100;
              currentAccountStore.set(currentAccount);
          } else {
              console.error('Current Account is not defined');
          }
      } else {
          // substract asset and add cash
          if(currentAccount) {
              currentAccount.asset += trade.marketValue*trade.quantity*100;
              currentAccount.cash -= trade.premium*trade.quantity*100;
              currentAccountStore.set(currentAccount);
          } else {
              console.error('Current Account is not defined');
          }
      }
  }
}

// add accounts api
export async function fetchAllAccounts(): Promise<any> {
    const response = await fetch(`${DB_HOST}:${DB_PORT}/api/trading_accounts`);
    const result = await response.json();
    return result.data;
}

// fetch account by id
export async function fetchAccountById(id: string): Promise<Account> {
    const response = await fetch(`${DB_HOST}:${DB_PORT}/api/trading_accounts/${id}`);
    const result = await response.json();
    return result.data;
}

export async function addAccount(account: any): Promise<{id: string}> {
    const response = await fetch(`${DB_HOST}:${DB_PORT}/api/trading_accounts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...account, created_at: new Date(), updated_at: new Date()})
    });
    return response.json();
}

export async function updateAccount(account: any): Promise<{id: string}> {
    const response = await fetch(`${DB_HOST}:${DB_PORT}/api/trading_accounts/${account.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...account, updated_at: new Date()})
    });
    return response.json();
}

export async function deleteAccountOptionTrades(accountId: number): Promise<{id: string}> {
    const response = await fetch(`${DB_HOST}:${DB_PORT}/api/option_trades/account/${accountId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.json();
}
