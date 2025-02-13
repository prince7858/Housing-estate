import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, Alert, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

export default function DetailScreen({ route }) {
  const { house } = route.params;
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

      // Calculate distance (for simplicity, assuming lat/lng are in the house object)
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

  return (
    <View style={styles.container}>
      <Image source={{ uri: house.image }} style={styles.image} />
      <Text style={styles.title}>{house.address}</Text>
      <Text>{house.description}</Text>
      {isNearby ? (
        <Button title="Unlock Home" onPress={handleUnlock} />
      ) : (
        <Text style={styles.lockedText}>You must be within 30m to unlock</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  image: { width: '100%', height: 200, borderRadius: 5 },
  title: { fontSize: 22, fontWeight: 'bold' },
  lockedText: { color: 'red', marginTop: 10 },
});
