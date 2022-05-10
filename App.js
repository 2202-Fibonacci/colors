import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View } from "react-native";
import Map from "./client/components/Map";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  gql,
} from "@apollo/client";

const httpLink= createHttpLink({
  uri: 'http://localhost:4000'
});

const client = new ApolloClient({
  cache: new InMemoryCache,
  link: httpLink,
});

client
      .query({
          query: gql`
              query {
    	          stationInfo(stationId:"101"){
                  name
                    }
                  }
          `
      })
      .then(result => console.log(result))


export default function App() {
  return (
    <View style={styles.container}>
      {/* <StatusBar style="auto" /> */}
      <ApolloProvider client={client}>
        <Map />
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
