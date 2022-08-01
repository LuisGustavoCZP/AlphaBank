/* eslint-disable react/react-in-jsx-scope */

import { useEffect, useState } from "react";
import { DataBox, DataBoxLabels } from "../components/DataBox";
import { ProfileAccountsData } from "../components/ProfileAccountsData";
import { ProfileUserData } from "../components/ProfileUserData";

export function ReceiptsPage ()
{
    const [transactionData, setTransactionData] = useState<JSX.Element[]>([]);

    // useEffect(() =>
    // {
        
    // }, []);

    //TODO

    return (
        <div className="px-6 flex-col flex-nowrap gap-8 h-screen">
            <DataBox label={DataBoxLabels.COMPROVANTE_DE_TRANSAÇAO}>
                {transactionData}
            </DataBox>
        </div>
    );
}