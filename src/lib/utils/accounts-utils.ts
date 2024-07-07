import type { Account } from "../../routes/account-detail/account";

export function calcBalance(account: Account) {
    return (account.cash + account.asset).toFixed(2);
}