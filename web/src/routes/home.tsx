/* eslint-disable react/react-in-jsx-scope */
import { Route, Navigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { DataBox, DataBoxLabels } from '../components/DataBox';
import { ProfileData } from '../components/ProfileData';
import { ProfilePage } from '../components/ProfilePage';

export function HomeRoute ()
{
    return (
        <Route
            path="/"
            element={
                <ProfilePage ></ProfilePage>                
            }
        />
    );
}
