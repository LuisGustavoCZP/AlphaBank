/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */

import { FormEvent } from "react";

export interface BankInputProps
{
    label? : string
    type? : BankInputType
    placeholder : string
    readonly? : boolean
    onInput? : (e : HTMLInputElement) => void
    value? : string
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
    /* CPF: */      '[\\d\\.-]+',
    /* Date: */     '[\\d\\.-]+',
    /* Password: */ '[\\w\\d]+',
    /* Agency: */   '[\\d-]+',
    /* Account: */  '(\\d-)+',
    /* Value:  */   '(\\d)+',
    /* Name: */     '[a-zA-Z]+',
    /* Email: */     '[\w-\.]+@([\w-]+\.)+[\w-]{2,4}'
];

const bankInputTypes = [
    /* CPF: */      'text',
    /* Date: */     'text',
    /* Password: */ 'password',
    /* Agency: */   'text',
    /* Account: */  'text',
    /* Value:  */   'number',
    /* Name: */     'text',
    /* Email: */     'text'
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
        const regex = props.type? bankInputRegex[props.type] : undefined;
        const target = e.target as HTMLInputElement;
        if(regex != undefined) 
        {
            const matchs = target.value.match(new RegExp(regex, 'gmi'));
            if(matchs && matchs.length > 0) target.value = matchs[0];
        }
        if(props.onInput) props.onInput(target);
        console.log(target.value);
    }

    function InputCreation ()
    {
        if(!(props.readonly))
            return (
                <input type="text" 
                id={id}
                typeof={props.type? bankInputTypes[props.type] : 'text'}
                placeholder={props.placeholder?props.placeholder:''}
                onInput={InputChanged}
                value={props.value}
                className="input"
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
        
        <>
            { InputCreation () }
            <label htmlFor={id}>{props.label}</label>
        </>
    )
    
}