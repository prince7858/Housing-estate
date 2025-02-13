import { View, Text, Image, Button, Alert, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { fetchHouses } from '../src/api/houses';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const { data: houses } = useQuery({
    queryKey: ['houses'],
    queryFn: fetchHouses,
  });

  const house = houses?.find((h) => h.id === id);
  const [location, setLocation] = useState(null);
  const [isNearby, setIsNearby] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required to unlock homes.');
        return;
      }
      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);

      const distance = Math.sqrt(
        Math.pow(userLocation.coords.latitude - house.latitude, 2) +
        Math.pow(userLocation.coords.longitude - house.longitude, 2)
      );
      setIsNearby(distance < 0.0003); // Roughly 30m
    })();
  }, []);

  const handleUnlock = () => {
    Alert.alert('Success', 'Home unlocked successfully!');
  };

  if (!house) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Image source={{ uri: house.image }} style={styles.image} />
      <Text style={styles.title}>{house.address}</Text>
      <Text style={styles.description}>{house.description}</Text>
      {isNearby ? (
        <Button title="Unlock Home" onPress={handleUnlock} />
      ) : (
        <Text style={styles.lockedText}>You must be within 30m to unlock</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f5f5f5' },
  image: { width: '100%', height: 250, borderRadius: 10 },
  title: { fontSize: 22, fontWeight: 'bold', marginTop: 10 },
  description: { fontSize: 16, color: '#555', marginTop: 5 },
  lockedText: { color: 'red', fontSize: 16, marginTop: 10 },
});
