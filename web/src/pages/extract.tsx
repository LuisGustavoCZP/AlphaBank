/* eslint-disable react/react-in-jsx-scope */
import { Navigator } from '../components/Navigator';
import { Private } from '../routes';
import { useEffect, useState } from "react";
import { DataBox, DataBoxLabels } from "../components/DataBox";
import { ExtractData } from "../components/ExtractData";
import { IExtract, useUser } from '../providers/UserProvider';
import { BellSimple } from 'phosphor-react';

export function ExtractPage ()
{
    const {userData, account, extract} = useUser();
    const [transactionsData, setTransactionsData] = useState<JSX.Element[]>([]);

    /* useEffect(() =>
    { */
        const response = () =>
        {
            const extractDatas: any = [];
            const transactionsObject: any = {};

            if(!extract) return;
            const resp = extract as IExtract;//(await getData(userData?.user.cpf, account)).data;

            for (const transactions of resp.transactions) {
                const createdAt = prepareDate(transactions.created_at);

                if (!Object.hasOwn(transactionsObject, createdAt)) {
                    transactionsObject[createdAt] = [] ;
                }
                
                const id = transactions.id;
                const type = transactions.type;
                const value = transactions.value;
                transactionsObject[createdAt].push({id, type, value});
            }

            for (const [createdAt, transactions] of Object.entries(transactionsObject)) {
                extractDatas.push(<li key={createdAt}><ExtractData createdAt={createdAt} transactions={transactions as any} /></li>);
            }
            
            return extractDatas;
            //setTransactionsData(extractDatas);
        }

        //response();
    /* }, [extract]); */

    return (
        <Private>
            <div>
                <Navigator />
                <main className="flex h-full w-full flex-col items-center justify-center overflow-hidden px-6 py-4">
                    <DataBox label={DataBoxLabels.EXTRATO_DE_TRANSAÇOES} icon={<BellSimple className='text-[#777777]' size={24}/>}>
                        <div className='flex max-h-full h-fit w-full overflow-y-scroll justify-center'>
                            <ul className='flex flex-col h-fit w-full'>{response()}</ul>
                        </div>
                    </DataBox>
                </main>
            </div>
        </Private>
    );
}

function prepareDate(dateString: string)
{
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${day}/${month}/${year}`;
}

async function getData(cpf: string | undefined, account: any)
{
    const requestJson = 
    {
        account:
        {
            agency: account.agency,
            agency_identifier: account.agency_identifier,
            account: account.account,
            account_identifier: account.account_identifier,
            cpf
        }
    }

    try {        
        const response = await fetch('http://localhost:8000/extract', 
        {
            method: 'POST', 
            headers: 
            {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(requestJson)
        });

        const responseJson = await response.json();

        return responseJson;  
    } catch (error) {
        console.log(error);        
    }
}