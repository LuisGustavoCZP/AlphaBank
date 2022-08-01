/* eslint-disable react/react-in-jsx-scope */
import { Navigator } from '../components/Navigator';
import { Private } from '../routes';
import "../styles/transactions.css";

export function WithdrawPage ()
{
    return (
        <Private>
            <div>
                <Navigator></Navigator>
                <main>
                    <h1>Sacar</h1>
                    
                </main>
            </div>
        </Private>
    );
}