/* eslint-disable react/react-in-jsx-scope */
import { ReactNode, createContext, useState, useContext } from 'react';

interface ContextTypes 
{
  user: IUserData;
  loading: boolean;
  login: (login: string, password: string) => void
}

interface IUser
{
  name: string;
  email: string;
  cpf: string;
  birthDate: string;
}

interface IAccount 
{
  agency: string
  agency_identifier: string
  account: string
  account_identifier : string
  balance: number
  created_at : string
}

interface IUserData
{
  user: IUser
  accounts: IAccount[]
}

export const UserContext = createContext<Partial<ContextTypes>>({});

interface UserProviderTypes 
{
  children: ReactNode;
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
  const [user, setUser] = useState<IUserData>(); 
  const [loading, setLoading] = useState(false);

  const login = async (
    login: string,
    password: string,
  ) => 
  {
    setLoading(true);

    const user = await UserLogin(login, password);
    if(user && user.user) setUser(user)
    setLoading(false);
  }

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        login
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);