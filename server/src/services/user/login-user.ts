import { ExceptionTreatment } from "../../utils";
import { APIResponse } from "../../models";
import { TransactionTable, UsersTable } from "../../clients/postgres";
import { PassUserService } from "../user";

class CreateExtractService 
{
    public async execute (user: {cpf: string, password: string}) : Promise<APIResponse>
    {
        try 
        {
            const owner = await UsersTable.select({cpf:user.cpf});
            if(!owner || owner.length == 0) {
                throw new Error(`400: account do not exist`);
            }

            const userOwner = owner[0];
            await PassUserService.execute(userOwner.id, user.password);
            //console.log("Extrato de", acc.data.id);
            
            
            return {
                data: {
                    user:userOwner,
                    accounts:[],
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