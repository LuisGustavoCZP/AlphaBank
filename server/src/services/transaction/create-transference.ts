import { v4 } from "uuid";
import { ExceptionTreatment } from "../../utils";
import { APIResponse, Fee, Transaction, TransactionAccount, TransactionType } from "../../models";
import db from "../../clients/database";
import { PassAccountService, SelectAccountService } from "../account";

class CreateTransferenceService 
{
    private tax = 1.00;

    public async execute (origin: TransactionAccount, password: string, destination: TransactionAccount, quanty: number) : Promise<APIResponse>
    {
        try 
        {
            const originAcc = await SelectAccountService.execute(origin, "origin");

            await PassAccountService.execute(originAcc.data, password);
            
            const destinationAcc = await SelectAccountService.execute(destination, "destination");

            if(originAcc.data.id == destinationAcc.data.id) throw new Error(`400: destination:same as origin`);

            const q = Number(quanty);
            if(q <= 0 || !quanty) throw new Error(`400: value:need to be greather than 0`);

            const total = q + this.tax;
            if(originAcc.data.balance < total)
            {
                throw new Error(`412: value:has insuficient founds`);
            }

            //console.log("Transação de", originAcc.data.id, destinationAcc.data.id, originAcc.data.balance);

            const newOriginAcc = await db.AccountsTable.update(originAcc.data.id, {balance:originAcc.data.balance-total});
            await db.AccountsTable.update(destinationAcc.data.id, {balance:destinationAcc.data.balance+q});

            const originTransaction : Transaction = {
                id:v4(),
                account:originAcc.data.id,
                type:TransactionType.Transference,
                value:-q
            };
            const taxTransaction : Fee = {
                id:v4(),
                origin:originTransaction.id,
                account:originAcc.data.id,
                type:TransactionType.Fee,
                value:-this.tax
            };
            
            await db.TransactionTable.insert(originTransaction);
            await db.TransactionTable.insert(taxTransaction);

            const destTransaction : Transaction = {
                id:v4(),
                account:destinationAcc.data.id,
                type:TransactionType.Transference,
                value:q
            };
            await db.TransactionTable.insert(destTransaction);

            return {
                data: {
                    id:originTransaction.id,
                    value:originTransaction.value,
                    type:originTransaction.type,
                    origin:{
                        agency:origin.agency,
                        agency_identifier:origin.agency_identifier,
                        account:origin.account,
                        account_identifier:origin.account_identifier,
                        document:origin.cpf
                    },
                    destination:{
                        agency:destination.agency,
                        agency_identifier:destination.agency_identifier,
                        account:destination.account,
                        account_identifier:destination.account_identifier,
                        document:destination.cpf
                    },
                    date:new Date().toISOString()
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
                "an error occurred while transfering from account to another on database"
            );
        }
    }
}

export default new CreateTransferenceService();