import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Alert, TextInput} from 'react-native';

import styles from './styles';
import AppHeader from '../../../components/atoms/headers';
import { addCampusMapItem, deleteCampusMapItemById, getCampusMapItems } from 'services/sqllite/db-service';

const ManageCampusMap = () => {
  const [mapItems, setMapItems] = useState([]);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const fetchMapItems = async () => {
    console.log('Fetching campus map items...');
    const items = await getCampusMapItems();
    console.log('Map Items:', items);
    setMapItems(items);
  };

  const handleAdd = async () => {
    if (!newName || !newDesc) return Alert.alert('Please fill in both fields.');
    await addCampusMapItem(newName, newDesc);
    setNewName('');
    setNewDesc('');
    fetchMapItems();
  };

  const handleDelete = async (id) => {
    await deleteCampusMapItemById(id);
    fetchMapItems();
  };

  useEffect(() => {
    fetchMapItems();
  }, []);

  return (
    <View style={styles.container}>
      <AppHeader title="Manage Campus Map" />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Place Name"
          value={newName}
          onChangeText={setNewName}
          style={styles.input}
        />
        <TextInput
          placeholder="Description"
          value={newDesc}
          onChangeText={setNewDesc}
          style={styles.input}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addButtonText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {mapItems.length > 0 ? (
          mapItems.map((item, index) => (
            <View key={index} style={styles.itemCard}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text>{item.description}</Text>

              <TouchableOpacity
                onPress={() => handleDelete(item.id)}
                style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text>No campus map entries found.</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default ManageCampusMap;
