/* eslint-disable react/react-in-jsx-scope */
import currency from '../libs/currency';

interface PropTypes{
    transaction: any;
}

export function ReceiptData (props: PropTypes)
{
    const line = (props.transaction.value >= 0 ? '+' : '') + currency.format(props.transaction.value);

    return (
        <div className="flex flex-col w-full justify-evenly bg-[#F3F9F9] p-1 rounded text-[#727272] text-sm">
            <p>Tipo: {prepareType(props.transaction.type)}</p>
            <p className="text-[#A2A2A2] my-4">Data: {prepareDate(props.transaction.date)}</p>
            {
                props.transaction.destination 
                ? 
                <div className="flex-col my-4 justify-evenly bg-[#F3F9F9] p-1 rounded text-[#727272] text-sm">
                    <p>Dados de destino:</p>
                    <p className="text-[#A2A2A2]">Agência: {props.transaction.destination.agency}-{props.transaction.destination.agency_identifier}</p>
                    <p className="text-[#A2A2A2]">Conta: {props.transaction.destination.account}-{props.transaction.destination.account_identifier}</p>
                </div>
                :
                ''
            }
                <div className="flex justify-between">
                    <span>Valor</span>
                    <span className={props.transaction.value >= 0 ? 'text-green-400' : 'text-red-400'}>
                        {line}
                    </span>
                </div>
            
        </div>
    );
}

function prepareType(type: string)
{
    switch (type) {
        case 'deposit': return 'Depósito';
        case 'withdraw': return 'Saque';
        case 'transference': return 'Transferência - Enviada';
        default:
            break;
    }
}

function prepareDate(dateString: string)
{
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toLocaleString('pt-BR', {minimumIntegerDigits: 2, useGrouping:false});
    const day = date.getDate().toLocaleString('pt-BR', {minimumIntegerDigits: 2, useGrouping:false});

    const hours = date.getHours().toLocaleString('pt-BR', {minimumIntegerDigits: 2, useGrouping:false});
    const minutes = date.getMinutes().toLocaleString('pt-BR', {minimumIntegerDigits: 2, useGrouping:false});

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}