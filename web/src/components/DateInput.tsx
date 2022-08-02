import { useState } from "react";
import { BankInput, BankInputType } from "./BankInput";

/* eslint-disable react/react-in-jsx-scope */
interface DateInputProps 
{
    className?:string
    onInput? : (value : string) => void
    value? : string
    placeholder? : string
    isError? : boolean
    label? : string
    name? : string
}

export function DateInput (props : DateInputProps)
{
    const [date, setDate] = useState<string>(props.value != undefined?props.value:'');

    function InputHandle (target : HTMLInputElement)
    {
        if(!props.onInput) return;
        const f = target.value.replace(/[/]/gi, '');
        const ns = f.split('');
        
        const n = ns.length > 0 ? ns.reduce((p, c, i) => 
        {
            if(i % 2 == 0 && i < 5) p+="/";
            /* else if (i == 5) p+="/"; */
            p += c;
            return p;
        }) : '';

        setDate(n)
        props.onInput(n);
    }

    return (<BankInput name={props.name} placeholder={props.placeholder} isError={props.isError} label={props.label} type={BankInputType.Date} className={`${props.className?props.className:''}`} onInput={InputHandle} value={date}></BankInput>);
}