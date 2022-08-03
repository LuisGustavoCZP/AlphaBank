/* eslint-disable react/react-in-jsx-scope */
import { Navigator } from '../components/Navigator';
import { Private } from '../routes';
import "../styles/transactions.css";
import { useState } from 'react';
import { DataBox, DataBoxLabels } from '../components/DataBox';
import { BankInput, BankInputType } from '../components/BankInput';
import { AccountInput } from '../components/AccountInput';
import { IAccount, IAccountData, IExtract, useUser } from '../providers/UserProvider';
import { MoneyInput } from '../components/MoneyInput';
import { Send } from '../libs/sender';
import { ReceiptsPage } from './receipts';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { Button } from '../components/Button';

export function DepositPage ()
{
    const {account, updateExtract, userData} = useUser();
    const [quanty, setQuanty] = useState<number>();
    const [transactionData, setTransactionData] = useState<any>();
    const [transactionResult, setTransactionResult] = useState<IExtract>();

    function QuantyHandler (target : number)
    {
        setQuanty(target);
    }

    async function ConfirmHandler ()
    {
        const resp = await Send('deposit', transactionData);
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

    async function DepositHandler ()
    {
        const destination = {
            agency:account?.agency,
            agency_identifier:account?.agency_identifier,
            account:account?.account,
            account_identifier:account?.account_identifier,
            cpf:userData?.user.cpf
        }
        setTransactionData({
            destination: destination, 
            quanty:quanty
        });
    }

    return (
        <Private>
            <div>
                <Navigator></Navigator>
                <main className='flex w-full h-full flex-col justify-center px-6'>
                {transactionData ? <ConfirmationModal title='Confirmar deposito' handleConfirmModal={ConfirmHandler} setModal={UnConfirmHandler}/> : <></>}
                {
                    transactionResult 
                    ? <ReceiptsPage transaction={transactionResult}/> 
                    : <DataBox className='mb-0' label={DataBoxLabels.DEPOSITO}>
                            <ul className='flex flex-grow flex-col'>
                                <li className='flex flex-grow flex-col flex-shrink'>
                                    <h3>Origem</h3>
                                    <AccountInput name='origin' readonly value={account}/>
                                </li>
                                <li className='flex flex-grow flex-col w-full mt-2'>
                                    <MoneyInput className='flex-grow' onInput={QuantyHandler} value={quanty} />
                                </li>
                                <li className='flex flex-grow flex-col w-full mt-2'>
                                    <BankInput type={BankInputType.Password} className='flex-grow' placeholder='Senha'></BankInput>
                                </li>
                                <li className='flex flex-grow flex-col w-full mt-2'>
                                    <Button onClick={DepositHandler} label='Depositar' />
                                </li>
                            </ul>
                      </DataBox>
                }
                </main>
            </div>
        </Private>
    );
}