/* eslint-disable react/react-in-jsx-scope */
import { Route } from 'react-router-dom';
import { UserPage } from '../pages/user';

export function UserRoute ()
{
    return (
        <Route
            path="/user"
            element={<UserPage />}
        />
    );
}
