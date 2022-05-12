import React, { useState, useEffect } from "react";
import { Platform, StyleSheet, Text, View, Pressable } from "react-native";
import { lineColor } from "../../MTA/data";
import LineUpdates from "./LineUpdates";
import StationAlerts from "./StationAlerts"

export default function Lines(props) {
  const [selectedLine, setSelectedLine] = useState(null);

  useEffect(() => {
    if (!props.lines.includes(selectedLine)) {
      setSelectedLine(props.lines[0]);
    }
  });

  return (
    <>
      <View style={styles.linesContainer}>
        {props.lines.map((line) => (
          <Pressable
            key={line}
            onPress={() => setSelectedLine(line)}
            style={({ pressed }) => [
              {
                transform: pressed ? [{ scale: 0.9 }] : [{ scale: 1.0 }],
              },
            ]}
          >
            <View
              style={getColor(lineColor[line], selectedLine === line).circle}
            >
              <Text style={styles.line}>{line}</Text>
            </View>
          </Pressable>
        ))}
      </View>
      <LineUpdates line={selectedLine} station={props.station} />
      <StationAlerts line={selectedLine} />
    </>
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

const getColor = (color, selected) =>
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
      opacity: selected ? 1 : 0.8,
      shadowColor: selected ? "#171717" : "white",
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
  });
