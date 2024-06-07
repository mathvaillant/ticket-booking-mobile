import { Slot } from 'expo-router';
import { AuthenticationProvider } from '../context/AuthContext';
import { StatusBar } from 'expo-status-bar';

export default function Root() {
  return (
    <>
      <StatusBar style="dark" />
      <AuthenticationProvider>
        <Slot />
      </AuthenticationProvider>
    </>
  );
}
