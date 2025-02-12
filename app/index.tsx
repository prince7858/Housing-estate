import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../src/screens/LoginScreen";
import HomeListScreen from "../src/screens/HomeListScreen";
import HomeDetailsScreen from "../src/screens/HomeDetailsScreen";

// Define the types for navigation parameters
export type RootStackParamList = {
  Login: undefined;
  HomeList: undefined;
  HomeDetails: { 
    home: { 
      id: string;
      image: string;
      address: string;
      description: string;
      latitude: number;
      longitude: number;
    };
  };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function Index() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="HomeList" component={HomeListScreen} />
        <Stack.Screen name="HomeDetails" component={HomeDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
