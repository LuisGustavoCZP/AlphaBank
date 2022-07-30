/* eslint-disable react/react-in-jsx-scope */
import { Route } from 'react-router-dom';

import { DepositPage } from '../pages/';

export function DepositRoute ()
{
    return (
        <Route path="/deposit" element=
        {  
            <DepositPage />
        } />
    );
}