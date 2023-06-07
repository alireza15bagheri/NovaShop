import React, { useRef } from "react";
import { StyleSheet, SafeAreaView, FlatList, Animated } from "react-native";

import OnboardingItem from "../components/OnboardingItem";
import sliderData from "../src/data/SliderData";
import Paginator from "../components/Paginator";
import NextButton from "../components/NextButton";

const OnboardingScreen = () => {
  // keep track of which slide user is viewing:
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.container}>
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
      />
      <Paginator data={sliderData} scrollX={scrollX} />
      <NextButton />
    </SafeAreaView>
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
