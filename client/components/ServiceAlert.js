import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View} from "react-native";
import { useQuery, gql } from "@apollo/client";

const SERVICE_ALERT = gql `
    query ServiceAlert(
        $train: String!
    ) {
        serviceAlert(train: $train){
            routeId
            alerts {
                type
                text
                activePeriodText
            }
        }
    }
`;

const dummyData = [{
    type: 'No Midday Service',
    text: '[Z] trains do not run during midday',
    activePeriodText: 'Mon to Fri'
}]

export default function ServiceAlert({line}) {
    const { data, loading, error }  = useQuery(SERVICE_ALERT, {
        variables: {train: line}
    });

    // const serviceAlert = data["serviceAlert"]
    // const alerts = serviceAlert["alerts"]

    return (
        <View style={styles.updatesContainer}>
            {/* {loading ? (<Text>Loading...</Text>)
                : error ? (<Text>Error: {error.message}</Text>)
                : (alerts.map((alert)=>
                    <View key={alert.type}>
                        <Text style={styles.alert}>
                            {alert.type}{"\n"}
                            {alert.activePeriodText}{"\n"}
                            {alert.text}
                        </Text>
                    </View>
                    ))
        } */}
        </View>
    )
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