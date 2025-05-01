import React from 'react';
import { View, Text, FlatList } from 'react-native';
import AppHeader from '../../../components/atoms/headers';
import styles from './styles';

const notifications = [
  {
    id: '1',
    title: 'Event Reminder',
    message: 'Don’t forget the AI workshop tomorrow at 10 AM.',
    time: '1h ago',
  },
  {
    id: '2',
    title: 'New Assignment',
    message: 'Data Structures assignment uploaded. Due next Monday.',
    time: '3h ago',
  },
  {
    id: '3',
    title: 'Campus Closed',
    message: 'University will remain closed on Friday due to maintenance.',
    time: 'Yesterday',
  },
];

const Notifications = () => {
  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.time}>{item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <AppHeader title="Notifications" />
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default Notifications;
