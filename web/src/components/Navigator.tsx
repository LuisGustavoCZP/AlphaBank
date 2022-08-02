/* eslint-disable react/react-in-jsx-scope */
import { Navigate, Link } from 'react-router-dom';
import { Bank, ArrowsLeftRight, UploadSimple, DownloadSimple, UserCircle, CaretDown, CaretUp, Eye, EyeClosed } from "phosphor-react";
import { NavigatorItem } from './NavigatorItem';
import '../styles/navigation.css';
import { useState } from 'react';
import { useUser } from '../providers/UserProvider';
import currency from '../libs/currency';
import { AccountText } from './AccountText';
/* import { useState } from 'react'; */

const regexBalance = new RegExp("[\\d]", "gi");

export function Navigator (props : any)
{
    const { userData, showBalance, showingBalance, account, selectAccount, extract } = useUser();
    /* const [acc, setAcc] = useState(user?.accounts[0]); */
    const [opened, setOpened] = useState(false);

    let balance = currency.format(extract?extract.account.balance : 0).replace('R$', '').trim();
    if(!showingBalance && false != showingBalance) balance = balance.replace(regexBalance, "*");

    return (
        <header className='nav-header rounded-b-3xl mb-10'>
            <span className='flex justify-between mt-9 mb-2 text-white w-10/12 text-xl'><h4>Bem vindo, {userData?.user.name}</h4><Link to={'/user'}><UserCircle size={28} /></Link></span>
            <nav>
                <ul className='flex flex-row w-full'>
                    <NavigatorItem title='Extract' to='/extract'><Bank size={36} /></NavigatorItem>
                    <NavigatorItem title='Transferir' to='/transfer'><ArrowsLeftRight size={36} /></NavigatorItem>
                    <NavigatorItem title='Depositar' to='/deposit'><UploadSimple size={36} /></NavigatorItem>
                    <NavigatorItem title='Sacar' to='/withdraw'><DownloadSimple size={36} /></NavigatorItem>
                </ul>
            </nav>
            <div className='flex relative h-10 w-full justify-center'>
                <section className='absolute p-1 w-10/12 bg-slate-300 rounded-lg'>
                    <h3 className='flex flex-row justify-between text-base' onClick={()=>{setOpened(!opened);}}>
                        <AccountText className='header-gold' account={account} />
                        {
                            opened?
                                <CaretUp size={24} />
                            :(
                                <CaretDown size={24} />
                            )
                        }
                    </h3>
                    {
                        opened?
                            <ul>
                                {
                                    userData?.accounts.map((acc, index) => 
                                    {
                                        return (
                                            <li key={index}>
                                                <button className='flex flex-row w-full justify-between text-base btn' onClick={() => {if(selectAccount) selectAccount(acc); setOpened(false);}}>
                                                    <AccountText account={acc} />
                                                </button>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        :
                            <h4 className='flex flex-row items-center mx-4 my-2 h-9'>
                                {
                                    showingBalance?
                                        <Eye size={24} onClick={()=>{if (showBalance) showBalance(false);}} />
                                    :
                                        <EyeClosed size={24} onClick={()=>{if (showBalance) showBalance(true);}} />
                                }
                                <p className='flex flex-row mx-2 items-end'>
                                    <span className={`flex text-3xl balance-main relative justify-center items-center${!showingBalance?' select-none' : ''}`}>{balance}{!showingBalance?<span className='flex flex-grow absolute h-full w-full backdrop-blur-[6px] rounded-2xl overflow-hidden'></span>:<></>}</span>
                                    <span className='flex text-lg h-full justify-end balance-side select-none'>R$</span>
                                </p>
                            </h4>
                    }
                </section>
            </div>
        </header>
    );
}
