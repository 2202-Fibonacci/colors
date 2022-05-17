import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Map from "./client/components/Map";
import NavBar from "./client/components/NavBar";
import { LogBox } from "react-native";
import Constants from "expo-constants";

LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  gql,
} from "@apollo/client";

console.log("NODE_ENV", process.env.NODE_ENV);
console.log("PORT", process.env.PORT);
console.log("API_URL", Constants.manifest.extra.API_URL);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: Constants.manifest.extra.API_URL,
});

export default function App() {
  return (
    <View style={styles.container}>
      <ApolloProvider client={client}>
        <Map />
        <NavBar />
        <StatusBar style="dark" />
      </ApolloProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    color: "#00ffff",
    margin: "0%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
