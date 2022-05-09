import React, { useState, useEffect } from "react";
import { Platform, StyleSheet, Text, View, Pressable } from "react-native";
import { lineColor } from "../../MTA/data";

export default function Lines(props) {
  const [selectedLine, setSelectedLine] = useState(null);

  useEffect(() => {
    if (!props.lines.includes(selectedLine)) {
      setSelectedLine(props.lines[0]);
    }
  });

  return (
    <View style={styles.linesContainer}>
      <Text>{selectedLine}</Text>
      {props.lines.map((line) => (
        <Pressable key={line} onPress={() => setSelectedLine(line)}>
          <View style={getColor(lineColor[line]).circle}>
            <Text style={styles.line}>{line}</Text>
          </View>
        </Pressable>
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
