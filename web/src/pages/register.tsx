import React, { createElement, useState } from "react";
import { BankInput, BankInputType } from "../components/BankInput";
import { useUser } from "../providers/UserProvider";
import { Public } from "../routes";
import { Link } from 'react-router-dom';
import ReactLogo  from "../assets/logo.svg";
import '../styles/inputs.css';
import { Send } from "../libs/sender";
import { CPFInput } from "../components/CPFInput";
import { DateInput } from "../components/DateInput";
import { Button } from "../components/Button";

/* eslint-disable react/react-in-jsx-scope */
export function RegisterPage ()
{
    const { showingBalance, showBalance } = useUser();
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

    function dateHandler (value : string){

        setDateInput(value);
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
        //console.log(birthdate);

        const user = {
            name: nameInput,
            cpf: cpfInput,
            birthdate: birthdate,
            email: emailInput,
            password: passInput
        }
        console.log(`Registring ${nameInput}`);
        const resp = await Send("account/create", user);
        //console.log(resp);

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
        
        window.location.pathname = './login';
        /* const url = new URL(window.location.href);
        url.pathname = '/login';
        console.log(url)
        window.history.pushState({}, '', url);
        showBalance(showingBalance != undefined?!showingBalance:false); */
    }

    return (
        <Public>
            <div>
                <section className="flex flex-col w-full h-full justify-center items-center">
                    <div className="flex flex-col w-4/5 h-full justify-center items-center" >
                        <img className="mb-4" src={ReactLogo} alt="Alpha Bunker" width="103px" height="103px" />
                        <h3 className="titlePages text-[#F7F7F7]">Crie sua conta</h3>
                        <BankInput name='fullname' className="input mt-7 w-full" isError={errors.name && errors.name != ''} label={errors.name?errors.name:''} type={BankInputType.Name} onInput={nameHandler} value={nameInput} placeholder={"Digite seu Nome"} ></BankInput>
                        <DateInput name='birthdate' className="input mt-5 w-full" isError={errors.date && errors.date != ''} label={errors.date?errors.date:''} onInput={dateHandler} value={dateInput} placeholder={"Digite sua Data de Nascimento"} />
                        <BankInput name='email' className="input mt-5 w-full" isError={errors.email && errors.email != ''} label={errors.email?errors.email:''} type={BankInputType.Email} onInput={emailHandler} value={emailInput} placeholder={"Digite seu Email"} ></BankInput>
                        <CPFInput name='cpf' className=" mt-5 w-full" isError={errors.cpf && errors.cpf != ''} label={errors.cpf?errors.cpf:''} onInput={cpfHandler} value={cpfInput} placeholder={"Digite seu CPF"}/>
                        <BankInput name='password' className="input mt-5 w-full" isError={errors.pass && errors.pass != ''} label={errors.pass?errors.pass:''} type={BankInputType.Password} onInput={passHandler} value={passInput} placeholder={"Digite sua Senha"}></BankInput>
                        <BankInput name='password-confirm' className="input mt-5 w-full" isError={passCError != ''} label={passCError} type={BankInputType.Password} onInput={passConfirmHandler} value={passConfirm} placeholder={"Confirme sua Senha"}></BankInput>
                        <Button className=" w-full mt-6" onClick={registerHandler} label='Cadastrar' />
                        <Link className="logintransfer mt-2" to={'/login'}>Entrar</Link>
                    </div>
                </section>
            </div>
        </Public>
    );
}