/* eslint-disable react/react-in-jsx-scope */
import { Navigator } from '../components/Navigator';
import { Private } from '../routes';
import { useEffect, useState } from "react";
import { DataBox, DataBoxLabels } from "../components/DataBox";
import { ExtractData } from "../components/ExtractData";
import { useUser } from '../providers/UserProvider';

export function ExtractPage ()
{
    const {userData, account} = useUser();
    const [transactionsData, setTransactionsData] = useState<JSX.Element[]>([]);

    useEffect(() =>
    {
        const response = async () =>
        {
            const extractDatas: any = [];
            const transactionsObject: any = {};

            if(!account) return;
            const resp = (await getData(userData?.user.cpf, account)).data;

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
                extractDatas.push(<ExtractData key={createdAt} createdAt={createdAt} transactions={transactions as any} />);
            }
            
            setTransactionsData(extractDatas);
        }

        response();
    }, []);

    return (
        <Private>
            <div>
                <Navigator />
                <div className="bg-[#eaedf0] flex-col items-center justify-center">
                    {/* <div className="relative flex-col bg-[#337782] w-full h-52 mb-10 rounded-b-3xl">
                        <ArrowLeft className="absolute left-6 top-6" size={32} color='white' />
                        <div className="absolute flex items-end justify-center m-auto left-0 right-0 top-0 bottom-0 w-40 h-28 text-center">
                            <div className="absolute bg-white w-20 h-20 m-auto left-0 right-0 top-0 rounded-full">

                            </div>
                            <span className="text-white font-medium text-xl">Dhesem Pregads</span>
                        </div>
                    </div> */}
                    <div className="px-6 flex-col flex-nowrap gap-8 h-screen">
                        <DataBox label={DataBoxLabels.EXTRATO_DE_TRANSAÇOES}>
                            {transactionsData}
                        </DataBox>
                    </div>
                </div>
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