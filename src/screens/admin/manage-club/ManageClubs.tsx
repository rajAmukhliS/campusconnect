import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';

import { useNavigation } from '@react-navigation/native';
import { deleteClubById, getAllClubs } from 'services/sqllite/db-service';

const ManageClubs = () => {
  const [clubs, setClubs] = useState([]);
  const navigation = useNavigation();

  const fetchClubs = async () => {
    const data = await getAllClubs();
    setClubs(data);
  };

  const handleDelete = async (id: number) => {
    Alert.alert('Delete', 'Are you sure you want to delete this club?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteClubById(id);
          fetchClubs();
        },
      },
    ]);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchClubs);
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }: any) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text>{item.description}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manage Clubs</Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddClub')}
      >
        <Text style={styles.addButtonText}>Add Club</Text>
      </TouchableOpacity>

      <FlatList
        data={clubs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ManageClubs;
