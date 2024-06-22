import { OptionTrade, OptionTrades } from "../../routes/trade-detail/trade";
import { DB_HOST, DB_PORT } from "./db-host";

// define a function to fetch all optionTrades
export async function fetchAllOptionTrades(): Promise<OptionTrade[]> {
    const response = await fetch(`${DB_HOST}:${DB_PORT}/api/option_trades`);
    const result = await response.json();
    OptionTrades.set(result.data);
    return result.data;
}
