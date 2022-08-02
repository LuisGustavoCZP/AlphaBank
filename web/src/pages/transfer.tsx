/* eslint-disable react/react-in-jsx-scope */
import { DataBox, DataBoxLabels } from '../components/DataBox';
import { Navigator } from '../components/Navigator';
import { BankInput, BankInputType } from '../components/BankInput';
import { Private } from '../routes';
import "../styles/transactions.css";
import { IAccount, useUser } from '../providers/UserProvider';
import { AccountInput } from '../components/AccountInput';
import { useState } from 'react';

export function TransferPage ()
{
    const {account} = useUser();
    const [acc, setAcc] = useState<IAccount>();

    return (
        <Private>
            <div>
                <Navigator></Navigator>
                <main className='flex w-full h-full flex-col justify-center px-6'>
                    <DataBox className='mb-0' label={DataBoxLabels.TRANSFERÊNCIA}>
                        <ul className='flex flex-grow flex-col'>
                            <li className='flex flex-grow flex-col flex-shrink'>
                                <h3>Origem</h3>
                                <AccountInput readonly value={account}/>
                            </li>
                            <li className='flex flex-grow flex-col w-full'>
                                <h3>Destino</h3>
                                <AccountInput value={acc}/>
                            </li>
                            <li className='flex flex-grow flex-col w-full'>
                                <BankInput className='flex-grow' placeholder=''></BankInput>
                            </li>
                            <li className='flex flex-grow flex-col w-full'>
                                <BankInput className='flex-grow' placeholder=''></BankInput>
                            </li>
                            <li>
                                <button className='btn-primary-base'>Transferir</button>
                            </li>
                        </ul>
                    </DataBox>
                </main>
            </div>
        </Private>
    );
}