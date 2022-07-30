/* eslint-disable react/react-in-jsx-scope */
import { ReactElement } from 'react';
import { Route, Routes, RouterProps, Navigate } from 'react-router-dom';
/* import { UserRoute } from './user'; */
import { LoginRoute } from './login';
import { RegisterRoute } from './register';
import { TransferRoute } from './transfer';
import { DepositRoute } from './deposit';
import { WithdrawRoute } from './withdraw';
import { ExtractRoute } from './extract';
import { HomeRoute } from './home';
import { ProfileRoute } from './profile';

interface ChildrenTypes {
    children: ReactElement;
  }
  
export function Private ({ children }: ChildrenTypes) {
    const user = true;//useUser();

    if (!user) {
        return <Navigate to="/home" />;
    }

    return children;
}

export function Public ({ children }: ChildrenTypes) {
    const user = true;//useUser();

    if (user) {
        return <Navigate to="/deposit" />;
    }

    return children;
}

export function Router () 
{ 
    return (
        <Routes>
            {<Route path='/' element={<Navigate to="/extract"/>} />}
            { HomeRoute() }
            { LoginRoute() }
            { RegisterRoute() }
            { ProfileRoute() }
            { ExtractRoute() }
            { TransferRoute() }
            { DepositRoute() }
            { WithdrawRoute() }
            <Route path="*" element={<h1 className="text-white">Error <span className='btn cancel'>404</span></h1>} />
        </Routes>
    );
}