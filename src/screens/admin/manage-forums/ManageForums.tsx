import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import { deleteForumById, getAllForums } from 'services/sqllite/db-service';

const ManageForums = () => {
  const [forums, setForums] = useState([]);
  const navigation = useNavigation();

  const loadForums = async () => {
    const data = await getAllForums();
    setForums(data);
  };

  const handleDelete = async (id: number) => {
    Alert.alert('Confirm', 'Are you sure you want to delete this forum?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        onPress: async () => {
          await deleteForumById(id);
          loadForums();
        },
      },
    ]);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadForums);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manage Forums</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddForum')}>
        <Text style={styles.buttonText}>Add New Forum</Text>
      </TouchableOpacity>

      <FlatList
        data={forums}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text>{item.content}</Text>
            <Text>By: {item.author}</Text>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default ManageForums;
