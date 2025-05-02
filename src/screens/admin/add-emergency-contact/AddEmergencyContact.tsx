import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

import styles from './styles';
import { insertEmergencyContact } from 'services/sqllite/db-service';

const AddEmergencyContact = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('');

  const handleAddContact = async () => {
    if (!name || !phone || !department) {
      Alert.alert('Validation', 'All fields are required.');
      return;
    }

    try {
      await insertEmergencyContact(name, phone, department);
      Alert.alert('Success', 'Emergency contact added successfully!');
      navigation.goBack(); // Go back to the previous screen after successful insert
    } catch (error) {
      Alert.alert('Error', 'Failed to add the contact.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Emergency Contact</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Department"
        value={department}
        onChangeText={setDepartment}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddContact}>
        <Text style={styles.addButtonText}>Add Contact</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddEmergencyContact;
