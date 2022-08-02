import { useState } from "react";
import { BankInput, BankInputType } from "./BankInput";

/* eslint-disable react/react-in-jsx-scope */
interface MoneyInputProps
{
    className?:string
    onInput? : (value : number) => void
    value? : number
    isError? : boolean
    label? : string
    name? : string
}

export function MoneyInput (props : MoneyInputProps)
{
    const [money, setMoney] = useState<number>(props.value != undefined?props.value:0);
    //const txt = money?money.toFixed(2):undefined;

    function InputHandle (target : HTMLInputElement)
    {
        if(!props.onInput) return;
        const f = target.value.replace('.', '');
        const ns = f.split('');
        
        let n = "0";

        if (ns.length == 1) n = `0.0${ns[0]}`;
        else if (ns.length == 2) n = `0.${ns[0]}${ns[1]}`;
        else if (ns.length > 2) n = ns.reduce((p, c, i) => 
        {
            if(i == ns.length-2) p+=".";
            p += c;
            return p;
        });
        /* const max = f.length;
        const n = `${max>2?f.slice(0, max-2):'0'},${f.match(/\d{1,2}/)}`; */
        //console.log(n);
        const m = Number(n);
        setMoney(m)
        props.onInput(m);
    }

    return (<BankInput type={BankInputType.Value} name={props.name} isError={props.isError} label={props.label} className={`${props.className?props.className:''}`} onInput={InputHandle} placeholder='Valor' value={money > 0?money.toFixed(2):''}></BankInput>);
}