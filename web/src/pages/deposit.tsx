/* eslint-disable react/react-in-jsx-scope */
import { Navigator } from '../components/Navigator';
import { Private } from '../routes';
import "../styles/transactions.css";
import { DataBox, DataBoxLabels } from '../components/DataBox';
import { BankInput, BankInputType } from '../components/BankInput';
import { AccountInput } from '../components/AccountInput';
import { IAccount, useUser } from '../providers/UserProvider';
import { useState } from 'react';

export function DepositPage ()
{
    const {account} = useUser();

    return (
        <Private>
            <div>
                <Navigator></Navigator>
                <main className='flex w-full h-full flex-col justify-center px-6'>
                    <DataBox className='mb-0' label={DataBoxLabels.DEPOSITO}>
                        <ul className='flex flex-grow flex-col'>
                            <li className='flex flex-grow flex-col flex-shrink'>
                                <h3>Origem</h3>
                                <AccountInput readonly value={account}/>
                            </li>
                            <li className='flex flex-grow flex-col w-full'>
                                <BankInput className='flex-grow' placeholder=''></BankInput>
                            </li>
                            <li className='flex flex-grow flex-col w-full'>
                                <BankInput className='flex-grow' placeholder=''></BankInput>
                            </li>
                            <li className='flex flex-grow flex-col w-full mt-2'>
                                <button className='btn-primary-base'>Transferir</button>
                            </li>
                        </ul>
                    </DataBox>
                </main>
            </div>
        </Private>
    );
}