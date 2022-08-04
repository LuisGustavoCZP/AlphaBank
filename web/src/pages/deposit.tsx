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
import { ArrowLeft } from 'phosphor-react';

export function DepositPage ()
{
    const {account, updateExtract, userData} = useUser();
    const [quanty, setQuanty] = useState<number>();
    const [transactionData, setTransactionData] = useState<any>();
    const [transactionResult, setTransactionResult] = useState<IExtract>();
    const [errors, setErros] = useState<any>({});

    function QuantyHandler (target : number)
    {
        setQuanty(target);
    }

    async function ConfirmHandler ()
    {
        const resp = await Send('deposit', transactionData);
        if(resp.messages.length > 0)
        {
            const obj = {} as any;
            resp.messages.forEach((msg : string) => 
            {
                const t = msg.split(":");
                if(t[1].includes(':'))
                {
                    const tobj = {} as any;
                    const tt = t[1].split(":");
                    tobj[tt[0]] == tt[1];
                    obj[t[0]] = tobj;
                }
                else obj[t[0]] = t[1];
            });
            setErros(obj);
            UnConfirmHandler();
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
                <main className='flex w-full h-full flex-col justify-center px-6 py-4 overflow-hidden'>
                {
                    transactionData ? <ConfirmationModal title='Confirmar Depósito' handleConfirmModal={ConfirmHandler} setModal={UnConfirmHandler}/> : <></> 
                }
                {
                    transactionResult 
                    ?   <>
                            <ArrowLeft className="left-6 top-6" size={32} color='white' onClick={() => setTransactionResult(undefined)} />
                            <ReceiptsPage transaction={transactionResult}/>
                        </>
                    :   <DataBox label={DataBoxLabels.DEPOSITO}>
                            <ul className='flex flex-grow flex-col w-full'>
                                <li className='flex flex-grow flex-col flex-shrink'>
                                    <h3 className='text-white'>Destino</h3>
                                    <AccountInput errors={errors.destination} name='destination' readonly value={account}/>
                                </li>
                                <li className='flex flex-grow flex-col w-full mt-7'>
                                    <MoneyInput isError={errors.value && errors.value != ''} label={errors.value?errors.value:''} className='flex-grow' onInput={QuantyHandler} value={quanty} />
                                </li>
                                {/* <li className='flex flex-grow flex-col w-full mt-3'>
                                    <BankInput isError={errors.password && errors.password != ''} label={errors.password?errors.password:''} type={BankInputType.Password} className='flex-grow' placeholder='Senha'></BankInput>
                                </li> */}
                                <li className='flex flex-grow flex-col w-full mt-4'>
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