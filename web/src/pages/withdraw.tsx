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
import { ConfirmationModal } from '../components/ConfirmationModal';
import { Button } from '../components/Button';

export function WithdrawPage ()
{
    const {account, userData, updateExtract} = useUser();
    const [quanty, setQuanty] = useState<number>();
    const [pass, setPass] = useState<string>('');
    const [transactionData, setTransactionData] = useState<any>();
    const [transactionResult, setTransactionResult] = useState();

    function QuantyHandler (target : number)
    {
        setQuanty(target);
        //console.log("my", target);
    }

    function PassHandler (target : HTMLInputElement)
    {
        setPass(target.value);
    }

    async function ConfirmHandler ()
    {
        const resp = await Send('withdraw', transactionData);
        if(resp.messages.length > 0)
        {
            return;
        }
        await updateExtract(account as IAccountData);
        setTransactionResult(resp.data);
        setTransactionData(null);
    }

    async function UnConfirmHandler ()
    {
        setTransactionData(null);
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
        setTransactionData({origin, password:pass, quanty:quanty})
    }

    return (
        <Private>
            <div>
                <Navigator></Navigator>
                <main className='flex w-full h-full flex-col justify-center px-6 py-4'>
                {transactionData ? <ConfirmationModal title='Confirmar deposito' handleConfirmModal={ConfirmHandler} setModal={UnConfirmHandler}/> : <></>}
                {
                    transactionResult 
                    ? <ReceiptsPage transaction={transactionResult}/> 
                    : <DataBox label={DataBoxLabels.SAQUE}>
                        <ul className='flex flex-grow flex-col w-full'>
                            <li className='flex flex-grow flex-col flex-shrink'>
                                <h3>Origem</h3>
                                <AccountInput name='origin' readonly value={account}/>
                            </li>
                            <li className='flex flex-grow flex-col w-full mt-2'>
                                <MoneyInput className='flex-grow' onInput={QuantyHandler} value={quanty} />
                            </li>
                            <li className='flex flex-grow flex-col w-full mt-2'>
                                <BankInput type={BankInputType.Password} className='flex-grow' placeholder='Senha' value={pass} onInput={PassHandler} />
                            </li>
                            <li className='flex flex-grow flex-col w-full mt-2'>
                                <Button onClick={TransactionHandler} label='Sacar' />
                            </li>
                        </ul>
                    </DataBox>
                }
                </main>
            </div>
        </Private>
    );
}