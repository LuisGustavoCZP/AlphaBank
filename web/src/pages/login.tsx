import React, { FormEvent, useState } from "react";

/* eslint-disable react/react-in-jsx-scope */
export function LoginPage ()
{
    const [userInput, setUserInput] = useState('');
    const [passInput, setPassInput] = useState('');

    function userInputHandler (e : FormEvent<HTMLInputElement>)
    {
        const t = e.target as any;
        console.log(t);
        setUserInput(t.value);
    }

    function passInputHandler (e : FormEvent<HTMLInputElement>)
    {
        const t = e.target as any;
        console.log(t.value);
    }

    function loginHandler (e : React.MouseEvent<HTMLButtonElement>)
    {
        console.log(e);
    }

    return (
        <>
            <input type="text" onInput={userInputHandler} value={userInput}/>
            <input type="password" onInput={passInputHandler} value={passInput}/>
            <button onClick={loginHandler}>Entrar</button>
        </>
    );
}