import React, { useState, useEffect } from "react";
import { StyleSheet, Button, Text, View, Pressable } from "react-native";
import { lineColor } from "../../MTA/data";
import LineUpdates from "./LineUpdates";
import ServiceAlert from "./ServiceAlert";
const allStations = require("../../MTA/stations");
import { selectLine } from "../store";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

function Lines(props) {
  const [selectedLine, setSelectedLine] = useState(null);
  const [favStation, setFavStation] = useState(null);

  useEffect(() => {
    setSelectedLine(props.lines.length > 1 ? null : props.lines[0]);
    props.selectLine(props.lines.length > 1 ? "" : props.lines[0]);
  }, [props.station]);

  useEffect(() => {
    setFavStation(null);
  });

  return (
    <>
      <View style={styles.stationHeading}>
        <Text style={styles.station}>
          {allStations[props.station].stop_name}
        </Text>
        <Button
          style={styles.heart}
          title="♡"
          color="#eeff00"
          onPress={() => setFavStation}
        />
      </View>

      <View style={styles.linesContainer}>
        {props.lines.length > 1 ? (
          <Pressable
            key={`all-${props.station}`}
            onPress={() => {
              setSelectedLine(null);
              props.selectLine("");
            }}
            style={({ pressed }) => [
              {
                transform: pressed ? [{ scale: 0.9 }] : [{ scale: 1.0 }],
              },
            ]}
          >
            <View
              style={getColor(lineColor["all"], selectedLine === "all").circle}
            >
              <Text style={styles.line}>all</Text>
            </View>
          </Pressable>
        ) : null}
        {props.lines.map((line) => (
          <Pressable
            key={line + props.station}
            onPress={() => {
              setSelectedLine(line);
              props.selectLine(line);
            }}
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
      <LineUpdates
        line={selectedLine}
        station={props.station}
        direction={"NS"}
      />
      {/* <ServiceAlert line={selectedLine} station={props.station} /> */}
    </>
  );
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      selectLine,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Lines);

const styles = StyleSheet.create({
  stationHeading: {
    display: "flex",
    flexDirection: "row",
    marginTop: "4%",
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
    paddingTop: "1%",
    paddingBottom: "4%",
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
  heart: {
    backgroundColor: "#222",
    color: "#eeff00",
  },
  station: {
    width: "90%",
    backgroundColor: "#222",
    color: "#eeff00",
    fontSize: 17,
    fontFamily: "Courier New",
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    margin: "0%",
    paddingVertical: "1%",
    paddingHorizontal: "3%",
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
