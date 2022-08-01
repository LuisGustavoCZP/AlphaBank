import React, { useState } from "react";
import { BankInput, BankInputType } from "../components/BankInput";
import { Public } from "../routes";

/* eslint-disable react/react-in-jsx-scope */
export function RegisterPage ()
{
    const [nameInput, setNameInput] = useState('');
    const [cpfInput, setCpfInput] = useState('');
    const [dateInput, setDateInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [passInput, setPassInput] = useState('');
    const [passConfirm, setpassConfirm] = useState('');

    function inputHandler (target : HTMLInputElement){
        const type = target?.type;
        const t = target as any;

        switch (type){
            case '0':
                setCpfInput(t.value);
                break;
            case '1':
                setDateInput(t.value);
                break;
            case '2':
                setPassInput(t.value);
                break;
            case '6':
                setNameInput(t.value);
                break;
            case '7':
                setEmailInput(t.value);
                break;
        }
    }

    function passConfirmHandler (target : HTMLInputElement)
    {
        const t = target as any;
        console.log(t.value);
        setPassInput(t.value);
    }

    function registerHandler (e : React.MouseEvent<HTMLButtonElement>)
    {
        console.log(`Registring ${nameInput}`);
    }

    return (
        <Public>
            <section className="flex flex-col w-full h-full justify-center items-center">
                <BankInput label="" type={BankInputType.Name} onInput={inputHandler} value={nameInput} placeholder={"Digite seu Nome"} ></BankInput>
                <BankInput label="" type={BankInputType.Date} onInput={inputHandler} value={cpfInput} placeholder={"Digite sua Data de Nascimento"} ></BankInput>
                <BankInput label="" type={BankInputType.CPF} onInput={inputHandler} value={dateInput} placeholder={"Digite seu CPF"} ></BankInput>
                <BankInput label="" type={BankInputType.Email} onInput={inputHandler} value={emailInput} placeholder={"Digite seu Email"} ></BankInput>
                <BankInput label="" type={BankInputType.Password} onInput={inputHandler} value={passInput} placeholder={"Digite sua Senha"}></BankInput>
                <BankInput label="" type={BankInputType.Password} onInput={passConfirmHandler} value={passConfirm} placeholder={"Confirme sua Senha"}></BankInput>
                <button onClick={registerHandler}>Cadastrar</button>
            </section>
        </Public>
    );
}