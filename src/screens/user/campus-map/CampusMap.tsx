import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import AppHeader from '../../../components/atoms/headers';
import styles from './styles';

const locations = [
  { id: '1', name: 'Library', description: 'Main campus library, 3 floors of study space.' },
  { id: '2', name: 'Cafeteria', description: 'Affordable meals and snacks.' },
  { id: '3', name: 'Lab Building', description: 'Computer labs and engineering labs.' },
  { id: '4', name: 'Lecture Hall A', description: 'Large hall for major lectures.' },
];

const CampusMap = () => {
  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.locationName}>{item.name}</Text>
      <Text style={styles.locationDesc}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <AppHeader title="Campus Map" />
      <Image
        source={require('../../../assets/images/logo.jpeg')} // Add a placeholder image in assets
        style={styles.mapImage}
        resizeMode="contain"
      />
      <FlatList
        data={locations}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default CampusMap;
