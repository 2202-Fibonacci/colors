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
      <Text>The next {props.line} train will arrive in 5 minutes</Text>
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
    borderWidth: 1,
  },
});
