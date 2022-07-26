import { v4 } from "uuid";
import { ExceptionTreatment } from "../../utils";
import { Account, APIResponse, User } from "../../models";
import { CreateUserService } from "../user";
import db from "../../clients/database";

class CreateAccountService 
{
    public async execute (user: User) : Promise<APIResponse<Account>>
    {
        try 
        {
            //, pass : string pw
            const resp = await CreateUserService.execute(user);

            const ac = await db.AccountsTable.nextAccount();
            const ag = await db.AccountsTable.nextAgency();
            
            const account = {
                id: v4(),
                owner: resp.data.id,
                agency: ag.slice(0, -1),
                agency_identifier: ag.slice(-1),
                account: ac.slice(0, -1),
                account_identifier: ac.slice(-1),
                balance: 0
            } as Account;

            const insertedAcc = await db.AccountsTable.insert(account);

            if (insertedAcc)
            {
                return {
                    data: {
                        agency:account.agency,
                        agency_identifier:account.agency_identifier,
                        account:account.account,
                        account_identifier:account.account_identifier
                    },
                    messages: []
                } as APIResponse;
            }

            return {
                data: {},
                messages: [ "an error occurred while creating user" ]
            } as APIResponse;
        }
        catch (error)
        {
            //console.log("User error", error);
            throw new ExceptionTreatment(
                error as Error,
                500,
                "an error occurred while inserting account on database"
            );
        }
    }
}

export default new CreateAccountService();