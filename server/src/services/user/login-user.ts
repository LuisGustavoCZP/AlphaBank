import { ExceptionTreatment } from "../../utils";
import { APIResponse } from "../../models";
import { UsersTable } from "../../clients/postgres";
import { PassUserService, SelectUserService } from "./";

class LoginUserService 
{
    public async execute (user: {cpf: string, password: string}) : Promise<APIResponse<any>>
    {
        try 
        {
            const owner = await UsersTable.select({cpf:user.cpf});
            if(!owner || owner.length == 0) {
                throw new Error(`400: account do not exist`);
            }

            const userOwner = owner[0];
            
            await PassUserService.execute(userOwner.id, user.password);
            
            const userData = await SelectUserService.execute(userOwner.id);

            return {
                data: userData.data,
                messages: []
            } as APIResponse;
        }
        catch (error)
        {
            console.log("User error", error);
            throw new ExceptionTreatment(
                error as Error,
                500,
                "an error occurred while listing extract on database"
            );
        }
    }
}

export default new LoginUserService();