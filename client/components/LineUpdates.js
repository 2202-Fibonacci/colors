import React, { useState, useEffect } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { useQuery, gql } from "@apollo/client";
// import { allStations } from "../../MTA/stations";
const allStations = require("../../MTA/stations");

const NEXT_ARRIVALS = gql`
  query ArrivalsQuery(
    $stationId: String!
    $train: String!
    $direction: String
  ) {
    arrivalTimes(stationId: $stationId, train: $train, direction: $direction) {
      routeId,
      nextArrivals {
        tripId
        direction
        arrivalTime
      }
    }
  }
`;

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

const maxUpdates = 3;

export default function LineUpdates({ station, line }) {
  // hook to get arrival data
  // const { data, loading, error, refetch } = useQuery(NEXT_ARRIVALS, {
  //   variables: { stationId: station, train: line } /*, direction: "N" */,
  //   pollInterval: 1000,
  // });
  const { data, loading, error, refetch } = useQuery(STATION_UPDATE, {
    variables: { stationId: station }
  });

  // prevent refetch on first render by comparing with previous props
  useEffect(() => {
    refetch();
  }, [line]);

  const stationData = (data && data.stationUpdate) || [];

  const arrivalsList = stationData ? stationToArrivals(stationData) : [];

  return (
    <View style={styles.updatesContainer}>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error: {error.message}</Text>
      ) : (
        arrivalsList.map((arrival, i) => (
          i < maxUpdates ? (
            <Text style={styles.arrival} key={`${arrival.direction}${arrival.routeId}_${arrival.arrivalTime}`}>
              {" "}{arrival.routeId}{"  "}{arrival.directionLabel}
              {"                             ".slice(0, 30 - arrival.directionLabel.length)}
              {"  ".slice(0, arrival.arrivalTime > 9 ? 1 : 2)}{arrival.arrivalTime}{"m "}
            </Text>
          ) : null
        ))
      )}
    </View>
  );
}

const stationToArrivals = (stationData) => {
  /* take station data from query format and put into this format
  [ {routeId, arrival.time, direction label},... ]
  */
  let arrivalsList = [];
  for (let line=0; line<stationData.length; line++) {
    for (let arrival=0; arrival<stationData[line].nextArrivals.length; arrival++){
      const dir = stationData[line].nextArrivals[arrival].direction;
      const dirLabel = (dir === "N")
      ? allStations[stationData[line].stationId].north_label
      : allStations[stationData[line].stationId].south_label;
      if (dirLabel !== '') // get rid of stations arriving at terminal (and not going anywhere next)
        arrivalsList.push({
          routeId: stationData[line].routeId,
          arrivalTime: stationData[line].nextArrivals[arrival].arrivalTime,
          direction: dir,
          directionLabel: dirLabel,
        })
    }
  }
  const arrivalsSorted = arrivalsList.sort((arrivalA, arrivalB) => arrivalA.arrivalTime > arrivalB.arrivalTime);
  // console.log('SORTED ASS LIST sample:')
  // for (let i=0; i < Math.min(arrivalsSorted.length, 10); i++){
  //   if (arrivalsSorted[i])
  //   console.log(arrivalsSorted[i].routeId, '\t', arrivalsSorted[i].arrivalTime, '\t', arrivalsSorted[i].direction, '\t', arrivalsSorted[i].directionLabel);
  // }

  return arrivalsList.sort((arrivalA, arrivalB) => arrivalA.arrivalTime > arrivalB.arrivalTime);
}

const styles = StyleSheet.create({
  updatesContainer: {
    backgroundColor: "#000",
    paddingVertical: "4%",
    paddingHorizontal: "0%",
    color: "#00ffff",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  arrival: {
    backgroundColor: "#222",
    color: "#eeff00",
    fontSize: 16,
    fontFamily: "Courier New",
    fontWeight: "bold",
    textTransform: "uppercase",
    borderWidth: 1,
    borderColor: "#eeff00",
    paddingVertical: "1%",
  },
});

/* 
stationData.map((update) => (
          <Text style={styles.arrival}>{update.routeId}</Text>
        ))
*/

// data.arrivalTimes.nextArrivals.map((arrival, i) =>
// i < maxUpdates ? (
//   <Text style={styles.arrival} key={arrival.tripId}>
//     {" "}
//     {data.arrivalTimes.routeId} {"  "}
//     {arrival.direction === "N"
//       ? allStations[station].north_label
//       : allStations[station].south_label}
//     {"                             ".slice(
//       0,
//       30 -
//         (arrival.direction === "N"
//           ? allStations[station].north_label.length
//           : allStations[station].south_label.length)
//     )}
//     {"  ".slice(0, arrival.arrivalTime > 9 ? 1 : 2)}
//     {arrival.arrivalTime}
//     {"M "}
//   </Text>
// ) : null
// )
