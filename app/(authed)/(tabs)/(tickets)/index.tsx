import { globals } from '@/styles/_global';
import { Link, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { View, Text } from 'react-native';

export default function TicketsScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerTitle: "Tickets" });
  }, [navigation]);

  return (
    <View style={ globals.container }>
      <Text>Tickets</Text>
      <Link href="/ticket/1">View first ticket details</Link>
      <Link href="/ticket/2">View second ticket details</Link>
      <Link
        href={ {
          pathname: '/ticket/[id]',
          params: { id: '3' },
        } }>
        View ticket details
      </Link>
    </View>
  );
}

