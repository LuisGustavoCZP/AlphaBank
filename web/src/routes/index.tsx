/* eslint-disable react/react-in-jsx-scope */
import { } from 'react';
import { Route, Routes, RouterProps } from 'react-router-dom';
import { UserRoute } from './user';
import { LoginRoute } from './login';
import { RegisterRoute } from './register';
import { ExtractRoute } from './extract';
import { HomeRoute } from './home';

export function Router () 
{ 
    return (
        <Routes>
            { HomeRoute()}
            { LoginRoute() }
            { RegisterRoute() }
            { UserRoute() }
            { ExtractRoute() }
            <Route path="*" element={<h1 className="text-white">Error <span className='btn cancel'>404</span></h1>} />
        </Routes>
    );
}