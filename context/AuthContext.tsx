import { userService } from '@/services/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';

interface AuthContextProps {
  isLoggedIn: boolean;
  isLoadingAuth: boolean;
  authenticate: (authMode: "login" | "register", email: string, password: string) => Promise<void>;
  logout: VoidFunction;
}

const AuthContext = React.createContext({} as AuthContextProps);

export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthenticationProvider({ children }: React.PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);

  useEffect(() => {
    async function checkIfLoggedIn() {
      const token = await AsyncStorage.getItem('token');
      setIsLoggedIn(!!token);
      router.replace('(authed)');
    }

    checkIfLoggedIn();
  }, []);

  async function authenticate(authMode: "login" | "register", email: string, password: string) {
    try {
      setIsLoadingAuth(true);

      const response = await userService[authMode](email, password);

      if (response) {
        setIsLoggedIn(true);
        await AsyncStorage.setItem('token', response.data.token);
        router.replace('(authed)');
      }
    } catch (error) {
      setIsLoggedIn(false);
    } finally {
      setIsLoadingAuth(false);
    }
  }

  async function logout() {
    setIsLoggedIn(false);
    await AsyncStorage.removeItem('token');
  }

  return (
    <AuthContext.Provider
      value={ {
        authenticate,
        logout,
        isLoggedIn,
        isLoadingAuth,
      } }>
      { children }
    </AuthContext.Provider>
  );
}
