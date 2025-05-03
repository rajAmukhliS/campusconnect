import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AppHeader from '../../../components/atoms/headers';
import styles from './styles';
import { getAllForums } from '../../../services/sqllite/db-service';

const Forums = ({ navigation }: any) => {
  const [forums, setForums] = useState([]);

  const fetchForums = async () => {
    try {
      console.log('Fetching forums...');
      const data = await getAllForums();
      console.log('Forums fetched:', data);
      setForums(data);
    } catch (error) {
      console.error('Error fetching forums:', error);
    }
  };

  useEffect(() => {
    fetchForums();
  }, []);

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ForumDetail', { forumId: item.id })}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.latest}>{item.content}</Text>
      <Text style={styles.time}>{'2h ago'}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <AppHeader title="Discussion Forums" />
      <FlatList
        data={forums}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No forums available.</Text>}
      />
    </View>
  );
};

export default Forums;
