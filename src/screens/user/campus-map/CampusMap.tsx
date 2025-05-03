import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import AppHeader from '../../../components/atoms/headers';
import styles from './styles';
import { getCampusMapItems } from '../../../services/sqllite/db-service';

const CampusMap = () => {
  const [locations, setLocations] = useState([]);

  const fetchLocations = async () => {
    console.log('Fetching campus map items...');
    const data = await getCampusMapItems();
    console.log('Received locations:', data);
    setLocations(data);
  };

  useEffect(() => {
    fetchLocations();
  }, []);

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
        source={require('../../../assets/images/logo.jpeg')}
        style={styles.mapImage}
        resizeMode="contain"
      />
      <FlatList
        data={locations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text>No locations found.</Text>}
      />
    </View>
  );
};

export default CampusMap;
