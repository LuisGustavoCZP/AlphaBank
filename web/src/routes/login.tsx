/* eslint-disable react/react-in-jsx-scope */
import { Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../pages/';

export function LoginRoute ()
{
    return (
        <Route path="/login"
            element={
                <LoginPage />
            }
        />
    );
}
