import { useAuth } from '@/context/AuthContext';
import { VStack } from '@/components/VStack';
import { Button } from '@/components/Button';

export default function SettingsScreen() {
  const { logout } = useAuth();

  return (
    <VStack flex={ 1 } m={ 20 }>
      <Button onPress={ logout }>Logout</Button>
    </VStack>
  );
}
