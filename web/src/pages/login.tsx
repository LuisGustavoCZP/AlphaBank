import React, { FormEvent, useState } from "react";
import { useUser, UserContext } from "../providers/UserProvider";
import { Public } from "../routes";

/* eslint-disable react/react-in-jsx-scope */
export function LoginPage ()
{
    const { login } = useUser();
    const [userInput, setUserInput] = useState('');
    const [passInput, setPassInput] = useState('');
    const userRegex = new RegExp('[\\d\\.-]+', 'gi');
    const passRegex = new RegExp('[\\w\\d]+', 'gi');

    function userInputHandler (e : FormEvent<HTMLInputElement>)
    {
        const t = e.target as any;
        const v = t.value.match(userRegex);
        console.log(v);
        
        setUserInput(v?v[0]:'');
    }

    function passInputHandler (e : FormEvent<HTMLInputElement>)
    {
        const t = e.target as any;
        const v = t.value.match(passRegex);
        console.log(v);
        setPassInput(v?v[0]:'');
    }

    function loginHandler (e : React.MouseEvent<HTMLButtonElement>)
    {
        console.log(`Login to ${userInput}:${passInput}`)
        if(login) login(userInput, passInput);
    }

    return (
        <Public>
            <section className="flex flex-col w-full h-full justify-center items-center">
                <input type="text" onInput={userInputHandler} value={userInput}/>
                <input type="password" onInput={passInputHandler} value={passInput}/>
                <button onClick={loginHandler}>Entrar</button>
            </section>
        </Public>
    );
}