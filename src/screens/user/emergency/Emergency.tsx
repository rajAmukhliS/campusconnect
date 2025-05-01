import React from 'react';
import { View, FlatList, Text, TouchableOpacity, Linking, Alert } from 'react-native';
import AppHeader from '../../../components/atoms/headers';
import styles from './styles';

type EmergencyContact = {
  id: string;
  icon: string;
  name: string;
  phone: string;
};

const CONTACTS: EmergencyContact[] = [
  { id: '1', icon: '🛡️', name: 'Campus Security', phone: '1234567890' },
  { id: '2', icon: '🏥', name: 'Health Center', phone: '0987654321' },
  { id: '3', icon: '🔥', name: 'Fire Department', phone: '1122' },
  { id: '4', icon: '☎️', name: 'Admin Helpline', phone: '03001234567' },
];

const Emergency = () => {
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
      <Text style={styles.phone}>{item.phone}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <AppHeader title="Emergency Contacts" />
      <FlatList
        data={CONTACTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Emergency;
