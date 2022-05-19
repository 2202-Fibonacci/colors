import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useQuery, gql } from "@apollo/client";
import { v4 as uuid } from "uuid";

const SERVICE_ALERT = gql`
  query ServiceAlert($train: String!, $onlyActive: Boolean) {
    serviceAlert(train: $train, onlyActive: $onlyActive) {
      routeId
      alerts {
        type
        text
        activePeriodText
      }
    }
  }
`;

export default function ServiceAlert({ line, station }) {
  const { data, loading, error } = useQuery(SERVICE_ALERT, {
    variables: { train: line, onlyActive: true },
  });

  if (!line || (data && data.serviceAlert.alerts.length === 0))
    return <Text style={styles.update}>No current alerts</Text>;

  return (
    <View style={styles.updatesContainer}>
      {loading || error
        ? null
        : data.serviceAlert.alerts.map((alert, i) => (
            <View key={i + station}>
              <Text style={styles.type}>{alert.type}:</Text>
              <Text style={styles.update}>{alert.text}</Text>
              {alert.activePeriodText ? (
                <Text style={styles.updatePeriod}>
                  {alert.activePeriodText}
                </Text>
              ) : null}
            </View>
          ))}
    </View>
  );
}

const styles = StyleSheet.create({
  updatesContainer: {
    backgroundColor: "#000",
    padding: "2%",
    color: "#eeff00",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
  },
  type: {
    fontWeight: "bold",
    color: "#eeff00",
    marginBottom: "2%",
  },
  update: {
    fontWeight: "normal",
    color: "#eeff00",
  },
  updatePeriod: {
    color: "#eeff00",
    // fontSize: 10,
  },
});
