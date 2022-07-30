/* eslint-disable react/react-in-jsx-scope */
import { Route } from 'react-router-dom';
import { RegisterPage } from '../pages/';

export function RegisterRoute ()
{
    return (
        <Route
            path="/register"
            element={
                <RegisterPage />
            }
        />
    );
}
