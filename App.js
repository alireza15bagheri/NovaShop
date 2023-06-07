import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import OnboardingScreen from "./screens/OnboardingScreen";
import HomeScreen from "./screens/HomeScreen";

const Loading = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator color="#6260ff" size="large" />
    </View>
  );
};

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const value = await AsyncStorage.getItem("@viewedOnboarding");
        if (value !== null) {
          setViewedOnboarding(true);
        }
      } catch (err) {
        console.log("Error @checkOnboarding: ", err);
      } finally {
        setLoading(false);
      }
    };

    checkOnboarding();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <NavigationContainer>
          <Stack.Navigator>
            {viewedOnboarding ? (
              <Stack.Screen name="Home" component={HomeScreen} />
            ) : (
              <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
}
