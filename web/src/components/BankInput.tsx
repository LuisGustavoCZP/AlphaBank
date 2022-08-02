/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */

import { FormEvent } from "react";
import '../styles/inputs.css';

export interface BankInputProps
{
    label? : string
    type? : BankInputType
    placeholder? : string
    readonly? : boolean
    onInput? : (e : HTMLInputElement) => void
    value? : string
    className? : string
    isError? : boolean
    name? : string
}

let inputCount = 0;

export enum BankInputType {
    CPF = 0,
    Date = 1,
    Password = 2,
    Agency = 3,
    Account = 4,
    Value = 5,
    Name = 6,
    Email = 7
}

const bankInputRegex = [
    /* CPF: */      /^[0-9\\.-]{1,14}$/gm,
    /* Date: */     /^[0-9/]{0,10}$/,
    /* Password: */ /^[A-Za-z\d]+$/,
    /* Agency: */   /^(\d){0,}(-{0,1})(\d){0,}$/,
    /* Account: */  /^(\d){0,}(-{0,1})(\d){0,}$/,
    /* Value:  */   /^[\d\\.]+$/,
    /* Name: */     /^[A-Za-z ]+$/,
    /* Email: */    /^[A-Za-z\d@\\.]+$/
];

const bankInputTypes = [
    /* CPF: */      'text',
    /* Date: */     'text',
    /* Password: */ 'password',
    /* Agency: */   'text',
    /* Account: */  'text',
    /* Value:  */   'number',
    /* Name: */     'text',
    /* Email: */    'email'
];

export function inputs ()
{
    if(inputCount >= 999) inputCount = 0;
    else inputCount++;

    return inputCount;
}

export function BankInput (props : BankInputProps)
{
    const id = `input${inputs ()}`;
    function InputChanged (e : FormEvent<HTMLInputElement>)
    {
        const regex = props.type != undefined ? bankInputRegex[props.type] : undefined;
        const target = e.target as HTMLInputElement;
        if(regex != undefined) 
        {
            const matchs = target.value.match(new RegExp(regex, 'gmi'));
            if(matchs != null) {
                target.value = matchs.toString();
            }else{
                target.value = target.value.slice(0, -1);
            }
            //console.log(target.value);
        }
        if(props.onInput) props.onInput(target);
        //console.log(target.value);
    }

    function InputCreation ()
    {
        if(!(props.readonly))
            return (
                <input
                type={props.type != undefined? bankInputTypes[props.type] : 'text'}
                className="ml-2 ipt w-full"
                id={id}
                placeholder={props.placeholder?props.placeholder:''}
                onInput={InputChanged}
                value={props.value}
                name={props.name}
                />
            );
        else 
            return (
                <h4  
                    id={id}
                >
                    {(!props.value) && props.placeholder?props.placeholder:(props.value?props.value:'')}
                </h4>
            );
    }

    return (
        <span className={props.className?props.className:''}>
            { InputCreation () }
            {props.label != undefined && props.label != '' ?<label className={props.isError != undefined ? "error": ""} htmlFor={id}>{props.label}</label>:<></>}
        </span>
    )
    
}