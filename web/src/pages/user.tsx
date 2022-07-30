/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navigator } from "../components/Navigator";
import { ExtractPage, TransferPage } from "./"

function SubPage (getAction : string)
{
    const location = useLocation();
    /* useEffect(() => {
        ga.send(["pageview", location.pathname]);
    }, [location]); */
    console.log(location);
    switch (location.hash) 
    {
        case "/extract":
            return ExtractPage();
        case "/transfer":
            return TransferPage();
        case "/deposit":
            return ExtractPage();
        case "/withdraw":
            return ExtractPage();
        default:
            return <></>;
    }
}

export function UserPage ()
{
    const [getAction, setAction] = useState('/extract');
    console.log();
    
    return (
        <div>
            <Navigator action={setAction}/>
            { SubPage (getAction) }
        </div>
    );
}