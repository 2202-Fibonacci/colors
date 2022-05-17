import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useQuery, gql } from "@apollo/client";

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

export default function ServiceAlert({ line }) {
  const { data, loading, error } = useQuery(SERVICE_ALERT, {
    variables: { train: line, onlyActive: true },
  });

  if (!line || (data && data.serviceAlert.alerts.length === 0)) return null;

  return (
    <View style={styles.updatesContainer}>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error: {error.message}</Text>
      ) : (
        data.serviceAlert.alerts.map((alert, i) => (
          <Text key={i}>
            {alert.type}: {alert.text} ({alert.activePeriodText})
          </Text>
        ))
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
