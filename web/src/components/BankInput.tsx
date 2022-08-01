/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */

import { FormEvent } from "react";
//const userRegex = ;
export interface BankInputProps
{
    label : string
    type? : BankInputType
    placeholder? : string
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
    Value = 5
}

const bankInputRegex = [
    /* CPF: */      '[\\d\\.-]+',
    /* Date: */     '[\\d\\.-]+',
    /* Password: */ '[\\w\\d]+',
    /* Agency: */   '[\\d-]+',
    /* Account: */  '(\\d-)+',
    /* Value:  */   '(\\d)+',
];

const bankInputTypes = [
    /* CPF: */      'text',
    /* Date: */     'text',
    /* Password: */ 'password',
    /* Agency: */   'text',
    /* Account: */  'text',
    /* Value:  */   'number',
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
            <label htmlFor={id}>{props.label}</label>
            { InputCreation () }
        </>
    )
    
}