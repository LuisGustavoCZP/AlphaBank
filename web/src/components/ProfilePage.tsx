/* eslint-disable react/react-in-jsx-scope */

import { DataBox, DataBoxLabels } from "./DataBox";
import { ProfileAccountsData } from "./ProfileAccountsData";
import { ProfileData } from "./ProfileData";

export function ProfilePage ()
{
    const profileData = [<ProfileData key={1} name="Dhesem Pregads" birthday="01/01/2000" cpf="123.456.789-01"></ProfileData>];
    const profileAccountsData = [<ProfileAccountsData key={1} branch="1510-6" account="95785-3"></ProfileAccountsData>];

    return (
        <div className="bg-[#EAEDF0]">
            <DataBox label={DataBoxLabels.MEUS_DADOS} data={profileData}></DataBox>
            <DataBox label={DataBoxLabels.MINHAS_CONTAS_CORRENTES} data={profileAccountsData}></DataBox>
        </div>
    );
}