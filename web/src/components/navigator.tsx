/* eslint-disable react/react-in-jsx-scope */
import { Navigate, Link } from 'react-router-dom';
import { Bank, ArrowsLeftRight, UploadSimple, DownloadSimple, UserCircle } from "phosphor-react";
import '../styles/navigation.css';
/* import { useState } from 'react'; */

export function Navigator ()
{
    return (
        <header className='nav-header rounded-b-3xl'>
            <span className='flex justify-between mt-9 mb-2 text-white w-10/12 text-xl'><h4>Bem vindo, Usuario</h4><UserCircle size={28} /></span>
            <nav>
                <ul className='flex flex-row w-full'>
                    <li className='nav-item'>
                        <Link className="nav-btn" to="/user/extract">
                            <Bank size={36} />
                        </Link>
                        <span>Extract</span>
                    </li>
                    <li className='nav-item'>
                        <Link className="nav-btn" to="/user/transfer">
                            <ArrowsLeftRight size={36} />
                        </Link>
                        <span>Transferir</span>
                    </li>
                    <li className='nav-item'>
                        <Link className="nav-btn" to="/user/deposit">
                            <UploadSimple size={36} />
                        </Link>
                        <span>Depositar</span>
                    </li>
                    <li className='nav-item'>
                        <Link className="nav-btn" to="/user/withdraw">
                            <DownloadSimple size={36} />
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
