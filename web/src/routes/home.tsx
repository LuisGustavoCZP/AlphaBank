/* eslint-disable react/react-in-jsx-scope */
import { Route, Navigate } from 'react-router-dom';
/* import { ProfilePage } from '../pages/ProfilePage'; */

export function HomeRoute ()
{
    return (
        <Route path='/' element={<Navigate to="/user"/>} />
    );
}
