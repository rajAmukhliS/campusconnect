import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Alert,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { getAllNotifications, addNotification, deleteNotification } from '../../../services/sqllite/db-service';
import AppHeader from '../../../components/atoms/headers';

const AdminNotifications = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    const data = await getAllNotifications();
    setNotifications(data);
  };

  const handleAdd = async () => {
    if (!title || !message) return Alert.alert('Validation', 'All fields are required.');
    await addNotification(title, message);
    setTitle('');
    setMessage('');
    fetchNotifications();
  };

  const handleDelete = async (id: string) => {
    await deleteNotification(id);
    fetchNotifications();
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <View style={styles.container}>
      <AppHeader title="Manage Notifications" />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Notification Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TextInput
          placeholder="Message"
          value={message}
          onChangeText={setMessage}
          style={[styles.input, { height: 80 }]}
          multiline
        />
        <Button title="Add Notification" onPress={handleAdd} />
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardMessage}>{item.message}</Text>
            </View>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text style={styles.deleteButton}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No notifications found.</Text>
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
  inputContainer: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  list: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
  },
  cardContent: {
    flex: 1,
    paddingRight: 8,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  cardMessage: {
    color: '#444',
  },
  deleteButton: {
    fontSize: 20,
    color: 'red',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#999',
  },
});

export default AdminNotifications;
