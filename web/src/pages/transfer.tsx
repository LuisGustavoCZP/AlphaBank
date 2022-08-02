/* eslint-disable react/react-in-jsx-scope */
import { Navigator } from '../components/Navigator';
import { Private } from '../routes';
import "../styles/transactions.css";
import { DataBox, DataBoxLabels } from '../components/DataBox';
import { BankInput, BankInputType } from '../components/BankInput';
import { AccountInput } from '../components/AccountInput';
import { IAccount, useUser } from '../providers/UserProvider';
import { useState } from 'react';

export function TransferPage ()
{
    const {account} = useUser();
    const [acc, setAcc] = useState<IAccount>();

    function AccountHandler (target : HTMLInputElement)
    {
        console.log(target.value);
    }

    function AgencyHandler (target : HTMLInputElement)
    {
        console.log(target.value);
    }

    return (
        <Private>
            <div>
                <Navigator></Navigator>
                <main className='flex w-full h-full flex-col justify-center px-6'>
                    <DataBox className='mb-0 boxpaint' label={DataBoxLabels.TRANSFERÊNCIA}>
                        <ul className='flex flex-grow flex-col'>
                            <li className='flex flex-grow flex-col flex-shrink'>
                                <h3>Origem</h3>
                                <AccountInput readonly value={account}/>
                            </li>
                            <li className='flex flex-grow flex-col w-full'>
                                <h3>Destino</h3>
                                <AccountInput onAccount={AccountHandler} onAgency={AgencyHandler} value={acc}/>
                            </li>
                            <li className='flex flex-grow flex-col w-full mt-2'>
                                <BankInput type={BankInputType.Value} className='flex-grow' placeholder='Valor' />
                            </li>
                            <li className='flex flex-grow flex-col w-full mt-2'>
                                <BankInput type={BankInputType.Password} className='flex-grow' placeholder='Senha' />
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