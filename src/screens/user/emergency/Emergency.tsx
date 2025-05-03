import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, Linking, Alert } from 'react-native';
import AppHeader from '../../../components/atoms/headers';
import styles from './styles';
import { getAllEmergencyContacts } from '../../../services/sqllite/db-service';

type EmergencyContact = {
  id: string;
  icon: string;
  name: string;
  phone: string;
};

const Emergency = () => {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);

  const fetchContacts = async () => {
    try {
      const data = await getAllEmergencyContacts();
      console.log('Emergency contacts fetched:', data);
      setContacts(data);
    } catch (error) {
      console.error('Error fetching emergency contacts:', error);
    }
  };

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`).catch(() => {
      Alert.alert('Error', 'Unable to make a call from this device.');
    });
  };

  const renderItem = ({ item }: { item: EmergencyContact }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleCall(item.phone)}>
      <Text style={styles.name}>
        {item.icon} {item.name}
      </Text>
      <Text style={styles.phone}>{item.name} ({item.department})</Text>
      <Text style={styles.phone}>{item.phone}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <View style={styles.container}>
      <AppHeader title="Emergency Contacts" />
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20 }}>No emergency contacts found.</Text>
        }
      />
    </View>
  );
};

export default Emergency;
