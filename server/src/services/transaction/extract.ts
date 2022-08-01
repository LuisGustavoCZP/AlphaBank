import { ExceptionTreatment } from "../../utils";
import { APIResponse, Transaction, TransactionAccount } from "../../models";
import { TransactionTable, UsersTable } from "../../clients/postgres";
import { SelectAccountService } from "../account";

class CreateExtractService 
{
    public async execute (account: TransactionAccount, userid: string) : Promise<APIResponse>
    {
        try 
        {
            const acc = await SelectAccountService.execute(account);
            if(userid != acc.data.owner) 
            {
                throw new Error(`400: token is missing`);
            }

            const owner = (await UsersTable.select({id:acc.data.owner}))[0] as any;
            delete owner["id"];
            delete owner["password"];

            const resp = await TransactionTable.select({account:acc.data.id}) as Partial<Transaction>[];
            
            resp.forEach(element => {
                delete element["account"];
            });
            //console.log(resp);
            const resAcc = acc.data as any;
            delete resAcc["id"];
            delete resAcc["owner"];
            //delete resAcc["password"];
            //delete resAcc["created_at"];
            delete resAcc["updated_at"];
            return {
                data: {
                    user:owner,
                    account:resAcc,
                    transactions:resp
                },
                messages: []
            } as APIResponse;
        }
        catch (error)
        {
            //console.log("User error", error);
            throw new ExceptionTreatment(
                error as Error,
                500,
                "an error occurred while listing extract on database"
            );
        }
    }
}

export default new CreateExtractService();