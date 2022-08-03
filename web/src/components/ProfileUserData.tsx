/* eslint-disable react/react-in-jsx-scope */

interface PropTypes{
    name: string;
    birthday: string;
    cpf: string;
}

export function ProfileUserData (props: PropTypes)
{
    return (
        <div className="bg-[#F3F9F9] dark:bg-transparent p-1 w-full rounded text-[#727272] text-sm">
            <p>Nome: {props.name}</p>
            <p>Data de nascimento: {props.birthday}</p>
            <p>CPF: {props.cpf}</p>
        </div>
    );
}