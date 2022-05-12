import React, { useState, useEffect } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { useQuery, gql } from "@apollo/client";
import { allStations } from "../../MTA/stations";

const NEXT_ARRIVALS = gql`
  query ArrivalsQuery(
    $stationId: String!
    $train: String!
    $direction: String
  ) {
    arrivalTimes(stationId: $stationId, train: $train, direction: $direction) {
      routeId
      nextArrivals {
        tripId
        direction
        arrivalTime
      }
    }
  }
`;

const maxUpdates = 3;

export default function LineUpdates({ station, line }) {
  // hook to get arrival data
  const { data, loading, error, refetch } = useQuery(NEXT_ARRIVALS, {
    variables: { stationId: station, train: line }, /*, direction: "N" */
    pollInterval: 1000,
  });

  // prevent refetch on first render by comparing with previous props
  useEffect(() => {
    refetch();
  }, [line]);

  return (
    <View style={styles.updatesContainer}>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error: {error.message}</Text>
      ) : (
        data.arrivalTimes.nextArrivals.map((arrival, i) =>
          i < maxUpdates ? (
            <Text style={styles.arrival} key={arrival.tripId}>
              {" "}{data.arrivalTimes.routeId} {"  "}
              {arrival.direction === "N"
                ? allStations[station].north_label
                : allStations[station].south_label}
                {"                             ".slice(0, 30 - (arrival.direction === "N"
                ? allStations[station].north_label.length
                : allStations[station].south_label.length ))}
              {"  ".slice(0, (arrival.arrivalTime > 9 ? 1 :2))}{arrival.arrivalTime}{"M "}
            </Text>
          ) : null
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  updatesContainer: {
    backgroundColor: "#000",
    paddingVertical: "4%",
    paddingHorizontal: "0%",
    color: "#00ffff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
  },
  arrival: {
    backgroundColor: "#222",
    color: "#eeff00",
    fontSize: "16",
    fontFamily: "Courier New",
    fontWeight: "bold",
    textTransform: "uppercase",
    borderWidth: "1",
    borderColor: "#eeff00",
    paddingVertical: "1%",
  }
});
