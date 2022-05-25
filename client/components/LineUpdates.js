import React, { useState, useEffect } from "react";
import { Platform, StyleSheet, Text, View, Pressable } from "react-native";
import { useQuery, gql } from "@apollo/client";
const allStations = require("../../MTA/stations");

const STATION_UPDATE = gql`
  query StationQuery($stationId: String!) {
    stationUpdate(stationId: $stationId) {
      routeId
      stationId
      nextArrivals {
        tripId
        direction
        arrivalTime
      }
    }
  }
`;

export default function LineUpdates({ station, line, direction, numUpdates }) {
  const { data, loading, error, refetch } = useQuery(STATION_UPDATE, {
    variables: { stationId: station },
    pollInterval: 5000,
  });
  const [selectedDir, setSelectedDir] = useState(null);

  const maxUpdates = numUpdates || 3;

  useEffect(() => {
    setSelectedDir("NS");
  }, [direction]);

  // prevent refetch on first render by comparing with previous props
  useEffect(() => {
    refetch();
  }, [line]);

  const stationData = (data && data.stationUpdate) || [];

  let arrivalsList = stationData ? stationToArrivals(stationData) : [];
  if (line) {
    arrivalsList = arrivalsList.filter((arrival) => arrival.routeId === line);
  }

  return (
    <>
      <View style={styles.updatesContainer}>
        {loading ? (
          <View style={styles.arrivalContainer}>
            <Text style={styles.arrivalLoading}>Loading...</Text>
          </View>
        ) : error ? (
          <Text>Error: {error.message}</Text>
        ) : (
          arrivalsList
            .filter((arrival) =>
              selectedDir === "NS"
                ? arrival
                : arrival.direction === selectedDir
                ? arrival
                : null
            )
            .map((arrival, i) =>
              i < maxUpdates ? (
                <View
                  style={styles.arrivalContainer}
                  key={`${arrival.stationId}_${arrival.routeId}_${
                    line ? line : "all"
                  }_${i}`}
                >
                  <Text
                    style={styles.arrivalLeft}
                    key={`LINE${arrival.stationId}-${arrival.direction}${arrival.routeId}_${arrival.arrivalTime}`}
                  >
                    {" "}
                    {arrival.routeId}{" "}
                  </Text>
                  <Text
                    style={styles.arrivalCenter}
                    key={`LABEL${arrival.stationId}-${arrival.direction}${arrival.routeId}_${arrival.arrivalTime}`}
                  >
                    {" "}
                    {arrival.directionLabel}
                  </Text>
                  <Text
                    style={styles.arrivalRight}
                    key={`TIME${arrival.stationId}-${arrival.direction}${arrival.routeId}_${arrival.arrivalTime}`}
                  >
                    {"  ".slice(0, arrival.arrivalTime / 60 > 9 ? 1 : 2)}
                    {arrival.arrivalTime < 60
                      ? "<1"
                      : Math.round(arrival.arrivalTime / 60)}
                    {"M"}
                  </Text>
                </View>
              ) : null
            )
        )}
      </View>
      <View style={styles.directionsContainer}>
        <Pressable
          key={`${station}_${line ? line : "all"}-setNorth`}
          onPress={() => setSelectedDir("N")}
          style={({ pressed }) => [
            { transform: pressed ? [{ scale: 0.9 }] : [{ scale: 1.0 }] },
          ]}
        >
          <View style={styles.button}>
            <Text style={styles.buttonTxt}>
              {allStations[station].north_label}
            </Text>
          </View>
        </Pressable>
        <Pressable
          key={`${station}_${line ? line : "all"}-setBoth`}
          onPress={() => setSelectedDir("NS")}
          style={({ pressed }) => [
            { transform: pressed ? [{ scale: 0.9 }] : [{ scale: 1.0 }] },
          ]}
        >
          <View style={styles.button}>
            <Text style={styles.buttonArrow}>⇆</Text>
          </View>
        </Pressable>
        <Pressable
          key={`${station}_${line ? line : "all"}-setSouth`}
          onPress={() => setSelectedDir("S")}
          style={({ pressed }) => [
            { transform: pressed ? [{ scale: 0.9 }] : [{ scale: 1.0 }] },
          ]}
        >
          <View style={styles.button}>
            <Text style={styles.buttonTxt}>
              {allStations[station].south_label}
            </Text>
          </View>
        </Pressable>
      </View>
    </>
  );
}

const stationToArrivals = (stationData) => {
  /* take station data from query format and put into this format
  [ {routeId, arrival.time, direction label},... ]
  */
  let arrivalsList = [];
  for (let line = 0; line < stationData.length; line++) {
    const maxArrivals =
      stationData[line] && stationData[line].nextArrivals
        ? stationData[line].nextArrivals.length
        : 0;
    for (let arrival = 0; arrival < maxArrivals; arrival++) {
      const dir = stationData[line].nextArrivals[arrival].direction;
      const dirLabel =
        dir === "N"
          ? allStations[stationData[line].stationId].north_label
          : allStations[stationData[line].stationId].south_label;
      if (dirLabel !== "")
        // get rid of stations arriving at terminal (and not going anywhere next)
        arrivalsList.push({
          stationId: stationData[line].stationId,
          routeId: stationData[line].routeId,
          arrivalTime: stationData[line].nextArrivals[arrival].arrivalTime,
          direction: dir,
          directionLabel: dirLabel,
        });
    }
  }

  return arrivalsList.sort(
    (arrivalA, arrivalB) => arrivalA.arrivalTime > arrivalB.arrivalTime
  );
};

const styles = StyleSheet.create({
  updatesContainer: {
    minHeight: 100,
    backgroundColor: "#000",
    paddingBottom: "0%",
    paddingHorizontal: "0%",
    color: "#00ffff",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  hidden: {
    backgroundColor: "#222",
    color: "#222",
    fontSize: 16,
    fontFamily: "Courier New",
    fontWeight: "bold",
    textAlign: "left",
    textTransform: "uppercase",
    paddingVertical: "1%",
  },
  loadingContainer: {
    width: "95%",
    minWidth: "95%",
    backgroundColor: "#000",
    paddingHorizontal: "0%",
    marginVertical: "0.5%",
    color: "#00ffff",
    display: "flex",
    flexDirection: "column",
  },
  arrivalLoading: {
    flex: 1,
    backgroundColor: "#222",
    color: "#eeff00",
    fontSize: 16,
    fontFamily: "Courier New",
    fontWeight: "bold",
    textAlign: "left",
    textTransform: "uppercase",
    paddingVertical: "1%",
    width: "100%",
  },
  arrivalContainer: {
    width: "100%",
    // minWidth: "95%",
    backgroundColor: "#000",
    paddingHorizontal: "0%",
    marginVertical: "0.5%",
    color: "#00ffff",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  arrivalLeft: {
    backgroundColor: "#222",
    color: "#eeff00",
    fontSize: 16,
    fontFamily: "Courier New",
    fontWeight: "bold",
    textAlign: "left",
    textTransform: "uppercase",
    paddingVertical: "1%",
  },
  arrivalCenter: {
    flexGrow: 1,
    backgroundColor: "#222",
    color: "#eeff00",
    fontSize: 16,
    fontFamily: "Courier New",
    fontWeight: "bold",
    textAlign: "left",
    textTransform: "uppercase",
    paddingVertical: "1%",
  },
  arrivalRight: {
    backgroundColor: "#222",
    color: "#eeff00",
    fontSize: 16,
    fontFamily: "Courier New",
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "right",
    paddingVertical: "1%",
    paddingRight: "3%",
  },
  directionsContainer: {
    backgroundColor: "#000",
    paddingHorizontal: "0%",
    paddingTop: "0%",
    paddingBottom: "3%",
    color: "#00ffff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#000",
    borderRadius: "15",
    paddingHorizontal: "1%",
  },
  buttonArrow: {
    fontSize: 30,
    color: "#eeff00",
  },
  buttonTxt: {
    color: "#eeff00",
    fontSize: 12,
    fontFamily: "Courier New",
    fontWeight: "bold",
  },
});
