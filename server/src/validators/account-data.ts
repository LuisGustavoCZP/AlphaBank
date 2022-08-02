import { TransactionAccount } from "../models";
import AgencyValidator from "./strings/agency";
import AgencyIValidator from "./strings/agency-identifier";
import AccountValidator from "./strings/account";
import AccountIValidator from "./strings/account-identifier";
import CPFValidator from "./strings/cpf";

class AccountDataValidator 
{
    public data: Partial<TransactionAccount>;
    public errors: string;

    public constructor (account: TransactionAccount)
    {
        this.errors = "";
        this.data = this.validate(account);
    }

    public validate (user: TransactionAccount) : Partial<TransactionAccount>
    {
        const validAgency = new AgencyValidator(user.agency);
        const validAgencyI = new AgencyIValidator(user.agency_identifier);
        const validAccount = new AccountValidator(user.account);
        const validAccountI = new AccountIValidator(user.account_identifier);
        const validCPF = user.cpf != undefined? new CPFValidator(user.cpf) : null;

        this.errors = this.errors.concat(`${validAgency.errors}${validAgencyI.errors}${validAccount.errors}${validAccountI.errors}${validCPF?validCPF.errors:''}`)
    
        const userData: Partial<TransactionAccount> = {
            agency:validAgency.data,
            agency_identifier:validAgencyI.data,
            account:validAccount.data,
            account_identifier:validAccountI.data,
            cpf:validCPF?validCPF.data:''
        }

        return userData;
    }
}

export default AccountDataValidator;