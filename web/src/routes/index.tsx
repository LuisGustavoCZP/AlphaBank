/* eslint-disable react/react-in-jsx-scope */
import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomeRoute } from './home';
import { LoginRoute } from './login';
import { RegisterRoute } from './register';


export function Router () 
{ 
    return (
        <Routes>
            { HomeRoute() }
            { LoginRoute() }
            { RegisterRoute() }
            <Route path="*" element={<h1 className="text-white">Error 404</h1>} />
        </Routes>
    );
}