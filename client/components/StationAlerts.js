import React, { useState, useEffect } from "react";
import { Platform, StyleSheet, Text, View, Dimensions } from "react-native";
import { useQuery, gql } from "@apollo/client";

const STATION_ALERTS = gql `
  query StationAlert(
    $stationId: String!
  ) {
    elevatorAlert(stationId: $stationId){
      station
      borough
      trainno
      equipment
      equipmenttype
      serving
      ADA
      outagedate
      estimatedreturntoservice
      reason
      isupcomingoutage
      ismaintenanceoutage
    }
  }
`

export default function StationAlerts( {station}) {
  const [alerts, setAlerts] = useState([]);
  
  const { data, loading, error } = useQuery(STATION_ALERTS, {
    variables: { stationId: station }
  })

  if(loading) return <Text>Loading . . .</Text>
  if(error) console.log('Error ', error)

  return (
    <View style={styles.alertsContainer}>

      {loading ? (<Text>Loading ...</Text>)
        : error? (<Text>Error: {error.message}</Text>)
        :
        (data.elevatorAlert
          .map((alert) => (
        <View key={alert.equipment}>
          <Text style={styles.alert}>
            {alert.equipmenttype === "ES" ? "Escalator" : "Elevator"} outage:
          </Text>
          <Text>{alert.serving}</Text>
        </View>
      )))}
    </View>
  );
}

const styles = StyleSheet.create({
  alertsContainer: {
    backgroundColor: "#fff",
    padding: "2%",
    color: "#00ffff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
  },
  alert: {
    fontWeight: "bold",
  },
});
