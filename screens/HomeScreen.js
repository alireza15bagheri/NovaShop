import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const clearOnboarding = async () => {
    try {
      await AsyncStorage.removeItem("@viewedOnboarding");
    } catch (error) {
      console.log("Error removing Item @viewedOnboarding: ", error);
    }
  };
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <Button
        icon={() => <Entypo name="clapperboard" size={24} color="#9343c9" />}
        mode="outlined"
        onPress={() => clearOnboarding()}
      >
        Clear Onboarding State
      </Button>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
