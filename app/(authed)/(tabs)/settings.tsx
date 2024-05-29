import { View, Text } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { globals } from '@/styles/_global';

export default function SettingsScreen() {
  const { logout } = useAuth();

  return (
    <View style={ globals.container }>
      <Text>Settings</Text>
      <Text
        onPress={ logout }>
        Logout
      </Text>
    </View>
  );
}
