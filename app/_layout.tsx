import { Slot } from 'expo-router';
import { AuthenticationProvider } from '../context/AuthContext';
import { SafeAreaView } from 'react-native';

export default function Root() {
  return (
    <AuthenticationProvider>
      <Slot />
    </AuthenticationProvider>
  );
}
