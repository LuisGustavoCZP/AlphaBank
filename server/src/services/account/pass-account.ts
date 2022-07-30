import { ExceptionTreatment, BCrypt } from "../../utils";
import { Account, APIResponse, User } from "../../models";
import { UsersTable } from "../../clients/postgres";
import PasswordValidator from "../../validators/strings/password";

class PassAccountService 
{
    public async execute (account: Account, password : string) : Promise<APIResponse<boolean>>
    {
        try 
        {
            const validPassword = new PasswordValidator(password);
            if(validPassword.errors)
            {
                throw new Error(`400: ${validPassword.errors}`)
            }
            const pw = validPassword.data;

            const owner = await UsersTable.select({id:account.owner});
            if(!owner || owner.length == 0) 
            {
                throw new Error(`400: this account doesn't exist`)
            }
            
            if(!await BCrypt.check(pw, owner[0].password))
            {
                throw new Error(`404: wrong password`);
            }

            return {
                data: true,
                messages: []
            } as APIResponse<boolean>;
        }
        catch (error)
        {
            //console.log("Password error", error);
            throw new ExceptionTreatment(
                error as Error,
                500,
                "an error occurred while inserting account on database"
            );
        }
    }
}

export default new PassAccountService();