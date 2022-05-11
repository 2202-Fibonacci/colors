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
  const { data, loading, error } = useQuery(NEXT_ARRIVALS, {
    variables: { stationId: station, train: line, direction: "N" },
    pollInterval: 1000,
  });

  return (
    <View style={styles.updatesContainer}>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error: {error.message}</Text>
      ) : (
        data.arrivalTimes.nextArrivals.map((arrival, i) =>
          i < maxUpdates ? (
            <Text key={arrival.tripId}>
              The {data.arrivalTimes.routeId} to{" "}
              {arrival.direction === "N"
                ? allStations[station].north_label
                : allStations[station].south_label}{" "}
              arrives in {arrival.arrivalTime}{" "}
              {arrival.arrivalTime === 1 ? "min" : "mins"}
            </Text>
          ) : null
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  updatesContainer: {
    backgroundColor: "#fff",
    padding: "4%",
    color: "#00ffff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
  },
});
