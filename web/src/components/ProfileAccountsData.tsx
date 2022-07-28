/* eslint-disable react/react-in-jsx-scope */

interface PropTypes{
    branch: string;
    account: string;
}

export function ProfileAccountsData (props: PropTypes)
{
    return (
        <div className="bg-[#F3F9F9] p-1 rounded text-[#727272] text-sm">
            <p>Agência: {props.branch}</p>
            <p>Conta: {props.account}</p>
        </div>
    );
}