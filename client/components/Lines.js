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
    marginTop: "10%",
    padding: "5%",
    backgroundColor: "#fff",
    color: "#00ffff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
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
