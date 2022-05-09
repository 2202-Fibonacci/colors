import React, { useState, useEffect } from "react";
import MapView from "react-native-maps";
import { Platform, StyleSheet, Text, View, Dimensions } from "react-native";
import * as Location from "expo-location";

export default function Map() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState({
    latitude: 40.752287,
    longitude: -73.993391,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  let userLat = "";
  let userLong = "";

  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    console.log("locaish", location.coords.latitude);
    text = "Found";
    userLat = location.coords.latitude;
    userLong = location.coords.longitude;
    // text = JSON.stringify(location);
  }
  console.log("text", text);
  console.log("location", location);

  return (
    <View style={styles.mapContainer}>
      {text === "Found" ? (
        <Text>
          Hello you're at {userLat}x{userLong}
        </Text>
      ) : (
        <Text>{text}</Text>
      )}
      <MapView
        region={region}
        // initialRegion={{
        //   latitude: 37.78825,
        //   longitude: -122.4324,
        //   latitudeDelta: 0.0922,
        //   longitudeDelta: 0.0421,
        // }}
        style={styles.map}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    backgroundColor: "#fff",
    color: "#00ffff",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.5,
  },
});
