/* eslint-disable react/react-in-jsx-scope */
import { Navigator } from '../components/Navigator';
import { Private } from '../routes';

export function ExtractPage ()
{
    return (
        <Private>
            <div>
                <Navigator></Navigator>
                <main>
                    <h1>Extrato</h1>
                    
                </main>
            </div>
        </Private> 
    );
}