import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useQuery, gql } from "@apollo/client";
import {v4 as uuid } from "uuid";

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

  if (!line || (data && data.serviceAlert.alerts.length === 0)) return null;

  return (
    <View style={styles.updatesContainer}>
      {loading ? (
        <>
          <Text style={styles.update}>Loading...</Text>
          <Text style={styles.hidden}>Loading...</Text>
          <Text style={styles.hidden}>Loading...</Text>
        </>
      ) : error ? (
        <Text>Error: {error.message}</Text>
      ) : (
        data.serviceAlert.alerts.map((alert, i) => (
          <>
            <Text key={`update-${station}_${i}_main`} style={styles.update}>
              {alert.type}{':\n'}{alert.text}
            </Text>
            <Text key={`update-${station}_${i}_period`} style={styles.updatePeriod}>
              {alert.activePeriodText}{"\n"}
            </Text>
          </>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  updatesContainer: {
    backgroundColor: "#000",
    paddingHorizontal: "4%",
    paddingVerical: "1%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
  },
  update: {
    color: "#eeff00",
    fontSize: 12,
  },
  hidden: {
    color: "#000",
    fontSize: 12,
  },
  updatePeriod: {
    color: "#eeff00",
    fontSize: 10,
  }
});
