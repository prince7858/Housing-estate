import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchHouses } from '../api/houses';

export default function HomeScreen({ navigation }) {
  const { data: houses, isLoading, error } = useQuery(['houses'], fetchHouses);

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error fetching houses</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={houses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Details', { house: item })}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.address}</Text>
            <Text>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  card: { backgroundColor: '#fff', padding: 10, marginVertical: 10, borderRadius: 5 },
  image: { width: '100%', height: 150, borderRadius: 5 },
  title: { fontSize: 18, fontWeight: 'bold' },
});
