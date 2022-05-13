import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Map from "./client/components/Map";
import NavBar from "./client/components/NavBar";
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
    backgroundColor: "#fff",
    color: "#00ffff",
    margin: "0%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
