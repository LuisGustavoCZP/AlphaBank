/* eslint-disable react/react-in-jsx-scope */

interface PropTypes{
    transaction: any;
}

export function ReceiptData (props: PropTypes)
{
    const line = (props.transaction.value >= 0 ? '+' : '') + (props.transaction.value).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL', minimumFractionDigits: 2});

    return (
        <div className="bg-[#F3F9F9] p-1 rounded text-[#727272] text-sm">
            <p>Tipo: {props.transaction.type}</p>
            <p>Data: 03/07/2022 18:25</p>
            <div className="flex justify-between">
                <span>Valor:</span>
                <span className={props.transaction.value >= 0 ? 'text-green-400' : 'text-red-400'}>
                    {line}
                </span>
            </div>
        </div>
    );
}