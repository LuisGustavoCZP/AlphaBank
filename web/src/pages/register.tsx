import React, { useState } from "react";
import { BankInput, BankInputType } from "../components/BankInput";
import { useUser } from "../providers/UserProvider";
import { Public } from "../routes";
import { Link } from 'react-router-dom';
import ReactLogo  from "../assets/logo.svg";
import '../styles/inputs.css';
import { Send } from "../libs/sender";
import { CPFInput } from "../components/CPFInput";

/* eslint-disable react/react-in-jsx-scope */
export function RegisterPage ()
{
    const [nameInput, setNameInput] = useState('');
    const [cpfInput, setCpfInput] = useState('');
    const [dateInput, setDateInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [passInput, setPassInput] = useState('');
    const [passConfirm, setpassConfirm] = useState('');

    const [errors, setErros] = useState<any>({});
    const [passCError, setPassCError] = useState('');

    /*function inputHandler (target : HTMLInputElement){
        const type = target?.type;
        const t = target as any;
        console.log(type);

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
    }*/

    function cpfHandler (value : string){
        setCpfInput(value);
    }

    function nameHandler (target : HTMLInputElement){
        const type = target?.type;
        const t = target as any;
        setNameInput(t.value);
    }

    function dateHandler (target : HTMLInputElement){
        const type = target?.type;
        const t = target as any;
        setDateInput(t.value);
    }

    function passHandler (target : HTMLInputElement){
        const type = target?.type;
        const t = target as any;
        setPassInput(t.value);
    }

    function emailHandler (target : HTMLInputElement){
        const type = target?.type;
        const t = target as any;
        setEmailInput(t.value);
    }

    function passConfirmHandler (target : HTMLInputElement)
    {
        const t = target as any;
        console.log(t.value);
        setpassConfirm(t.value);
    }

    async function registerHandler (e : React.MouseEvent<HTMLButtonElement>)
    {
        if(passInput != passConfirm) 
        {
            setPassCError('As senhas são diferentes');
            return;
        }

        const birthdate = dateInput.split("/").reverse().join("-");
        console.log(birthdate);

        const user = {
            name: nameInput,
            cpf: cpfInput,
            birthdate: birthdate,
            email: emailInput,
            password: passInput
        }
        console.log(`Registring ${nameInput}`);
        const resp = await Send("account/create", user);
        console.log(resp);

        if(resp.messages.length > 0)
        {
            const obj : any = {};
            resp.messages.forEach((msg : string) => 
            {
                const t = msg.split(":");
                obj[t[0]] = t[1];
            });
            setErros(obj);
        }
    }

    return (
        <Public>
            <div>
                <section className="flex flex-col w-full h-full justify-center items-center">
                    <div className="max-w-[75%] flex flex-col w-full h-full justify-center items-center" >
                        <img src={ReactLogo} alt="Alpha Bunker" width="103px" height="103px" />
                        <h3 className="titlePages">Crie sua conta</h3>
                        <BankInput className="input mt-[5px]" isError={errors.name && errors.name != ''} label={errors.name?errors.name:''} type={BankInputType.Name} onInput={nameHandler} value={nameInput} placeholder={"Digite seu Nome"} ></BankInput>
                        <BankInput className="input mt-[5px]" isError={errors.date && errors.date != ''} label={errors.date?errors.date:''} type={BankInputType.Date} onInput={dateHandler} value={dateInput} placeholder={"Digite sua Data de Nascimento"} ></BankInput>
                        <CPFInput className="mt-[5px]" isError={errors.cpf && errors.cpf != ''} label={errors.cpf?errors.cpf:''} onInput={cpfHandler} value={cpfInput} placeholder={"Digite seu CPF"}/>
                        <BankInput className="input mt-[5px]" isError={errors.email && errors.email != ''} label={errors.email?errors.email:''} type={BankInputType.Email} onInput={emailHandler} value={emailInput} placeholder={"Digite seu Email"} ></BankInput>
                        <BankInput className="input mt-[5px]" isError={errors.pass && errors.pass != ''} label={errors.pass?errors.pass:''} type={BankInputType.Password} onInput={passHandler} value={passInput} placeholder={"Digite sua Senha"}></BankInput>
                        <BankInput className="input mt-[5px]" isError={passCError != ''} label={passCError} type={BankInputType.Password} onInput={passConfirmHandler} value={passConfirm} placeholder={"Confirme sua Senha"}></BankInput>
                        <button className="btn-primary-base w-full mt-[10px]" onClick={registerHandler}>Cadastrar</button>
                        <Link className="logintransfer" to={'/login'}>Entrar</Link>
                    </div>
                </section>
            </div>
        </Public>
    );
}