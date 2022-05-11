import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View } from "react-native";
import Map from "./client/components/Map";
import NavBar from "./client/components/NavBar";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache,
  uri: 'http://localhost:4000'
});

client
      .query({
          query: gql`
            query {
              arrivalTimes(stationId:"106", train:"1", direction:"s"){
                nextArrivals{
                  arrivalTime
                }
              }
            }
          `
      })
      .then(result =>
        {
          console.log('graphQL contact made')
          console.log(result)
        })


export default function App() {
  return (
    <View style={styles.container}>
      <ApolloProvider client={client}>
        <Map />
        <NavBar />
        {/* <StatusBar style="auto" /> */}
        {/* <Text>Hello</Text> */}
      </ApolloProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    color: "#00ffff",
    margin: "10%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
