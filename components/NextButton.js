import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { G, Circle } from "react-native-svg";

export default function NextButton() {
  const size = 128;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <Circle stroke="#E6E7E8" cx={center} cy={radius} strokeWidth={strokeWidth} />
        <Circle stroke="#F4338F" cx={center} cy={radius} r={radius} strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={circumference - (circumference * 33) / 100}/>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
