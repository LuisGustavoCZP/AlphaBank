/* eslint-disable react/react-in-jsx-scope */
import { Route } from 'react-router-dom';
import { Public, Private } from '.';
import { Navigator } from '../components/Navigator';
import { WithdrawPage } from '../pages/';

export function WithdrawRoute ()
{
    return (
        <Route path="/withdraw" element=
        {  
            <WithdrawPage />
        } />
    );
}