import { Button } from '@/components/Button';
import { Divider } from '@/components/Divider';
import { HStack } from '@/components/HStack';
import { Text } from '@/components/Text';
import { VStack } from '@/components/VStack';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useAuth } from '@/context/AuthContext';
import { useOnScreenFocusCallback } from '@/hooks/useOnScreenFocusCallback';
import { eventService } from '@/services/events';
import { Event } from '@/types/event';
import { useNavigation, router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, TouchableOpacity } from 'react-native';

export default function EventsScreen() {
  const { user } = useAuth();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

  function onGoToEventPage(id: number) {
    if (user?.role === "manager") {
      router.push(`/(events)/event/${id}`);
    }
  }

  const fetchEvents = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await eventService.getAll();
      setEvents(response.data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch events");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useOnScreenFocusCallback(fetchEvents);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Events",
      headerRight: user?.role === "manager" ? headerRight : null,
    });
  }, [navigation, user]);

  return (
    <VStack flex={ 1 } p={ 20 } pb={ 0 } gap={ 20 }>

      <HStack alignItems='center' justifyContent='space-between'>
        <Text fontSize={ 18 } bold>{ events.length } Events</Text>
      </HStack>

      <FlatList
        keyExtractor={ (item) => item.id.toString() }
        data={ events }
        onRefresh={ fetchEvents }
        refreshing={ isLoading }
        renderItem={ ({ item: event }) => (
          <VStack
            gap={ 20 }
            p={ 20 }
            style={ {
              backgroundColor: 'white',
              borderRadius: 20,
            } } key={ event.id }>

            <TouchableOpacity onPress={ () => onGoToEventPage(event.id) }>
              <HStack alignItems='center' justifyContent="space-between">
                <HStack alignItems='center'>
                  <Text fontSize={ 26 } bold >{ event.name }</Text>
                  <Text fontSize={ 26 } bold > | </Text>
                  <Text fontSize={ 16 } bold >{ event.location }</Text>
                </HStack>
                { user?.role === "manager" && <TabBarIcon size={ 24 } name="chevron-forward" /> }
              </HStack>
            </TouchableOpacity>

            <Divider />

            <HStack justifyContent='space-between'>
              <VStack gap={ 10 }>
                <Text bold fontSize={ 16 } color='gray'>Sold: { event.totalTicketsPurchased }</Text>
                <Text bold fontSize={ 16 } color='green'>Entered: { event.totalTicketsEntered }</Text>
              </VStack>
              { user?.role === "attendee" && (
                <VStack>
                  <Button variant='outlined'>Buy Ticket</Button>
                </VStack>
              ) }
            </HStack>
            <Text fontSize={ 13 } color='gray'>{ event.date }</Text>
          </VStack>

        ) }
        ItemSeparatorComponent={ () => <VStack h={ 20 } /> }
      />

    </VStack>
  );
}

const headerRight = () => {
  return (
    <TabBarIcon size={ 32 } name="add-circle-outline" onPress={ () => router.push('/(events)/new') } />
  );
};
