/* eslint-disable react/react-in-jsx-scope */

import { ArrowsLeftRight, Bank, DownloadSimple, IdentificationCard, Receipt, UploadSimple, Vault } from "phosphor-react";

export enum DataBoxLabels{
    MEUS_DADOS = 'Meus Dados',
    MINHAS_CONTAS_CORRENTES = 'Minhas contas correntes',
    EXTRATO_DE_TRANSAÇOES = 'Extrato de transações',
    TRANSFERÊNCIA = 'Transferência',
    DEPOSITO = 'Depósito',
    SAQUE = 'Saque',
    COMPROVANTE_DE_TRANSAÇAO = 'Comprovante de transação'
}

interface PropTypes{
    label: DataBoxLabels;
    className?: string;
    children: React.ReactNode;
    icon? : JSX.Element
}

function chooseIcon(label: DataBoxLabels){
    switch(label){
        case DataBoxLabels.MEUS_DADOS: return <IdentificationCard size={32} />;
        case DataBoxLabels.MINHAS_CONTAS_CORRENTES: return <Vault size={32} />;
        case DataBoxLabels.EXTRATO_DE_TRANSAÇOES: return <Bank size={32} />;
        case DataBoxLabels.TRANSFERÊNCIA: return <ArrowsLeftRight size={32} />;
        case DataBoxLabels.DEPOSITO: return <UploadSimple size={32} />;
        case DataBoxLabels.SAQUE: return <DownloadSimple size={32} />;
        case DataBoxLabels.COMPROVANTE_DE_TRANSAÇAO: return <Receipt size={32} />;
    }
}

export function DataBox (props: PropTypes){
    return (
        <div className={`flex flex-col max-h-full h-fit w-full justify-center items-center px-3 py-4 text-left boxpaint rounded-lg text-[#C98E26] text-base font-medium ${props.className?` ${props.className}`:''}`}>
            <span className="flex mb-4 w-full justify-between items-center">
                <span className="flex w-full justify-start items-center">
                    {chooseIcon(props.label)}
                    <p className="mx-3">{props.label}</p>
                </span>
                {props.icon?props.icon:<></>}
            </span>
            {props.children}
        </div>
    );
}