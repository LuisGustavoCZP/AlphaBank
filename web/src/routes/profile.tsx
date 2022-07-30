/* eslint-disable react/react-in-jsx-scope */
import { Navigate } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { ProfilePage } from '../pages/profile';

export function ProfileRoute ()
{
    return (
        <Route
            path="/user"
            element={<ProfilePage />}
        />
    );
}
