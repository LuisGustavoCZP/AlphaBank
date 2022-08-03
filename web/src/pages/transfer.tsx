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

export function TransferPage ()
{
    const {account, userData, updateExtract} = useUser();
    const [destAcc, setDestAcc] = useState<IAccount>();
    const [quanty, setQuanty] = useState<number>();
    const [pass, setPass] = useState<string>('');
    const [transactionData, setTransactionData] = useState<any>();
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

    async function ConfirmHandler ()
    {
        const resp = await Send('transference', transactionData);

        if(resp.messages.length > 0)
        {
            return;
        }

        console.log('resp.data');
        console.log(resp.data);
        await updateExtract(account as IAccountData);
        setTransactionResult(resp.data);
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
        setTransactionData({origin, password:pass, destAcc, quanty:quanty})
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
                    : <DataBox className='mb-0 boxpaint' label={DataBoxLabels.TRANSFERÊNCIA}>
                        <ul className='flex flex-grow flex-col w-full'>
                            <li className='flex flex-grow flex-col flex-shrink'>
                                <h3>Origem</h3>
                                <AccountInput name='origin' readonly value={account}/>
                            </li>
                            <li className='flex flex-grow flex-col mt-2'>
                                <h3>Destino</h3>
                                <AccountInput name='destination' onAccount={AccountHandler} value={destAcc}/>
                            </li>
                            <li className='flex flex-grow flex-col mt-2'>
                                <MoneyInput className='flex-grow' onInput={QuantyHandler} value={quanty} />
                            </li>
                            <li className='flex flex-grow flex-col mt-2'>
                                <BankInput type={BankInputType.Password} className='flex-grow' placeholder='Senha' value={pass} onInput={PassHandler}/>
                            </li>
                            <li className='flex flex-grow flex-col mt-2'>
                                <Button className='w-full' onClick={TransactionHandler} label='Transferir' />
                            </li>
                        </ul>
                    </DataBox>
                }
                </main>
            </div>
        </Private>
    );
}