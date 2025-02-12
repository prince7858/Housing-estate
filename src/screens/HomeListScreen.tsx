import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useQuery } from "react-query";
import axios from "axios";

const fetchHomes = async () => {
  const { data } = await axios.get("https://678f678849875e5a1a91b27f.mockapi.io/houses");
  return data;
};

const HomeListScreen = ({ navigation }: any) => {
  const { data, error, isLoading } = useQuery("homes", fetchHomes);

  if (isLoading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text style={styles.error}>Error loading homes</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("HomeDetails", { home: item })}>
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.address}>{item.address}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  card: { padding: 10, borderBottomWidth: 1, marginBottom: 10, backgroundColor: "#fff", borderRadius: 8 },
  image: { width: "100%", height: 150, borderRadius: 8 },
  address: { fontSize: 16, fontWeight: "bold", marginTop: 5 },
  description: { fontSize: 14, color: "gray" },
  error: { color: "red", textAlign: "center", marginTop: 20 },
});
