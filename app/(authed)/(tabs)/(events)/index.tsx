import { globals } from '@/styles/_global';
import { Link, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { View, Text } from 'react-native';

export default function EventsScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerTitle: "Events" });
  }, [navigation]);

  return (
    <View style={ globals.container }>
      <Text>Events</Text>
      <Link href="/event/1">View first event details</Link>
      <Link href="/event/2">View second event details</Link>
      <Link
        href={ {
          pathname: '/event/[id]',
          params: { id: '3' },
        } }>
        View event details
      </Link>
    </View>
  );
}
