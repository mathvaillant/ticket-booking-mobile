import { useAuth } from '@/context/AuthContext';
import { globals } from '@/styles/_global';
import { router } from 'expo-router';
import { Text, View } from 'react-native';

export default function Login() {
  const { login } = useAuth();

  function onLoginPress() {
    login();
    router.replace('/');
  }

  return (
    <View style={ globals.container }>
      <Text onPress={ onLoginPress }>
        Login
      </Text>
    </View >
  );
}
