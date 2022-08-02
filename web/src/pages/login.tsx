import React, { useState } from "react";
import { BankInput, BankInputType } from "../components/BankInput";
import { useUser } from "../providers/UserProvider";
import { Public } from "../routes";
import { Link } from 'react-router-dom';
import ReactLogo  from "../assets/logo.svg";
import '../styles/inputs.css';
import { CPFInput } from "../components/CPFInput";

/* eslint-disable react/react-in-jsx-scope */
export function LoginPage ()
{
    const { login } = useUser();
    const [userInput, setUserInput] = useState('');
    const [passInput, setPassInput] = useState('');

    function userInputHandler (target : HTMLInputElement)
    {
        const t = target as any;
        console.log(t.value);
        
        setUserInput(t.value);
    }

    function cpfInputHandler (value : string)
    {
        console.log(value);
        setUserInput(value);
    }

    function passInputHandler (target : HTMLInputElement)
    {
        const t = target as any;
        console.log(t.type);
        setPassInput(t.value);
    }

    function loginHandler (e : React.MouseEvent<HTMLButtonElement>)
    {
        console.log(`Login to ${userInput}:${passInput}`)
        if(login) login(userInput, passInput);
    }

    return (
        <Public>
            <div>
                <section className="flex flex-col w-full h-full justify-center items-center">
                    <div className="max-w-[75%] flex flex-col w-full h-full justify-center items-center" >
                        <img src={ReactLogo} alt="Alpha Bunker" />
                        <h3 className="titlePages">Login</h3>
                        <CPFInput onInput={cpfInputHandler} value={userInput} placeholder={"Digite seu CPF"}/>
                        <BankInput  type={BankInputType.Password} onInput={passInputHandler} value={passInput} placeholder={"Digite sua Senha"}></BankInput>
                        <button className="btn-primary-base w-full" onClick={loginHandler}>Entrar</button>
                        <Link className="logintransfer" to={'/register'}>Crie sua conta</Link>
                    </div>
                </section>
            </div>
        </Public>
    );
}