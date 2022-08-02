import { useState } from "react";
import { IAccount } from "../providers/UserProvider"
import { BankInput, BankInputType } from "./BankInput";

interface AccountInputProps {
    className? : string
    value?: IAccount
    readonly?: boolean
    onAccount?: (target: IAccount) => void
    /* onAgency?: (target: HTMLInputElement) => void */
}
/* eslint-disable react/react-in-jsx-scope */
export function AccountInput (props : AccountInputProps)
{
    const {value:acc} = props;

    const [ac, setAc] = useState<string>(acc?.account || '');
    const [acI, setAcI] = useState<string>(acc?.account_identifier || '');
    const [ag, setAg] = useState<string>(acc?.agency || '');
    const [agI, setAgI] = useState<string>(acc?.agency_identifier || '');

    const agTxt = acc?`${ag}${agI?`-${agI}`:''}`:'';
    const acTxt = acc?`${ac}${acI?`-${acI}`:''}`:'';
    //console.log("AI", agTxt, acTxt);

    function InputAccount (target : HTMLInputElement)
    {
        if(!props.onAccount) return;
        const nacc = acc ? acc : {
            account:'', account_identifier:'',
            agency:'', agency_identifier: ''
        };

        const v = target.value.replace('-', '');
        const max = v.length;
        nacc.account_identifier = v.slice(max-1, max);
        nacc.account = v.slice(0, max-1);
        setAcI(nacc.account_identifier);
        setAc(nacc.account);
        props.onAccount(nacc);
    }

    function InputAgency (target : HTMLInputElement)
    {
        if(!props.onAccount) return;
        const nacc = acc ? acc : {
            account:'', account_identifier:'',
            agency:'', agency_identifier: ''
        };

        const v = target.value.replace('-', '');
        const max = v.length;
        nacc.agency_identifier = v.slice(max-1, max);
        nacc.agency = v.slice(0, max-1);
        setAgI(nacc.agency_identifier);
        setAg(nacc.agency);
        props.onAccount(nacc);
    }

    return (
        <div className={`flex flex-row justify-between${props.className?` ${props.className}`:''}`}>
            <BankInput className="flex flex-col w-4/12" label='Agência' type={BankInputType.Agency} readonly={props.readonly} onInput={InputAgency} value={agTxt} />
            <BankInput className="flex flex-col w-5/12" label='Conta' type={BankInputType.Account} readonly={props.readonly} onInput={InputAccount} value={acTxt}/>
        </div>
    );
}