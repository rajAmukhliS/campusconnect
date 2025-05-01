import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import { addEvent } from 'services/sqllite/db-service';

const AddEvent = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (!title || !date || !description) {
      Alert.alert('Please fill all fields');
      return;
    }

    try {
      await addEvent(title, date, description);
      Alert.alert('Event added successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error adding event');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={styles.input} />
      <TextInput placeholder="Date" value={date} onChangeText={setDate} style={styles.input} />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        multiline
      />
      <Button title="Add Event" onPress={handleSubmit} />
    </View>
  );
};



export default AddEvent;
