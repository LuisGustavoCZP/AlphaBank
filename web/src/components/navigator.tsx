/* eslint-disable react/react-in-jsx-scope */
import { Navigate, Link } from 'react-router-dom';
import { Bank, ArrowsLeftRight, UploadSimple, DownloadSimple } from "phosphor-react";
import '../styles/navigation.css';
/* import { useState } from 'react'; */

export function Navigator ()
{
    return (
        <header className='nav-header rounded-b-3xl'>
            <h4 className='mt-8 mb-3'>Bem vindo, Usuario</h4>
            <nav>
                <ul className='flex flex-row w-full'>
                    <li className='nav-item'>
                        <Link className="nav-btn" to="/user/extract">
                            <Bank className="text-white" size={32} />
                        </Link>
                        <span>Extract</span>
                    </li>
                    <li className='nav-item'>
                        <Link className="nav-btn" to="/user/transfer">
                            <ArrowsLeftRight className="text-white" size={32} />
                        </Link>
                        <span>Transferir</span>
                    </li>
                    <li className='nav-item'>
                        <Link className="nav-btn" to="/user/deposit">
                            <UploadSimple className="text-white" size={32} />
                        </Link>
                        <span>Depositar</span>
                    </li>
                    <li className='nav-item'>
                        <Link className="nav-btn" to="/user/withdraw">
                            <DownloadSimple className="text-white" size={32} />
                        </Link>
                        <span>Sacar</span>
                    </li>
                </ul>
            </nav>
            <div className='flex relative h-10 w-full justify-center'>
                <section className='absolute h-16 p-2 w-3/4 bg-slate-300 rounded-lg'></section>
            </div>
        </header>
    );
}
