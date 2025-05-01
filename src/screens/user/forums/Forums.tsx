import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AppHeader from '../../../components/atoms/headers';
import styles from './styles';

const forums = [
  {
    id: '1',
    title: 'General Discussion',
    latest: 'Anyone attending the seminar tomorrow?',
    time: '2h ago',
  },
  {
    id: '2',
    title: 'Assignments Help',
    latest: 'Need help with the DBMS project.',
    time: '4h ago',
  },
  {
    id: '3',
    title: 'Events & Activities',
    latest: 'Coding bootcamp was amazing!',
    time: '1d ago',
  },
];

const Forums = ({ navigation }: any) => {
  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ForumDetail', { forumId: item.id })}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.latest}>{item.latest}</Text>
      <Text style={styles.time}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <AppHeader title="Discussion Forums" />
      <FlatList
        data={forums}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Forums;
