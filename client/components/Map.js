import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { Platform, StyleSheet, Text, View, Dimensions } from "react-native";
import * as Location from "expo-location";
import { allStations } from "../../MTA/stations";

export default function Map() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState({
    latitude: 40.752287,
    longitude: -73.993391,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  useEffect(() => {
    (async () => {
      // get permission to access user's location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      // set current location to users location
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      // set region to center around user's location
      // setRegion({
      //   ...region,
      //   latitude: location.coords.latitude,
      //   longitude: location.coords.longitude,
      // });
    })();
  }, []);

  let text = "Waiting..";

  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    console.log("locaish", location.coords.latitude, location.coords.longitude);
    text = "Found";
  }
  console.log("text", text);

  const stations = Object.keys(allStations);

  return (
    <View style={styles.mapContainer}>
      {text === "Found" ? (
        <Text>
          Hello you're at {location.coords.latitude}x{location.coords.longitude}
        </Text>
      ) : (
        <Text>{text}</Text>
      )}
      <MapView
        onRegionChange={(region) => setRegion(region)}
        region={region}
        style={styles.map}
      >
        {stations.map((station) => (
          <Marker
            coordinate={{
              latitude: Number(allStations[station].stop_lat),
              longitude: Number(allStations[station].stop_lon),
            }}
            key={station}
          />
        ))}
      </MapView>
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
