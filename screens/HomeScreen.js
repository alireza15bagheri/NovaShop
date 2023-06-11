import React from "react";
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { Button } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Carousel from "react-native-snap-carousel";

const carouselData = [
  { id: 1, title: "Item 1" },
  { id: 2, title: "Item 2" },
  { id: 3, title: "Item 3" },
];

const HomeScreen = () => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const clearOnboarding = async () => {
    try {
      await AsyncStorage.removeItem("@viewedOnboarding");
    } catch (error) {
      console.log("Error removing Item @viewedOnboarding: ", error);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollViewContentContainer}
    >
      <View style={styles.carousel}>
        <Text style={styles.carouselTitleText}>This Week's Special Offers</Text>
        <Carousel
          data={carouselData}
          renderItem={({ item }) => (
            <View style={{ backgroundColor: "red", height: 150 }}>
              <Text>{item.title}</Text>
            </View>
          )}
          sliderWidth={SCREEN_WIDTH * 0.8}
          itemWidth={SCREEN_WIDTH * 0.6}
        />
      </View>
      <Text>HomeScreen</Text>
      <Button
        icon={() => <Entypo name="clapperboard" size={24} color="#9343c9" />}
        mode="outlined"
        onPress={() => clearOnboarding()}
      >
        Clear Onboarding State
      </Button>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  carousel: {
    padding: 35,
    alignItems: "center",
  },
  scrollViewContentContainer: {
    flex: 1,
    padding: 15,
  },
  carouselTitleText: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 10,
  },
});
