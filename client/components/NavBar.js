import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function NavBar() {
  return (
    <View style={styles.navContainer}>
      <Pressable
        style={({ pressed }) => [
          {
            transform: pressed ? [{ scale: 0.9 }] : [{ scale: 1.0 }],
          },
        ]}
      >
        <Image style={styles.icon} source={require("../../assets/home.png")} />
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          {
            transform: pressed ? [{ scale: 0.9 }] : [{ scale: 1.0 }],
          },
        ]}
      >
        <Image
          style={styles.icon}
          source={require("../../assets/escalator.png")}
        />
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          {
            transform: pressed ? [{ scale: 0.9 }] : [{ scale: 1.0 }],
          },
        ]}
      >
        <Image
          style={styles.icon}
          source={require("../../assets/paper-plane.png")}
        />
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          {
            transform: pressed ? [{ scale: 0.9 }] : [{ scale: 1.0 }],
          },
        ]}
      >
        <Image style={styles.icon} source={require("../../assets/user.png")} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#222",
    paddingHorizontal: "10%",
    paddingTop: "2%",
    paddingBottom: "4%",
    color: "#00ffff",
    width: Dimensions.get("window").width,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  icon: {
    height: 28,
    width: 28,
  },
});
