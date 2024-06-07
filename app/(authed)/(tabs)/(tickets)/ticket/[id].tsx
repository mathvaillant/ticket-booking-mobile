import { VStack } from '@/components/VStack';
import { Text } from '@/components/Text';
import { useOnScreenFocusCallback } from '@/hooks/useOnScreenFocusCallback';
import { ticketService } from '@/services/tickets';
import { Ticket } from '@/types/ticket';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Image } from 'react-native';

export default function TicketDetailsScreen() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();

  const [ticketData, setTicketData] = useState<Ticket | null>(null);
  const [qrcode, setQrcode] = useState<string | null>(null);

  const fetchTicket = useCallback(async () => {
    try {
      const response = await ticketService.getOne(Number(id));
      setTicketData(response.data.ticket);
      setQrcode(response.data.qrcode);
    } catch (error) {
      router.back();
    }
  }, [id, router]);

  useOnScreenFocusCallback(fetchTicket);

  useEffect(() => {
    fetchTicket();
  }, [fetchTicket]);

  useEffect(() => {
    navigation.setOptions({ headerTitle: "" });
  }, [navigation]);

  if (!ticketData) return null;

  return (
    <VStack
      alignItems='center'
      m={ 20 }
      p={ 20 }
      gap={ 20 }
      flex={ 1 }
      style={ {
        backgroundColor: 'white',
        borderRadius: 20,
      } }
    >
      <Text fontSize={ 50 } bold >{ ticketData.event.name }</Text>
      <Text fontSize={ 20 } bold >{ ticketData.event.location }</Text>
      <Text fontSize={ 16 } color='gray'>{ new Date(ticketData.event.date).toLocaleString() }</Text>

      <Image
        style={ { borderRadius: 20 } }
        width={ 300 }
        height={ 300 }
        source={ { uri: `data:image/png;base64,${qrcode}` } }
      />
    </VStack>
  );
}
