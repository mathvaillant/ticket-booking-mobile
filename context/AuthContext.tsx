import React, { useState } from 'react';

interface AuthContextProps {
  isLoggedIn: boolean;
  isLoadingAuth: boolean;
  authenticate: (email: string, password: string) => Promise<void>;
  logout: VoidFunction;
  setIsLoadingAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = React.createContext({} as AuthContextProps);

export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthenticationProvider({ children }: React.PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);

  async function authenticate(email: string, password: string) {
    setIsLoggedIn(true);
  }

  function logout() {
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider
      value={ {
        authenticate,
        logout,
        isLoggedIn,
        isLoadingAuth,
        setIsLoadingAuth,
      } }>
      { children }
    </AuthContext.Provider>
  );
}
