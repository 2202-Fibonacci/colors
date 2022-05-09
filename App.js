import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View } from "react-native";
import Map from "./client/components/Map";
import Lines from "./client/components/Lines";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <StatusBar style="auto" /> */}
      <Map />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    color: "#00ffff",
    margin: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
});
