import { APIResponse, User } from "../../models";
import { ExceptionTreatment } from "../../utils";
import db from "../../clients/database";
import { AccountsUserService } from "./";

class SelectUserService 
{

    public async execute (userid: string, error = true): Promise<APIResponse<any>>
    {
        try 
        {
            //console.log(userid);
            
            const selectedUser = await db.UsersTable.select({id: userid});
            if(!selectedUser || selectedUser.length == 0) {
                if(error) throw new Error(`400: user:do not exist`);
                else return {
                    data: null,
                    messages: []
                } as APIResponse;
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