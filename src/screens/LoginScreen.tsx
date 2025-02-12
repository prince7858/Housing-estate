import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    if (email.trim()) {
      navigation.navigate("HomeList"); // Navigate to Home List screen
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Enter Email"
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: { height: 40, borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 5 },
});
