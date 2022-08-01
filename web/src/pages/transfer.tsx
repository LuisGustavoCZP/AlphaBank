/* eslint-disable react/react-in-jsx-scope */
import { DataBox, DataBoxLabels } from '../components/DataBox';
import { Navigator } from '../components/Navigator';
import { BankInput, BankInputType } from '../components/BankInput';
import { Private } from '../routes';
import "../styles/transactions.css";
import { useUser } from '../providers/UserProvider';

export function TransferPage ()
{
    const {account} = useUser();
    const agTxt = `${account?.agency}-${account?.agency_identifier}`;
    const acTxt = `${account?.account}-${account?.account_identifier}`;

    return (
        <Private>
            <main>
                <Navigator></Navigator>
                <DataBox label={DataBoxLabels.TRANSFERÊNCIA}>
                    <ul>
                        <li>
                            <h3>Origem</h3>
                            <BankInput label='Agência' type={BankInputType.Agency} readonly value={agTxt} />
                            <BankInput label='Conta' type={BankInputType.Account} readonly value={acTxt}/>
                        </li>
                    </ul>
                </DataBox>
            </main>
        </Private>
    );
}