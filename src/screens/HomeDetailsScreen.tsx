import React, { useState, useEffect } from "react";
import { View, Text, Image, Button, StyleSheet, Alert } from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@/app/index"; // Import the navigation types

// Define the screen props using StackScreenProps
type HomeDetailsScreenProps = StackScreenProps<RootStackParamList, "HomeDetails">;

const HomeDetailsScreen: React.FC<HomeDetailsScreenProps> = ({ route, navigation }) => {
  const { home } = route.params;
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isNearby, setIsNearby] = useState(false);

  useEffect(() => {
    let isActive = true;

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location access is required to unlock homes.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      if (!isActive || !location || !location.coords) return;

      setUserLocation(location.coords);

      const distance = getDistance(
        location.coords.latitude,
        location.coords.longitude,
        home.latitude,
        home.longitude
      );
      setIsNearby(distance <= 30);
    })();

    return () => {
      isActive = false;
    };
  }, []);

  const unlockHome = async () => {
    try {
      await axios.post("https://678f678849875e5a1a91b27f.mockapi.io/houses/unlock", { homeId: home.id });
      Alert.alert("Success", "Home unlocked successfully!");
    } catch {
      Alert.alert("Error", "Failed to unlock home.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: home.image }} style={styles.image} />
      <Text style={styles.address}>{home.address}</Text>
      <Text style={styles.description}>{home.description}</Text>
      {isNearby ? <Button title="Unlock" onPress={unlockHome} /> : <Text>Move closer to unlock</Text>}
    </View>
  );
};

export default HomeDetailsScreen;

// Utility function to calculate distance between two GPS coordinates
const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c * 1000; // Convert km to meters
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: "center" },
  image: { width: "100%", height: 200, borderRadius: 10 },
  address: { fontSize: 20, fontWeight: "bold", marginTop: 10 },
  description: { fontSize: 16, color: "gray", textAlign: "center", marginVertical: 10 },
});
