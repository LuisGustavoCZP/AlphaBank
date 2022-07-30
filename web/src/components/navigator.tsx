/* eslint-disable react/react-in-jsx-scope */
import { Navigate, Link } from 'react-router-dom';
import { Bank, ArrowsLeftRight, UploadSimple, DownloadSimple, UserCircle, CaretDown, CaretUp, Eye, EyeClosed } from "phosphor-react";
import { NavigatorItem } from './NavigatorItem';
import '../styles/navigation.css';
import { useState } from 'react';
/* import { useState } from 'react'; */

export function Navigator (props : any)
{
    const [opened, setOpened] = useState(false);
    const [visible, setVisible] = useState(true);
    return (
        <header className='nav-header rounded-b-3xl mb-10'>
            <span className='flex justify-between mt-9 mb-2 text-white w-10/12 text-xl'><h4>Bem vindo, Usuario</h4><Link to={'/user'}><UserCircle size={28} /></Link></span>
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
                    <h3 className='flex flex-row justify-between text-base'><span>Agência: 1510-5</span><span>Conta: 95785-3</span>
                    {
                        opened?
                            <CaretUp size={24} onClick={()=>{setOpened(false);}} />
                        :(
                            <CaretDown size={24} onClick={()=>{setOpened(true);}} />
                        )
                    }
                    </h3>
                    {
                        opened? 
                            <button className='flex flex-row w-full justify-between text-base btn'><span>Agência: 1510-5</span><span>Conta: 95785-3</span></button>
                        :
                            <h4 className='flex flex-row items-center h-full'>
                                {
                                    visible?
                                        <Eye size={24} onClick={()=>{setVisible(false);}} />
                                    :(
                                        <EyeClosed size={24} onClick={()=>{setVisible(true);}} />
                                    )
                                }
                                <span className='text-3xl'>
                                    132.759,30
                                </span>
                                <span className='flex text-lg h-full items-end'>
                                    R$
                                </span>
                            </h4>
                    }
                </section>
            </div>
        </header>
    );
}
