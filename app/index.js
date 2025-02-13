import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchHouses } from '../src/api/houses';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const { data: houses, isLoading, error } = useQuery({
    queryKey: ['houses'],
    queryFn: fetchHouses,
  });

  if (isLoading) return <Text style={styles.loading}>Loading...</Text>;
  if (error) return <Text style={styles.error}>Error fetching houses</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={houses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/details?id=${item.id}`)}
          >
            <Image source={{ uri: item.imagerUrl }} style={styles.image} />
            <Text style={styles.title}>{item.address}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f5f5f5' },
  loading: { textAlign: 'center', fontSize: 18, marginTop: 20 },
  error: { textAlign: 'center', color: 'red', fontSize: 16, marginTop: 20 },
  card: { backgroundColor: '#fff', padding: 15, marginVertical: 10, borderRadius: 10, elevation: 3 },
  image: { width: '100%', height: 180, borderRadius: 10 },
  title: { fontSize: 20, fontWeight: 'bold', marginTop: 10 },
  description: { fontSize: 14, color: '#555', marginTop: 5 },
});
