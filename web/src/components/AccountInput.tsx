import { useState } from "react";
import { IAccount } from "../providers/UserProvider"
import { BankInput, BankInputType } from "./BankInput";

interface AccountInputProps {
    name : string
    className? : string
    value?: IAccount
    readonly?: boolean
    onAccount?: (target: IAccount) => void
    errors?: any;
    /* onAgency?: (target: HTMLInputElement) => void */
}
/* eslint-disable react/react-in-jsx-scope */
export function AccountInput (props : AccountInputProps)
{
    const {value:acc, errors} = props;

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

    const name1 = `${props.name}-agency`;
    const name2 = `${props.name}-account`;

    return (
        <div className={`flex flex-col w-full overflow-hidden justify-between${props.className?` ${props.className}`:''}`}>
            <span className="flex flex-row w-full overflow-hidden justify-between">
            <BankInput className="flex flex-col w-4/12" name={name1} label='Agência' type={BankInputType.Agency} readonly={props.readonly} onInput={InputAgency} value={agTxt} />
            <BankInput className="flex flex-col w-5/12" name={name2} label='Conta' type={BankInputType.Account} readonly={props.readonly} onInput={InputAccount} value={acTxt}/>
            </span>
            {errors?<p className="error">{errors}</p>:<></>}
        </div>
    );
}