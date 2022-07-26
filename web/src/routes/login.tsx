/* eslint-disable react/react-in-jsx-scope */
import { Route, Navigate } from 'react-router-dom';

export function LoginRoute ()
{
    return (
        <Route
            path="/login"
            element={
                <h1>Login</h1>
            }
        />
    );
}
