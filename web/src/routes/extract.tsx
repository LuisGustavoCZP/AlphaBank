/* eslint-disable react/react-in-jsx-scope */
import { Route } from 'react-router-dom';
import { ExtractPage } from '../pages/extract';

export function ExtractRoute ()
{
    return (
        <Route
            path="/user/extract"
            element={<ExtractPage />}
        />
    );
}