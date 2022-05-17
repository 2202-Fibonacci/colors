import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Map from "./client/components/Map";
import NavBar from "./client/components/NavBar";
import {LogBox} from "react-native";
import Login from "./client/components/Login"
import MainContainer from "./client/components/MainContainer"


LogBox.ignoreLogs([
"exported from 'deprecated-react-native-prop-types'.",
])

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000",
});

export default function App() {
  return (
    // <View style={styles.container}>
      <ApolloProvider client={client}>
        <MainContainer />
        {/* <Map />
        <Login />
        <NavBar /> */}
        <StatusBar style="dark" />
      </ApolloProvider>
    // </View>
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
