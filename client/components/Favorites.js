import * as React from "react";
import { StyleSheet, View, Text, ScrollView, Pressable } from "react-native";
import LineUpdates from "./LineUpdates";
import ElevatorModal from "./ElevatorModal";
const allStations = require("../../MTA/stations");
import { connect } from "react-redux";
import { removeFavorite } from "../store";

function Favorites(props) {
  const { favorites, removeFavorite } = props;
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
              <View style={styles.heading}>
                <Text style={styles.station}>
                  {allStations[stationId].stop_name}
                </Text>
                <Pressable
                  style={styles.button}
                  onPress={() => removeFavorite(stationId)}
                >
                  <Text style={styles.buttonText}>X</Text>
                </Pressable>
              </View>
              <ElevatorModal stationId={stationId} />
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

const mapDispatchToProps = (dispatch) => ({
  removeFavorite: (stationId) => dispatch(removeFavorite(stationId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "start",
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
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
    height: 30,
  },
  button: {
    width: "10%",
    backgroundColor: "#333",
    paddingVertical: "1%",
    marginVertical: "1%",
    height: 30,
  },
  buttonText: {
    color: "#eeff00",
    fontSize: 17,
    fontFamily: "Courier New",
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    paddingVertical: "1%",
    marginVertical: "1%",
  },
});
