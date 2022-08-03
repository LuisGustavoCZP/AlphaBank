/* eslint-disable react/react-in-jsx-scope */

interface PropTypes{
    branch: string;
    account: string;
}

export function ProfileAccountsData (props: PropTypes)
{
    return (
        <div className="bg-[#F3F9F9] dark:bg-transparent dark:ring-[#424245] dark:ring-[1px] p-1 w-full mt-4 rounded text-[#727272] text-sm">
            <p>Agência: {props.branch}</p>
            <p>Conta: {props.account}</p>
        </div>
    );
}