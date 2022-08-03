import db from "./database";
import { Account } from "../../models";

class AccountsTable 
{
    protected table = "accounts";

    public async insert (account: Account): Promise<Account[]>
    {
        return await db.insert<Account>(this.table, account);
    }

    public async update (id: string, atributes: Partial<Account>): Promise<Account[]>
    {
        return db.update<Account>(this.table, atributes, {id:id});
    }

    public async select (filter: Partial<Account>): Promise<Account[]>
    {
        return db.select<Account>(this.table, filter);
    }

    public async nextAccount () : Promise<string>
    {
        try 
        {
            const acc = await db.sequenceGet('ac_serial');
            
            if(acc == '999999999')
            {
                await db.sequenceSet('ac_serial', 200);
                await db.sequenceNext('ag_serial');
            } 
            else 
            {
                db.sequenceNext('ac_serial');
            }
            //console.log("AccNum", acc)
            return `${acc}`;
        }
        catch(e)
        {
            console.log("SAc", e);
            throw new Error("503: service temporarily unavailable");
        }
    }

    public async nextAgency () : Promise<string>
    {
        try 
        {
            const ag = await db.sequenceGet('ag_serial');
            return `${ag}`;
        }
        catch(e)
        {
            console.log("SAg", e);
            throw new Error("503: service temporarily unavailable");
        }
    }
}

export default new AccountsTable();