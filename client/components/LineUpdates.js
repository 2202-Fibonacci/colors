import React, { useState, useEffect } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

export default function LineUpdates(props) {
  // need hook to get arrival times
  //   useEffect(() => {
  //     (async () => {
  //       let arrivalTimes = await getArrivalTimes(props.station, props.line);
  //     })();
  //   }, []);

  return (
    <View style={styles.updatesContainer}>
      <Text>The {props.line} train will arrive in 5 minutes</Text>
      <Text>The {props.line} train will arrive in 8 minutes</Text>
      <Text>The {props.line} train will arrive in 12 minutes</Text>
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
