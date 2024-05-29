import { Slot } from 'expo-router';
import { AuthenticationProvider } from '../context/AuthContext';

export default function Root() {
  return (
    <AuthenticationProvider>
      <Slot />
    </AuthenticationProvider>
  );
}
