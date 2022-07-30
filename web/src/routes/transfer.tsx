/* eslint-disable react/react-in-jsx-scope */
import { Route } from 'react-router-dom';
import { Private } from '.';
import { Navigator } from '../components/Navigator';
import { TransferPage } from '../pages/';

export function TransferRoute ()
{
    return (
        <Route path="/transfer" element=
        {  
            <Private>
                <><Navigator /><TransferPage /></>
            </Private>
        } />
    );
}