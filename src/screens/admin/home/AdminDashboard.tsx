import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminDashboard = () => {
  const navigation = useNavigation();

  const handleNavigate = (screen: string) => {
    navigation.navigate(screen as never);
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress:async () =>{
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' as never }]
              });
              await AsyncStorage.clear();
        }
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Admin Dashboard</Text>

      <TouchableOpacity style={styles.card} onPress={() => handleNavigate('ManageEvents')}>
        <Text style={styles.cardText}>Manage Events</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => handleNavigate('ManageForums')}>
        <Text style={styles.cardText}>Manage Forums</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => handleNavigate('ManageClubs')}>
        <Text style={styles.cardText}>Manage Clubs</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => handleNavigate('ManageEmergencyContacts')}>
        <Text style={styles.cardText}>Manage Emergency Contacts</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.card, { backgroundColor: '#ff4d4d' }]} onPress={handleLogout}>
        <Text style={[styles.cardText, { color: '#fff' }]}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AdminDashboard;
