import db from "./database";
import { Transaction } from "../../models";

class TransactionsTable 
{
    protected table = "transactions";

    public async insert (transaction: Transaction): Promise<Transaction[]>
    {
        return db.insert<Transaction>(this.table, transaction);
    }

    public async select (filter: Partial<Transaction>): Promise<Transaction[]>
    {
        return db.select<Transaction>(this.table, filter);
    }

    public async list (): Promise<Transaction[]>
    {
        return db.list<Transaction>(this.table);
    }
}

export default new TransactionsTable();