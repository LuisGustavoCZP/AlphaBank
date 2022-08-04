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
    const [errors, setErros] = useState<any>({});

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

    async function loginHandler (e : React.MouseEvent<HTMLButtonElement>)
    {
        console.log(`Login to ${userInput}:${passInput}`);
        const resp = await login(userInput, passInput);
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
                    <div className="flex flex-col w-4/5 h-full justify-center items-center" >
                        <img className="mb-4" src={ReactLogo} alt="Alpha Bunker" />
                        <h3 className="titlePages text-[#F7F7F7]">Login</h3>
                        <CPFInput className="mt-6 w-full" name='username' isError={(errors.cpf && errors.cpf != '') || (errors.user && errors.user != '')} label={errors.user?errors.user:errors.cpf?errors.cpf:''} onInput={cpfInputHandler} value={userInput} placeholder={"Digite seu CPF"}/>
                        <BankInput className="mt-5 mb-6 w-full" name='password' isError={errors.password && errors.password != ''} label={errors.password?errors.password:''} type={BankInputType.Password} onInput={passInputHandler} value={passInput} placeholder={"Digite sua Senha"}></BankInput>
                        <Button className="w-full" onClick={loginHandler} label='Entrar' />
                        <Link className="logintransfer" to={'/register'}>Crie sua conta</Link>
                    </div>
                </section>
            </div>
        </Public>
    );
}