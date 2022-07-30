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
        <div className="bg-[#F3F9F9] p-1 rounded text-[#727272] text-sm">
            <p>{props.createdAt}</p>
            {props.transactions.map(mapTransactions)}
        </div>
    );
}

function mapTransactions(transaction: TransactionsTypes)
{
    const line = (transaction.value >= 0 ? '+' : '') + (transaction.value).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL', minimumFractionDigits: 2});

    return (
        <div className="flex justify-between px-2 font-medium text-sm text-[#A8A8A8]" key={transaction.id}>
            <span>{getProperMessage(transaction.type, transaction.value)}</span>
            <span className={transaction.value >= 0 ? 'text-green-400' : 'text-red-400'}>
                {line}
            </span>
        </div>
    );
}