import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { ComponentProps } from 'react';
import { Text } from 'react-native';

export default function TabLayout() {
  const tabs = [
    {
      name: '(events)',
      displayName: 'Events',
      icon: 'calendar',
      options: {
        headerShown: false
      }
    },
    {
      name: '(tickets)',
      displayName: 'My Tickets',
      icon: 'ticket',
      options: {
        headerShown: false
      }
    },
    {
      name: 'scan-ticket',
      displayName: 'Scan Ticket',
      icon: 'scan',
      options: {
        headerShown: true
      }
    },
    {
      name: 'settings',
      displayName: 'Settings',
      icon: 'cog',
      options: {
        headerShown: true
      }
    }
  ];

  return (
    <Tabs>
      { tabs.map(tab => (
        <Tabs.Screen
          key={ tab.name }
          name={ tab.name }
          options={ {
            ...tab.options,
            headerTitle: tab.displayName,
            tabBarLabel: ({ focused }) => (
              <Text style={ { color: focused ? "black" : "gray", fontSize: 12 } } >
                { tab.displayName }
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                name={ tab.icon as ComponentProps<typeof Ionicons>['name'] }
                color={ focused ? 'black' : "gray" }
              />
            )
          } }
        />
      )) }
    </Tabs>
  );
}
