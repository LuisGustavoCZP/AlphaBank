/* eslint-disable react/react-in-jsx-scope */
import { ReactNode, createContext, useState, useContext, useEffect } from 'react';

interface ContextTypes 
{
  userData: IUserData;
  loading: boolean;
  login: (login: string, password: string) => void
  showBalance: (show : boolean) => void
  showingBalance : boolean
  account : IAccountData
  selectAccount : (account : IAccountData) => void
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

export const UserContext = createContext<Partial<ContextTypes>>({});

interface UserProviderTypes 
{
  children: ReactNode;
}

async function UserCookie (callback : any)
{
  try {        
    const response = await fetch('http://localhost:8000/user/', 
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
    console.log(responseJson);
    const user = responseJson.data;
    callback(user);
  } catch (error) {
      console.log(error);
      callback((null as unknown) as IUserData);        
  }
}

async function UserLogin (cpf: string, password: string) : Promise<IUserData>
{
  try {        
    const response = await fetch('http://localhost:8000/user/login', 
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
  const [account, setAccount] = useState<IAccountData>();

  function userApply (user : IUserData)
  {
    if(user && user.user) 
    {
      setUserData(user);
      if(user.accounts.length > 0) setAccount(user.accounts[0]);
    }
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

  const showBalance = (show = !showingBalance) =>
  {
    setShowingBalance(show);
  }

  const selectAccount = (_account : IAccountData) =>
  {
    setAccount(_account);
  }

  useEffect(()=>
  {
    setLoading(true);
    UserCookie((user : IUserData) => {userApply(user); setLoading(false);});
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
        selectAccount
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);