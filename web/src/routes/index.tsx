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
import { ProfileRoute } from './profile';
import { useUser } from '../providers/UserProvider';

interface ChildrenTypes {
    children: ReactElement;
  }
  
export function Private ({ children }: ChildrenTypes) {
    const {userData, loading} = useUser();
    //console.log(userData);

    if (userData == undefined) {
        return <Navigate to="/login" />;
    }

    return children;
}

export function Public ({ children }: ChildrenTypes) {
    const {userData, loading} = useUser();

    if (userData != undefined) {
        return <Navigate to="/extract" />;
    }

    return children;
}

export function Router () 
{
    return (
        <Routes>
            {<Route path='/' element={<Navigate to="/extract"/>} />}
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