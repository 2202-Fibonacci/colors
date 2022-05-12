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

const dummyData = [
  {
    station: "Atlantic Av-Barclays Ctr",
    borough: "BKN",
    trainno: "B/D/N/Q/R/2/3/4/5/LIRR",
    equipment: "ES358X",
    equipmenttype: "ES",
    serving:
      "Barclays Center plaza (SE corner of Atlantic Ave & Flatbush Ave) to mezzanine for B/Q service and access to Manhattan-bound 2/3, 4/5, and rest of complex",
    ADA: "N",
    outagedate: "05/05/2022 03:00:00 PM",
    estimatedreturntoservice: "05/09/2022 11:00:00 PM",
    reason: "Repair",
    isupcomingoutage: "N",
    ismaintenanceoutage: "N",
  },
];

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
    padding: "4%",
    color: "#00ffff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
  },
  alert: {
    fontWeight: "bold",
  },
});
