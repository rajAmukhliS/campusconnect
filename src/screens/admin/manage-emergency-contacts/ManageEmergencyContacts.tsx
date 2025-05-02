import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import { deleteEmergencyContactById, getAllEmergencyContacts } from 'services/sqllite/db-service';

const ManageEmergencyContacts = () => {
  const navigation = useNavigation();
  const [contacts, setContacts] = useState([]);

  const loadContacts = async () => {
    const data = await getAllEmergencyContacts();
    setContacts(data);
  };

  const handleDelete = (id: number) => {
    Alert.alert('Confirm', 'Are you sure you want to delete this contact?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteEmergencyContactById(id);
          loadContacts();
        },
      },
    ]);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadContacts);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manage Emergency Contacts</Text>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <View>
              <Text style={styles.itemText}>{item.name} ({item.department})</Text>
              <Text style={styles.subText}>{item.phone}</Text>
            </View>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddEmergencyContact' as never)}>
        <Text style={styles.addButtonText}>Add Contact</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ManageEmergencyContacts;
