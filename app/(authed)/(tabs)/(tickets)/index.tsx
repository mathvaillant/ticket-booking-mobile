import { HStack } from "@/components/HStack";
import { Text } from "@/components/Text";
import { VStack } from "@/components/VStack";
import { ticketService } from "@/services/tickets";
import { Ticket } from "@/types/ticket";
import { useFocusEffect } from "@react-navigation/native";
import { router, useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, TouchableOpacity } from "react-native";

export default function TicketScreen() {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  function onGoToTicketPage(id: number) {
    router.push(`/(tickets)/ticket/${id}`);
  }

  async function fetchTickets() {
    try {
      setIsLoading(true);
      const response = await ticketService.getAll();
      setTickets(response.data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch tickets");
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(useCallback(() => { fetchTickets(); }, []));

  useEffect(() => {
    navigation.setOptions({ headerTitle: "Tickets" });
  }, [navigation]);

  return (
    <VStack flex={1} p={20} pb={0} gap={20}>

      <HStack alignItems="center" justifyContent="space-between">
        <Text fontSize={18} bold>{tickets.length} Tickets</Text>
      </HStack>

      <FlatList
        keyExtractor={({ id }) => id.toString()}
        data={tickets}
        onRefresh={fetchTickets}
        refreshing={isLoading}
        renderItem={({ item: ticket }) => (
          <TouchableOpacity disabled={ticket.entered} onPress={() => onGoToTicketPage(ticket.id)}>
            <VStack
              gap={20}
              h={120}
              key={ticket.id}
              style={{ opacity: ticket.entered ? 0.5 : 1 }}
            >
              <HStack>
                <VStack
                  h={120}
                  w={"69%"}
                  p={20}
                  justifyContent="space-between"
                  style={{
                    backgroundColor: "white",
                    borderTopLeftRadius: 20,
                    borderBottomLeftRadius: 20,
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5
                  }}
                >
                  <HStack alignItems="center">
                    <Text fontSize={22} bold>{ticket.event.name}</Text>
                    <Text fontSize={22} bold> | </Text>
                    <Text fontSize={16} bold>{ticket.event.location}</Text>
                  </HStack>
                  <Text fontSize={12}>{new Date(ticket.event.date).toLocaleString()}</Text>
                </VStack>

                <VStack
                  h={110}
                  w={"1%"}
                  style={{
                    alignSelf: "center",
                    borderColor: "lightgray",
                    borderWidth: 2,
                    borderStyle: 'dashed',
                  }}
                />

                <VStack
                  h={120}
                  w={"29%"}
                  justifyContent="center"
                  alignItems="center"
                  style={{
                    backgroundColor: "white",
                    borderTopRightRadius: 20,
                    borderBottomRightRadius: 20,
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
                  }}
                >
                  <Text fontSize={16} bold>{ticket.entered ? "Used" : "Available"}</Text>
                  {ticket.entered &&
                    <Text mt={12} fontSize={10}>{new Date(ticket.updatedAt).toLocaleString()}</Text>
                  }
                </VStack>
              </HStack>

            </VStack>
          </TouchableOpacity>
        )}

        ItemSeparatorComponent={() => <VStack h={20} />}
      />

    </VStack>
  );
}
