/* eslint-disable react/react-in-jsx-scope */

import { ArrowLeft } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { DataBox, DataBoxLabels } from "./DataBox";
import { ProfileAccountsData } from "./ProfileAccountsData";
import { ProfileUserData } from "./ProfileUserData";

export function ProfilePage ()
{
    const [profileData, setProfileData] = useState<JSX.Element[]>([]);
    const [profileAccountsData, setProfileAccountsData] = useState<JSX.Element[]>([]);

    useEffect(() =>
    {
        const response = async () =>
        {
            const resp = (await getData()).data;
            const name = resp.user[0].name;
            const birthday = resp.user[0].birthdate;
            const cpf = resp.user[0].cpf;

            const branch = `${resp.account.agency}-${resp.account.agency_identifier}`;
            const account = `${resp.account.account}-${resp.account.account_identifier}`;

            setProfileData([<ProfileUserData key={resp.user[0].id} name={name} birthday={birthday} cpf={cpf}></ProfileUserData>]);
            setProfileAccountsData([<ProfileAccountsData key={resp.account.id} branch={branch} account={account}></ProfileAccountsData>]);
        }

        response();
    }, []);

    return (
        <div className="bg-[#eaedf0] flex-col items-center justify-center">
            <div className="relative flex-col bg-[#337782] w-full h-52 mb-10 rounded-b-3xl">
                <Link to={'/'}><ArrowLeft className="absolute left-6 top-6" size={32} color='white' /></Link>
                <div className="absolute flex items-end justify-center m-auto left-0 right-0 top-0 bottom-0 w-40 h-28 text-center">
                    <div className="absolute bg-white w-20 h-20 m-auto left-0 right-0 top-0 rounded-full">

                    </div>
                    <span className="text-white font-medium text-xl">Dhesem Pregads</span>
                </div>
            </div>
            <div className="px-6 flex-col flex-nowrap gap-8 h-screen">
                <DataBox label={DataBoxLabels.MEUS_DADOS}>
                    {profileData}
                </DataBox>
                <DataBox label={DataBoxLabels.MINHAS_CONTAS_CORRENTES}>
                    {profileAccountsData}
                </DataBox>
            </div>
        </div>
    );
}

async function getData()
{
    const requestJson = 
    {
        account:
        {
            agency: "10",
            agency_identifier: "0",
            account: "20",
            account_identifier: "4",
            cpf:"082.839.549-06"
        },
        password: "123456"
    }

    try {        
        const response = await fetch('http://localhost:8000/extract', 
        {
            method: 'POST', 
            headers: 
            {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestJson)
        });

        const responseJson = await response.json();

        return responseJson;  
    } catch (error) {
        console.log(error);        
    }
}