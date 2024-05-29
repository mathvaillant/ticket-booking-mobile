import React, { useState } from 'react';

const AuthContext = React.createContext<{
  isLoggedIn: boolean;
  isLoadingAuth: boolean;
  login: VoidFunction;
  logout: VoidFunction;
  setIsLoadingAuth: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isLoggedIn: false,
  isLoadingAuth: true,
  login: () => { },
  logout: () => { },
  setIsLoadingAuth: () => { },
});

export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthenticationProvider({ children }: React.PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  function login() {
    setIsLoggedIn(true);
  }

  function logout() {
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider
      value={ {
        login,
        logout,
        isLoggedIn,
        isLoadingAuth,
        setIsLoadingAuth,
      } }>
      { children }
    </AuthContext.Provider>
  );
}
