/* eslint-disable react/react-in-jsx-scope */
import { Browser } from 'phosphor-react';
import { ReactNode, createContext, useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Send, urlAPI } from '../libs/sender';

interface ContextTypes 
{
  userData?: IUserData;
  loading?: boolean;
  login: (login: string, password: string) => void
  showBalance: (show : boolean) => void
  showingBalance? : boolean
  account? : IAccountData
  selectAccount : (account : IAccountData) => void
  extract? : IExtract
  updateExtract : (account : IAccountData) => Promise<any>
  logout : () => Promise<any>
}

export interface ITransaction
{
  id : string
  origin : string
  type : string
  value : number
  created_at: string
}

export interface IExtract 
{
  user : IUser
  account : IAccountData
  transactions : ITransaction[]
}

export interface IUser
{
  name: string;
  email: string;
  cpf: string;
  birthdate: string;
}

export interface IAccount 
{
  agency: string
  agency_identifier: string
  account: string
  account_identifier : string
  
}

export interface IAccountData extends IAccount
{
  balance: number
  created_at : string
}

export interface IUserData
{
  user: IUser
  accounts: IAccountData[]
}

export const UserContext = createContext<ContextTypes>(
{
  login: (login: string, password: string) => {console.log(login, password)},
  showBalance: (show : boolean) => {console.log(show)},
  selectAccount: (account : IAccountData) => {console.log(account)},
  updateExtract : async (account : IAccountData) => {console.log(account)},
  logout : async () => {console.log('')}
});

interface UserProviderTypes 
{
  children: ReactNode;
}

async function UserCookie (callback : any)
{
  try {        
    const response = await fetch(`${urlAPI}/user/`, 
    {
        method: 'POST', 
        headers: 
        {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({})
    });

    const responseJson = await response.json();
    //console.log(responseJson);
    const user = responseJson.data;
    callback(user);
  } catch (error) {
      //console.log(error);
      callback((null as unknown) as IUserData);        
  }
}

async function UserLogin (cpf: string, password: string) : Promise<IUserData>
{
  try {        
    const response = await fetch(`${urlAPI}/user/login`, 
    {
        method: 'POST', 
        headers: 
        {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({cpf, password})
    });

    const responseJson = await response.json();
    console.log(responseJson);
    return responseJson.data;  
  } catch (error) {
      console.log(error);
      return (null as unknown) as IUserData;        
  }
}

export const UserProvider = ({ children }: UserProviderTypes) => 
{
  const [userData, setUserData] = useState<IUserData>(); 
  const [showingBalance, setShowingBalance] = useState(false);
  const [loading, setLoading] = useState(false);
  /* let account : IAccountData = null as any; */
  const [account, setAccount] = useState<IAccountData>();
  const [extract, setExtract] = useState<IExtract>();

  /* let extract: IExtract = null as any; */
  /* const [] = useParams(); */

  async function userApply (user : IUserData | undefined)
  {
    if(user && user.user) 
    {
      if(user.accounts.length > 0) 
      {
        selectAccount(user.accounts[0]);
      }
    }
    setUserData(user);
  }

  const login = async (
    login: string,
    password: string,
  ) => 
  {
    setLoading(true);
    const user = await UserLogin(login, password);
    userApply(user);
    setLoading(false);
  }

  const logout = async () =>
  {
    console.log("Fez o logout");
    const resp = await Send("user/logout", {});
    window.location.reload();
  }

  const showBalance = (show = !showingBalance) =>
  {
    setShowingBalance(show);
  }

  const updateExtract = async (_account = account) =>
  {
    //console.log("ATualizando extrato");
    if(!_account) return {data:{}, messages:[]};
    const acc = {
      account: 
      {
        agency: _account.agency,
        agency_identifier: _account.agency_identifier,
        account: _account.account,
        account_identifier: _account.account_identifier,
        cpf: userData?.user.cpf
      }
    };
    //console.log(acc);
    const resp = await Send("extract", acc);
    /* const p = ; */
    //console.log("extrato", resp);
    setExtract(resp.data);
  }

  const selectAccount = async (_account : IAccountData) =>
  {
    setAccount(_account);
    //account = _account;
    await updateExtract(_account);
  }

  useEffect(()=>
  {
    setLoading(true);
    if(!userData) UserCookie((user : IUserData) => {userApply(user); setLoading(false);});
  }, [])

  return (
    <UserContext.Provider
      value={{
        userData,
        loading,
        login,
        showBalance,
        showingBalance,
        account,
        selectAccount,
        extract,
        updateExtract,
        logout
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);