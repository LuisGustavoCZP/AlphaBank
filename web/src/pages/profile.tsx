/* eslint-disable react/react-in-jsx-scope */

import { ArrowLeft } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { DataBox, DataBoxLabels } from "../components/DataBox";
import { ProfileAccountsData } from "../components/ProfileAccountsData";
import { ProfileUserData } from "../components/ProfileUserData";
import { useUser } from "../providers/UserProvider";

export function ProfilePage ()
{
    const {userData} = useUser();
    const [profileData, setProfileData] = useState<JSX.Element[]>([]);
    const [profileAccountsData, setProfileAccountsData] = useState<JSX.Element[]>([]);

    useEffect(() =>
    {
        const response = async () =>
        {
            const name = userData?.user.name;
            const birthday = prepareDate(userData?.user.birthdate as string);
            const cpf = userData?.user.cpf;

            const accounts = userData?.accounts;
            const accountElements = [];

            if (accounts !== undefined ) {
                for (const account of accounts) {
                    const branch = `${account.agency}-${account.agency_identifier}`;
                    const fullAccount = `${account.account}-${account.account_identifier}`;
                    accountElements.push(<ProfileAccountsData key={account.created_at} branch={branch} account={fullAccount}></ProfileAccountsData>);
                }
            }

            setProfileData([<ProfileUserData key={userData?.user.cpf} name={name as string} birthday={birthday as string} cpf={cpf as string}></ProfileUserData>]);
            setProfileAccountsData(accountElements);
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

function prepareDate(dateString: string)
{
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toLocaleString('pt-BR', {minimumIntegerDigits: 2, useGrouping:false});
    const day = date.getDate().toLocaleString('pt-BR', {minimumIntegerDigits: 2, useGrouping:false});

    return `${day}/${month}/${year}`;
}