import { IAccount } from "../providers/UserProvider"
import { BankInput, BankInputType } from "./BankInput";

interface AccountInputProps {
    className? : string
    value?: IAccount
    readonly?: boolean
    onAccount?: (target: HTMLInputElement) => void
    onAgency?: (target: HTMLInputElement) => void
}
/* eslint-disable react/react-in-jsx-scope */
export function AccountInput (props : AccountInputProps)
{
    const agTxt = props.value?`${props.value.agency}-${props.value.agency_identifier}`:'';
    const acTxt = props.value?`${props.value.account}-${props.value.account_identifier}`:'';

    return (
        <div className={`flex flex-row justify-between${props.className?` ${props.className}`:''}`}>
            <BankInput className="flex flex-row" label='Agência' type={BankInputType.Agency} readonly={props.readonly} onInput={props.onAccount} value={agTxt} />
            <BankInput className="flex flex-row" label='Conta' type={BankInputType.Account} readonly={props.readonly} onInput={props.onAgency} value={acTxt}/>
        </div>
    );
}