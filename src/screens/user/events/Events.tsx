import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import AppHeader from '../../../components/atoms/headers';
import styles from './styles';
import { getAllEvents } from 'services/sqllite/db-service'; // ✅ adjust path if needed

type Event = {
  id: number;
  title: string;
  date: string;
  description: string;
};

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);

  const loadEvents = async () => {
    const data = await getAllEvents();
    setEvents(data);
  };

  useEffect(() => {
    loadEvents();
  }, []);

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
        data={events}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Events;
