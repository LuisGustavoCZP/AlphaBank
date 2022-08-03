import React, { useState } from "react";
import { BankInput, BankInputType } from "../components/BankInput";
import { useUser } from "../providers/UserProvider";
import { Public } from "../routes";
import { Link } from 'react-router-dom';
import ReactLogo  from "../assets/logo.svg";
import '../styles/inputs.css';
import { CPFInput } from "../components/CPFInput";
import { Button } from "../components/Button";

/* eslint-disable react/react-in-jsx-scope */
export function LoginPage ()
{
    const { login } = useUser();
    const [userInput, setUserInput] = useState('');
    const [passInput, setPassInput] = useState('');

    function cpfInputHandler (value : string)
    {
        //console.log(value);
        setUserInput(value);
    }

    function passInputHandler (target : HTMLInputElement)
    {
        const t = target as any;
        //console.log(t.type);
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
                        <CPFInput className="m-[10px]" name='username' onInput={cpfInputHandler} value={userInput} placeholder={"Digite seu CPF"}/>
                        <BankInput className="m-[10px]" name='password' type={BankInputType.Password} onInput={passInputHandler} value={passInput} placeholder={"Digite sua Senha"}></BankInput>
                        <Button className="w-full" onClick={loginHandler} label='Entrar' />
                        <Link className="logintransfer" to={'/register'}>Crie sua conta</Link>
                    </div>
                </section>
            </div>
        </Public>
    );
}