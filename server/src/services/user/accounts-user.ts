import { APIResponse, User } from "../../models";
import { ExceptionTreatment } from "../../utils";
import { AccountsTable } from "../../clients/postgres";

class AccountsUserService 
{
    public async execute (userid: string): Promise<APIResponse<User>>
    {
        try 
        {
            const accountDatas = await AccountsTable.select({owner:userid});
            const accounts = accountDatas.map(account => 
            {
                const acc = Object.assign({}, account) as any;
                delete acc.id;
                delete acc.owner;
                delete acc.updated_at;
                return acc;
            })

            return {
                data: accounts,
                messages: [ "an error occurred while selected accounts from user" ]
            } as APIResponse;
        }
        catch (error)
        {
            throw new ExceptionTreatment(
                error as Error,
                500,
                "an error occurred while selecting accounts from user on database"
            );
        }
    }
}

export default new AccountsUserService();