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
import { Send } from '../libs/sender';

export function WithdrawPage ()
{
    const {account, userData} = useUser();
    const [quanty, setQuanty] = useState<number>();
    const [pass, setPass] = useState<string>('');

    function QuantyHandler (target : number)
    {
        setQuanty(target);
        //console.log("my", target);
    }

    function PassHandler (target : HTMLInputElement)
    {
        setPass(target.value);
    }

    async function TransactionHandler ()
    {
        const origin = {
            agency:account?.agency,
            agency_identifier:account?.agency_identifier,
            account:account?.account,
            account_identifier:account?.account_identifier,
            cpf:userData?.user.cpf
        };
        const resp = await Send('withdraw', {origin, password:pass, quanty:quanty});
        if(resp.messages.length > 0)
        {
            return;
        }
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
                                <BankInput type={BankInputType.Password} className='flex-grow' placeholder='Senha' value={pass} onInput={PassHandler} />
                            </li>
                            <li className='flex flex-grow flex-col w-full mt-2'>
                                <button className='btn-primary-base' onClick={TransactionHandler}>Sacar</button>
                            </li>
                        </ul>
                    </DataBox>
                </main>
            </div>
        </Private>
    );
}