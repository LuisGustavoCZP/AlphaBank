import { useState } from "react";
import { BankInput, BankInputType } from "./BankInput";

/* eslint-disable react/react-in-jsx-scope */
interface CPFInput 
{
    className?:string
    onInput? : (value : string) => void
    value? : string
    placeholder? : string
    isError? : boolean
    label? : string
}

export function CPFInput (props : CPFInput)
{
    const [cpf, setCPF] = useState<string>(props.value != undefined?props.value:'');

    function InputHandle (target : HTMLInputElement)
    {
        if(!props.onInput) return;
        const f = target.value.replace(/[.-]/gi, '');
        const ns = f.split('');
        
        const n = ns.length > 0 ? ns.reduce((p, c, i) => 
        {
            if(i % 3 == 0 && i < 9) p+=".";
            else if (i == 9) p+="-";
            p += c;
            return p;
        }) : '';

        setCPF(n)
        props.onInput(n);
    }

    return (<BankInput placeholder={props.placeholder} isError={props.isError} label={props.label} type={BankInputType.CPF} className={`${props.className?props.className:''}`} onInput={InputHandle} value={cpf}></BankInput>);
}