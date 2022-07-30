/* eslint-disable react/react-in-jsx-scope */
import { Navigate, Link } from 'react-router-dom';
import { Bank, ArrowsLeftRight, UploadSimple, DownloadSimple, UserCircle } from "phosphor-react";
import { NavigatorItem } from './navigator-item';
import '../styles/navigation.css';
/* import { useState } from 'react'; */

export function Navigator (props : any)
{
    return (
        <header className='nav-header rounded-b-3xl'>
            <span className='flex justify-between mt-9 mb-2 text-white w-10/12 text-xl'><h4>Bem vindo, Usuario</h4><UserCircle size={28} /></span>
            <nav>
                <ul className='flex flex-row w-full'>
                    <NavigatorItem title='Extract' to='/extract'><Bank size={36} /></NavigatorItem>
                    <NavigatorItem title='Transferir' to='/transfer'><ArrowsLeftRight size={36} /></NavigatorItem>
                    <NavigatorItem title='Depositar' to='/deposit'><UploadSimple size={36} /></NavigatorItem>
                    <NavigatorItem title='Sacar' to='/withdraw'><DownloadSimple size={36} /></NavigatorItem>
                </ul>
            </nav>
            <div className='flex relative h-10 w-full justify-center'>
                <section className='absolute h-16 p-2 w-3/4 bg-slate-300 rounded-lg'></section>
            </div>
        </header>
    );
}
