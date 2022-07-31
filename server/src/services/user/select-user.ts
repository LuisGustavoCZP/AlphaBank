import { APIResponse, User } from "../../models";
import { ExceptionTreatment } from "../../utils";
import { UsersTable } from "../../clients/postgres";
import { AccountsUserService } from "./";

class SelectUserService 
{

    public async execute (userid: string): Promise<APIResponse<any>>
    {
        try 
        {
            const selectedUser = await UsersTable.select({id: userid});
            if(!selectedUser || selectedUser.length == 0) {
                throw new Error(`400: account do not exist`);
            }

            const accountDatas = await AccountsUserService.execute(userid);

            const userData = {
                user: Object.assign({}, selectedUser[0]) as any,
                accounts: accountDatas.data,
            };

            delete userData.user.password;
            /* delete userData.user.id; */

            if (selectedUser)
            {
                return {
                    data: userData,
                    messages: []
                } as APIResponse;
            }

            return {
                data: {},
                messages: [ "an error occurred while selected user" ]
            } as APIResponse;
        }
        catch (error)
        {
            throw new ExceptionTreatment(
                error as Error,
                500,
                "an error occurred while selecting user on database"
            );
        }
    }
}

export default new SelectUserService();