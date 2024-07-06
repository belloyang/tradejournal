import { OptionTrade, OptionTrades } from "../../routes/trade-detail/optionTrade";
import { DB_HOST, DB_PORT } from "./db-info";

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

// add accounts api
export async function fetchAllAccounts(): Promise<any> {
    const response = await fetch(`${DB_HOST}:${DB_PORT}/api/users`);
    const result = await response.json();
    return result.data;
}

export async function addAccount(user: any): Promise<{id: string}> {
    const response = await fetch(`${DB_HOST}:${DB_PORT}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    return response.json();
}
