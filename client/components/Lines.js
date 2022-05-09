import React, { useState, useEffect } from "react";
import { Platform, StyleSheet, Text, View, Dimensions } from "react-native";
import { lineColor } from "../../MTA/data";

export default function Lines(props) {
  return (
    <View style={styles.linesContainer}>
      {props.lines.map((line) => (
        <View style={getColor(lineColor[line]).circle}>
          <Text style={styles.line}>{line}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  linesContainer: {
    display: "flex",
    flexDirection: "row",
    flex: 0.4,
    backgroundColor: "#fff",
    borderWidth: 2,
    color: "#00ffff",
    margin: "10%",
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width,
  },
  line: {
    color: "white",
    fontWeight: "bold",
  },
});

const getColor = (color) =>
  StyleSheet.create({
    circle: {
      height: 30,
      width: 30,
      borderRadius: 15,
      backgroundColor: color,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "1%",
    },
  });
