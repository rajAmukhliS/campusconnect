import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, View, Text, TouchableOpacity, Alert } from 'react-native';
import AppHeader from '../../../components/atoms/headers';
import RootStackParamList from '../../../types/navigation-types/root-stack';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

type Feature = {
  title: string;
  screen: keyof RootStackParamList;
};

const FEATURES: Feature[] = [
  { title: '📅 Event Calendar', screen: 'Events' },
  { title: '🎓 Student Portal', screen: 'Portal' },
  { title: '🗺️ Campus Map', screen: 'CampusMap' },
  { title: '💬 Forums', screen: 'Forums' },
  { title: '🏃‍♂️ Clubs & Activities', screen: 'Clubs' },
  { title: '🚨 Emergency Contacts', screen: 'Emergency' },
  { title: '🔔 Notifications', screen: 'Notifications' },
];

const Home = (props: Props) => {

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress:async () =>{
          props.navigation.reset({
                index: 0,
                routes: [{ name: 'Login' as never }]
              });
              await AsyncStorage.clear();
        }
      },
    ]);
  };

  const renderItem = ({ item }: { item: Feature }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => props.navigation.navigate(item.screen)}
    >
      <Text style={styles.cardText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <AppHeader title="Campus Connect" />
      <FlatList
        data={FEATURES}
        keyExtractor={(item) => item.title}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={renderItem}
      />
       <TouchableOpacity style={[styles.card, { backgroundColor: '#ff4d4d' }]} onPress={handleLogout}>
        <Text style={[styles.cardText, { color: '#fff' }]}>Logout</Text>
      </TouchableOpacity>
     
    </View>
  );
};

export default Home;
