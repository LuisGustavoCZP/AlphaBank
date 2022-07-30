/* eslint-disable react/react-in-jsx-scope */
import { Route } from 'react-router-dom';
import { Public, Private } from '.';
import { Navigator } from '../components/navigator';
import { WithdrawPage } from '../pages/';

export function WithdrawRoute ()
{
    return (
        <Route path="/withdraw" element=
        {  
            <Private>
                <><Navigator /><WithdrawPage /></>
            </Private>
        } />
    );
}