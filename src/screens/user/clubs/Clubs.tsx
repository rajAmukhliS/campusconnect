import React, { useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, Alert } from 'react-native';
import AppHeader from '../../../components/atoms/headers';
import styles from './styles';

type Club = {
  id: string;
  name: string;
  description: string;
};

const CLUBS: Club[] = [
  { id: '1', name: 'Tech Club', description: 'Work on coding projects, hackathons, and tech talks.' },
  { id: '2', name: 'Drama Club', description: 'Participate in plays, skits, and theatre activities.' },
  { id: '3', name: 'Photography Club', description: 'Explore photography techniques and photo walks.' },
  { id: '4', name: 'Sports Club', description: 'Join games like football, cricket, basketball, and more.' },
];

const Clubs = () => {
  const [joinedClubs, setJoinedClubs] = useState<string[]>([]);

  const handleJoin = (clubId: string) => {
    if (joinedClubs.includes(clubId)) {
      Alert.alert('Already Joined', 'You have already joined this club.');
      return;
    }
    setJoinedClubs((prev) => [...prev, clubId]);
    Alert.alert('Success', 'You have successfully joined the club!');
  };

  const renderItem = ({ item }: { item: Club }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleJoin(item.id)}
      >
        <Text style={styles.buttonText}>
          {joinedClubs.includes(item.id) ? 'Joined' : 'Join Club'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <AppHeader title="Clubs & Activities" />
      <FlatList
        data={CLUBS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

export default Clubs;
