/* eslint-disable react/react-in-jsx-scope */
import { Navigator } from '../components/Navigator';
import { Private } from '../routes';
import "../styles/transactions.css";
import { useState } from 'react';

import { DataBox, DataBoxLabels } from '../components/DataBox';
import { BankInput, BankInputType } from '../components/BankInput';
import { AccountInput } from '../components/AccountInput';
import { IAccount, useUser } from '../providers/UserProvider';
import { MoneyInput } from '../components/MoneyInput';

export function WithdrawPage ()
{
    const {account} = useUser();
    const [quanty, setQuanty] = useState<number>();

    function QuantyHandler (target : number)
    {
        setQuanty(target);
        //console.log("my", target);
    }

    return (
        <Private>
            <div>
                <Navigator></Navigator>
                <main className='flex w-full h-full flex-col justify-center px-6'>
                    <DataBox className='mb-0' label={DataBoxLabels.SAQUE}>
                        <ul className='flex flex-grow flex-col'>
                            <li className='flex flex-grow flex-col flex-shrink'>
                                <h3>Origem</h3>
                                <AccountInput readonly value={account}/>
                            </li>
                            <li className='flex flex-grow flex-col w-full mt-2'>
                                <MoneyInput className='flex-grow' onInput={QuantyHandler} value={quanty} />
                            </li>
                            <li className='flex flex-grow flex-col w-full mt-2'>
                                <BankInput type={BankInputType.Password} className='flex-grow' placeholder='Senha'></BankInput>
                            </li>
                            <li className='flex flex-grow flex-col w-full mt-2'>
                                <button className='btn-primary-base'>Sacar</button>
                            </li>
                        </ul>
                    </DataBox>
                </main>
            </div>
        </Private>
    );
}