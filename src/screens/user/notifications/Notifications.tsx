import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';
import { getAllNotifications } from '../../../services/sqllite/db-service';
import AppHeader from '../../../components/atoms/headers';

const UserNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await getAllNotifications();
      setNotifications(data);
    };
    fetchNotifications();
  }, []);

  return (
    <View style={styles.container}>
      <AppHeader title="Notifications" />
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.message}>{item.message}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No notifications available.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#f1f1f1',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
  },
  time: {
    fontSize: 12,
    color: '#777',
    textAlign: 'right',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 40,
    fontSize: 16,
  },
});

export default UserNotifications;
