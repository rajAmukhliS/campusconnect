import React from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import AppHeader from '../../../components/atoms/headers';
import styles from './styles';

type Event = {
  id: string;
  title: string;
  date: string;
  description: string;
};

const EVENTS: Event[] = [
  {
    id: '1',
    title: 'Tech Talk: AI in 2025',
    date: 'May 5, 2025 | 2:00 PM',
    description: 'Join us for an exciting session on future trends in Artificial Intelligence.',
  },
  {
    id: '2',
    title: 'Cultural Fest',
    date: 'May 10, 2025 | 5:00 PM',
    description: 'Celebrate diverse cultures with performances and food stalls!',
  },
  {
    id: '3',
    title: 'Startup Workshop',
    date: 'May 15, 2025 | 11:00 AM',
    description: 'Learn how to pitch your ideas and build a startup from scratch.',
  },
];

const Events = () => {
  const renderItem = ({ item }: { item: Event }) => (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <AppHeader title="Event Calendar" />
      <FlatList
        data={EVENTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Events;
