/* eslint-disable react/react-in-jsx-scope */
import { Navigator } from '../components/Navigator';
import { Private } from '../routes';

export function DepositPage ()
{
    return (
        <Private>
            <div>
                <Navigator></Navigator>
                <main>
                    <h1>Depositar</h1>
                    
                </main>
            </div>
        </Private>
    );
}