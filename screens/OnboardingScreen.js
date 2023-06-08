import React, { useRef, useState } from "react";
import { StyleSheet, View, FlatList, Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import OnboardingItem from "../components/OnboardingItem";
import sliderData from "../src/data/SliderData";
import Paginator from "../components/Paginator";
import NextButton from "../components/NextButton";

const OnboardingScreen = ({ navigation }) => {
  // keep track of which slide user is viewing:
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  let viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = async () => {
    if (currentIndex < sliderData.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      try {
        await AsyncStorage.setItem("@viewedOnboarding", "true");
        navigation.navigate("Home");
      } catch (err) {
        console.log("Error @setItem: ", err);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={sliderData}
          renderItem={({ item, index }) => {
            return <OnboardingItem item={item} index={index} />;
          }}
          keyExtractor={(item) => item.id}
          scrollEventThrottle={32} // 16 is the default value
          horizontal={true}
          bounces={false}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <Paginator data={sliderData} scrollX={scrollX} />
      <NextButton
        scrollTo={scrollTo}
        percentage={(currentIndex + 1) * (100 / sliderData.length)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFF",
  },
});

export default OnboardingScreen;
