/* eslint-disable react/react-in-jsx-scope */

import { useEffect, useState } from "react";
import { DataBox, DataBoxLabels } from "../components/DataBox";
import { ProfileAccountsData } from "../components/ProfileAccountsData";
import { ProfileUserData } from "../components/ProfileUserData";
import { ReceiptData } from "../components/ReceiptData";
import { IExtract } from "../providers/UserProvider";

interface PropTypes{
    transaction: IExtract;
}

export function ReceiptsPage (props: PropTypes)
{
    return (
        <div className="px-6 flex-col flex-nowrap gap-8 h-screen">
            <DataBox label={DataBoxLabels.COMPROVANTE_DE_TRANSAÇAO}>
                <ReceiptData  transaction={props.transaction}/>
            </DataBox>
        </div>
    );
}