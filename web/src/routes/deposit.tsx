/* eslint-disable react/react-in-jsx-scope */
import { Route } from 'react-router-dom';
import { Public, Private } from '.';
import { Navigator } from '../components/navigator';
import { DepositPage } from '../pages/';

export function DepositRoute ()
{
    return (
        <Route path="/deposit" element=
        {  
            <Private>
                <><Navigator /><DepositPage /></>
            </Private>
        } />
    );
}