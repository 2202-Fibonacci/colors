import React, { useState, useEffect } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { useQuery, gql } from "@apollo/client";

const NEXT_ARRIVALS = gql`
  query ArrivalsQuery(
    $stationId: String!
    $train: String!
    $direction: String
  ) {
    arrivalTimes(stationId: $stationId, train: $train, direction: $direction) {
      nextArrivals {
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
    variables: { stationId: station, train: line, direction: "S" },
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
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
            <Text key={arrival.arrivalTime}>
              The {arrival.direction}-bound {line} train will arrive in{" "}
              {arrival.arrivalTime} minutes
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
