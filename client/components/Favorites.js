import * as React from "react";
import { StyleSheet, View, Text, ScrollView, Button } from "react-native";
import LineUpdates from "./LineUpdates";
const allStations = require("../../MTA/stations");
import { connect } from "react-redux";

function Favorites({ favorites }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>My favorites</Text>
      <ScrollView>
        {favorites.map((stationId) => {
          return (
            <View
              style={styles.stationContainer}
              key={`stationUpdates-${stationId}`}
            >
              <Text style={styles.station}>
                {allStations[stationId].stop_name}
              </Text>
              <LineUpdates
                numUpdates={6}
                station={stationId}
                line={null}
                direction={"NS"}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const mapStateToProps = (state) => ({
  favorites: state.favorites,
});

export default connect(mapStateToProps)(Favorites);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
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
    // marginTop: "4%",
    // paddingTop: "1%",
    marginBottom: "2%",
    backgroundColor: "#000",
    color: "#00ffff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  station: {
    width: "90%",
    backgroundColor: "#333",
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
});
