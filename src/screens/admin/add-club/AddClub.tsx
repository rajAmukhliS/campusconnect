import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';

import { useNavigation } from '@react-navigation/native';
import { insertClub } from 'services/sqllite/db-service';

const AddClub = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigation = useNavigation();

  const handleAdd = async () => {
    if (!name || !description) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    await insertClub(name, description);
    Alert.alert('Success', 'Club added successfully!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Club</Text>

      <TextInput
        placeholder="Club Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Description"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Add Club</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddClub;
