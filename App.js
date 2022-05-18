import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Map from "./client/components/Map";
import NavBar from "./client/components/NavBar";
import { LogBox } from "react-native";
import Constants from "expo-constants";
import Login from "./client/components/Login";
import User from "./client/components/User";
// import MainContainer from "./client/components/MainContainer";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: Constants.manifest.extra.API_URL,
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
    <View style={styles.container}>
        <View style={styles.statusBar}>
          <StatusBar style="light" />
        </View>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Map" component={Map} options={{headerShown: false}} />
            <Stack.Screen name="User" component={User} options={{headerShown: false}} />
          </Stack.Navigator>
          <NavBar />
        </NavigationContainer>
        {/* <MainContainer /> */}

        {/* <Map />
        <Login />
         */}
    </View>
      </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
    justifyContent: "space-evenly",
  },
  statusBar: {
    backgroundColor: "#000",
    height: 40,
    margin: "0%",
  }
});
