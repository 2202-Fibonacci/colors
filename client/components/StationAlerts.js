import React, { useState, useEffect } from "react";
import { Platform, StyleSheet, Text, View, Dimensions } from "react-native";
// import { getElevatorAlerts } from "../../MTA/elevatorAlerts";

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

export default function StationAlerts(props) {
  const [alerts, setAlerts] = useState([]);
  //   make hook to get station alerts for props.station

  //   useEffect(() => {
  //     (async () => {
  //       // get elevator/escalator alerts for the selected station
  //       let alerts = await getElevatorAlerts(props.station);
  //       setAlerts(alerts);
  //     })();
  //   }, []);

  return (
    <View style={styles.alertsContainer}>
      {dummyData.map((alert) => (
        <View key={alert.equipment}>
          <Text style={styles.alert}>
            {alert.equipmenttype === "ES" ? "Escalator" : "Elevator"} outage:
          </Text>
          <Text>{alert.serving}</Text>
        </View>
      ))}
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
    borderWidth: 1,
  },
  alert: {
    fontWeight: "bold",
  },
});
