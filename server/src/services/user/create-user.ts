import { v4 } from "uuid";
import { APIResponse, User } from "../../models";
import { ExceptionTreatment, BCrypt } from "../../utils";
import UserDataValidator from "../../validators/user-data";
import db from "../../clients/database";

class CreateUserService 
{
    private dataValidator = UserDataValidator;

    public async execute (user: User): Promise<APIResponse<User>>
    {
        try 
        {
            const validUserData = new this.dataValidator(user);

            if(validUserData.errors)
            {
                throw new Error(`400: ${validUserData.errors}`)
            }

            const selectedUser = await db.UsersTable.select({cpf:validUserData.data.cpf});
            if(selectedUser && selectedUser.length > 0)
            {
                const finalUser = selectedUser[0];

                if(!await BCrypt.check(validUserData.data.password as string, finalUser.password))
                {
                    throw new Error(`404: wrong password`);
                }
                //console.log("Achou ", selectedUser);
                return {
                    data: finalUser,
                    messages: []
                } as APIResponse;
            }

            validUserData.data.id = v4();
            validUserData.data.password = await BCrypt.encrypt(validUserData.data.password as string);

            const insertedUser = await db.UsersTable.insert(validUserData.data as User);

            if (insertedUser)
            {
                return {
                    data: validUserData.data,
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
                "an error occurred while inserting user on database"
            );
        }
    }
}

export default new CreateUserService();