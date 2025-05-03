import React, {useEffect, useState} from 'react';
import {View, FlatList, Text, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppHeader from '../../../components/atoms/headers';
import styles from './styles';
import {getAllClubs} from '../../../services/sqllite/db-service';

type Club = {
  id: string;
  name: string;
  description: string;
};

const Clubs = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [joinedClubs, setJoinedClubs] = useState<string[]>([]);

  const CLUBS_KEY = 'JOINED_CLUBS';

  const fetchClubs = async () => {
    try {
      const data = await getAllClubs();
      console.log('Clubs fetched:', data);
      setClubs(data);
    } catch (error) {
      console.error('Error fetching clubs:', error);
    }
  };

  const loadJoinedClubs = async () => {
    try {
      const stored = await AsyncStorage.getItem(CLUBS_KEY);
      if (stored) {
        setJoinedClubs(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading joined clubs from storage:', error);
    }
  };

  const saveJoinedClubs = async (updated: string[]) => {
    try {
      await AsyncStorage.setItem(CLUBS_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving joined clubs to storage:', error);
    }
  };

  const handleJoin = (clubId: string) => {
    let updated: string[] = [];

    if (joinedClubs.includes(clubId)) {
      updated = joinedClubs.filter(id => id !== clubId);
      Alert.alert('Left Club', 'You have left the club.');
    } else {
      updated = [...joinedClubs, clubId];
      Alert.alert('Joined Club', 'You have successfully joined the club!');
    }

    setJoinedClubs(updated);
    saveJoinedClubs(updated);
  };

  const renderItem = ({item}: {item: Club}) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleJoin(item.id)}>
        <Text style={styles.buttonText}>
          {joinedClubs.includes(item.id) ? 'Joined' : 'Join Club'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    fetchClubs();
    loadJoinedClubs();
  }, []);

  return (
    <View style={styles.container}>
      <AppHeader title="Clubs & Activities" />
      <FlatList
        data={clubs}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainer}
        ListEmptyComponent={
          <Text style={{textAlign: 'center', marginTop: 20}}>
            No clubs found.
          </Text>
        }
      />
    </View>
  );
};

export default Clubs;
