/* eslint-disable react/react-in-jsx-scope */
import { Navigator } from '../components/Navigator';
import { Private } from '../routes';
import "../styles/transactions.css";
import { useState } from 'react';
import { DataBox, DataBoxLabels } from '../components/DataBox';
import { BankInput, BankInputType } from '../components/BankInput';
import { AccountInput } from '../components/AccountInput';
import { IAccount, IAccountData, useUser } from '../providers/UserProvider';
import { MoneyInput } from '../components/MoneyInput';
import { Send } from '../libs/sender';
import { ReceiptsPage } from './receipts';

export function TransferPage ()
{
    const {account, userData, updateExtract} = useUser();
    const [destAcc, setDestAcc] = useState<IAccount>();
    const [quanty, setQuanty] = useState<number>();
    const [pass, setPass] = useState<string>('');
    const [transactionResult, setTransactionResult] = useState();

    function AccountHandler (target : IAccount)
    {
        setDestAcc(target);
        //console.log(target);
    }

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

        const resp = await Send('transference', {origin, password:pass, destAcc, quanty:quanty});

        if(resp.messages.length > 0)
        {
            return;
        }

        console.log('resp.data');
        console.log(resp.data);
        updateExtract(account as IAccountData);
        setTransactionResult(resp.data);
    }

    return (
        <Private>
            <div>
                <Navigator></Navigator>
                <main className='flex w-full h-full flex-col justify-center px-6'>
                {
                    transactionResult 
                    ? <ReceiptsPage transaction={transactionResult}/> 
                    : <DataBox className='mb-0 boxpaint' label={DataBoxLabels.TRANSFERÊNCIA}>
                        <ul className='flex flex-grow flex-col'>
                            <li className='flex flex-grow flex-col flex-shrink'>
                                <h3>Origem</h3>
                                <AccountInput readonly value={account}/>
                            </li>
                            <li className='flex flex-grow flex-col w-full'>
                                <h3>Destino</h3>
                                <AccountInput onAccount={AccountHandler} value={destAcc}/>
                            </li>
                            <li className='flex flex-grow flex-col w-full mt-2'>
                                <MoneyInput className='flex-grow' onInput={QuantyHandler} value={quanty} />
                            </li>
                            <li className='flex flex-grow flex-col w-full mt-2'>
                                <BankInput type={BankInputType.Password} className='flex-grow' placeholder='Senha' value={pass} onInput={PassHandler}/>
                            </li>
                            <li className='flex flex-grow flex-col w-full mt-2'>
                                <button className='btn-primary-base' onClick={TransactionHandler}>Transferir</button>
                            </li>
                        </ul>
                    </DataBox>
                }
                </main>
            </div>
        </Private>
    );
}