import * as React from "react";
import { StyleSheet, View, Text } from 'react-native';
import LineUpdates from './LineUpdates';
const allStations = require("../../MTA/stations");

export default function Favorites() {
  const favStations = ["comp07", "M14", "251"];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My favorites</Text>
      {
        favStations.map(stationId => {
          return (
            <View style={styles.stationContainer}>
              <Text key={`stationName-${stationId}`} style={styles.station}>
                {allStations[stationId].stop_name}
              </Text>
              <LineUpdates numUpdates={6} key={`stationUpdates-${stationId}`} station={stationId} line={null} direction={'NS'}/>
            </View>
          )
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "start",
    justifyContent: "start",
  },
  header: {
    color: "#eeff00",
    fontSize: 20,
    fontFamily: "Courier New",
    fontWeight: "bold",
    textAlign: "left",
    textTransform: "uppercase",
    paddingVertical: "5%",
  },
  stationContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: "4%",
    paddingTop: "1%",
    paddingBottom: "3%",
    backgroundColor: "#000",
    color: "#00ffff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",

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
    marginVertical: "1%",
  },
})