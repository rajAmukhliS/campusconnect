import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { insertForum } from 'services/sqllite/db-service';

const AddForum = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const navigation = useNavigation();

  const handleAddForum = async () => {
    if (!title || !content || !author) {
      Alert.alert('Please fill all fields');
      return;
    }

    const currentDate = new Date().toISOString(); // Add date as required by insertForum

    try {
      await insertForum(title, content, author, currentDate);
      Alert.alert('Success', 'Forum post added!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to add forum post');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Forum Post</Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Content"
        multiline
        value={content}
        onChangeText={setContent}
      />

      <TextInput
        style={styles.input}
        placeholder="Author"
        value={author}
        onChangeText={setAuthor}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddForum}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddForum;
