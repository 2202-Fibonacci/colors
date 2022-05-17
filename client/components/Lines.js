import React, { useState, useEffect } from "react";
import { Platform, StyleSheet, Text, View, Pressable } from "react-native";
import { lineColor } from "../../MTA/data";
import LineUpdates from "./LineUpdates";
import ServiceAlert from "./ServiceAlert";
const allStations = require("../../MTA/stations");

export default function Lines(props) {
  const [selectedLine, setSelectedLine] = useState(null);

  useEffect(() => {
    setSelectedLine(null);
  }, [props.station]);

  return (
    <>
      <View style={styles.stationHeading}>
        <Text style={styles.station}>{allStations[props.station].stop_name}</Text>
      </View>

      <View style={styles.linesContainer}>

        <Pressable
          key={`all-${props.station}`}
          onPress={() => setSelectedLine(null)}
          style={({ pressed }) => [
            {
              transform: pressed ? [{ scale: 0.9 }] : [{ scale: 1.0 }],
            },
          ]}
        >
          <View style={getColor(lineColor['all'], selectedLine === 'all').circle}>
            <Text style={styles.line}>all</Text>
          </View>
        </Pressable>

        {props.lines.map((line) => (
          <Pressable
            key={line + props.station}
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
      <LineUpdates line={selectedLine} station={props.station} direction={'NS'}/>
      <ServiceAlert line={selectedLine} />
    </>
  );
}

const styles = StyleSheet.create({
  stationHeading: {
    display: "flex",
    flexDirection: "row",
    marginTop: "10%",
    paddingTop: "1%",
    paddingBottom: "3%",
    backgroundColor: "#000",
    color: "#00ffff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    
  },
  linesContainer: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: "1%",
    backgroundColor: "#000",
    color: "#00ffff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  line: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,

  },
  station: {
    width: "95%",
    backgroundColor: "#222",
    color: "#eeff00",
    fontSize: 17,
    fontFamily: "Courier New",
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    // borderWidth: 1,
    // borderColor: "#eeff00",
    paddingVertical: "1%",
    paddingHorizontal: "3%"
  },
});

const getColor = (color, selected) =>
  StyleSheet.create({
    circle: {
      height: 26,
      width: 26,
      borderRadius: 15,
      backgroundColor: "#000",
      borderColor: color,
      borderWidth: "3",
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
