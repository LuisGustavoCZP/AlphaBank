/* eslint-disable react/react-in-jsx-scope */
export function AccountText (props : {account : any, className? : string})
{
    const {account, className} = props;
    return (
    <strong className='flex flex-row justify-between text-[14px]'>
        <span className={`mx-4 ${className?className:''}`}>Agência: {`${account?.agency}-${account?.agency_identifier}`}</span>
        <span className={`mx-4 ${className?className:''}`}>Conta: {`${account?.account}-${account?.account_identifier}`}</span>
    </strong>
    );
}