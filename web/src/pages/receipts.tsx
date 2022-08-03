/* eslint-disable react/react-in-jsx-scope */

import { ArrowLeft } from "phosphor-react";
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
        <DataBox label={DataBoxLabels.COMPROVANTE_DE_TRANSAÇAO}>
            <ArrowLeft className="absolute left-6 top-6" size={32} color='white' />
            <ReceiptData  transaction={props.transaction}/>
        </DataBox>
    );
}
{/* <div className="px-6 flex-col flex-nowrap gap-8 h-screen">
            
        </div> */}