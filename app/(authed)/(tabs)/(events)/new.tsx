import { Button } from '@/components/Button';
import DateTimePicker from '@/components/DateTimePicker';
import { Input } from '@/components/Input';
import { Text } from '@/components/Text';
import { VStack } from '@/components/VStack';
import { eventService } from '@/services/events';
import { useNavigation, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';

export default function NewEvent() {
  const navigation = useNavigation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date());

  async function onSubmit() {
    try {
      setIsSubmitting(true);

      await eventService.createOne(name, location, date.toISOString());
      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to create event");
    } finally {
      setIsSubmitting(false);
    }
  }

  function onChangeDate(date?: Date) {
    setDate(date || new Date());
  }

  useEffect(() => {
    navigation.setOptions({ headerTitle: "New Event" });
  }, []);

  return (
    <VStack m={ 20 } flex={ 1 } gap={ 30 }>

      <VStack gap={ 5 }>
        <Text ml={ 10 } fontSize={ 14 } color="gray">Name</Text>
        <Input
          value={ name }
          onChangeText={ setName }
          placeholder="Name"
          placeholderTextColor="darkgray"
          h={ 48 }
          p={ 14 }
        />
      </VStack>

      <VStack gap={ 5 }>
        <Text ml={ 10 } fontSize={ 14 } color="gray">Location</Text>
        <Input
          value={ location }
          onChangeText={ setLocation }
          placeholder="Name"
          placeholderTextColor="darkgray"
          h={ 48 }
          p={ 14 }
        />
      </VStack>

      <VStack gap={ 5 }>
        <Text ml={ 10 } fontSize={ 14 } color="gray">Date</Text>
        <DateTimePicker onChange={onChangeDate} currentDate={date}/>
      </VStack>

      <Button
        mt={ "auto" }
        isLoading={ isSubmitting }
        disabled={ isSubmitting }
        onPress={ onSubmit }
      >
        Save
      </Button>

    </VStack>
  );
};
