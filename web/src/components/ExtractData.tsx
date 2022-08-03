/* eslint-disable react/react-in-jsx-scope */

interface PropTypes{
    createdAt: string;
    transactions: TransactionsTypes[];
}

interface TransactionsTypes{
    id: string;
    type: 'fee' | 'withdraw' | 'transference' | 'deposit';
    value: number;
}

function getProperMessage(type: 'fee' | 'withdraw' | 'transference' | 'deposit', value: number)
{
    switch (type) {
        case 'fee':
            return 'Taxa';
        case 'withdraw':
            return 'Saque';
        case 'transference':
            return value >= 0 ? 'Transferência recebida' : 'Transferência enviada';
        case 'deposit':
            return 'Depósito';
    }
}

export function ExtractData (props: PropTypes)
{ 
    return (
        <ul className="p-1 rounded text-[#727272] text-sm">
            <p>{props.createdAt}</p>
            {props.transactions.map(mapTransactions)}
        </ul>
    );
}

function mapTransactions(transaction: TransactionsTypes)
{
    const line = (transaction.value >= 0 ? '+' : '') + (transaction.value).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL', minimumFractionDigits: 2});

    return (
        <li className="flex justify-between px-2 font-medium text-sm text-[#A8A8A8]" key={transaction.id}>
            <span>{getProperMessage(transaction.type, transaction.value)}</span>
            <span className={transaction.value >= 0 ? 'text-green-400' : 'text-red-400'}>
                {line}
            </span>
        </li>
    );
}