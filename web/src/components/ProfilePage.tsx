/* eslint-disable react/react-in-jsx-scope */

import { useEffect, useState } from "react";
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
        <div className="bg-[#EAEDF0]">
            <DataBox label={DataBoxLabels.MEUS_DADOS}>
                {profileData}
            </DataBox>
            <DataBox label={DataBoxLabels.MINHAS_CONTAS_CORRENTES}>
                {profileAccountsData}
            </DataBox>
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