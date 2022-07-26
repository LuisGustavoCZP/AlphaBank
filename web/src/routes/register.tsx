/* eslint-disable react/react-in-jsx-scope */
import { Route, Navigate } from 'react-router-dom';

export function RegisterRoute ()
{
    return (
        <Route
            path="/register"
            element={
                <h1>Register</h1>
            }
        />
    );
}
