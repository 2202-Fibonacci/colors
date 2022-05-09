import React, { useState, useEffect } from "react";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  AnimatedRegion,
  Animated,
} from "react-native-maps";
import { Platform, StyleSheet, Text, View, Dimensions } from "react-native";
import * as Location from "expo-location";
import { allStations } from "../../MTA/stations";
import Lines from "./Lines";
import StationAlerts from "./StationAlerts";

export default function Map() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState({
    latitude: 40.752287,
    longitude: -73.993391,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [selectedStation, setSelectedStation] = useState("128");

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

      // set region to center around user's location - commented out because goes to SF now
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
    <>
      <Lines lines={allStations[selectedStation].lines_at} />
      <StationAlerts station={selectedStation} />
      <View style={styles.mapContainer}>
        {/* {text === "Found" ? (
        <Text>
          Hello you're at {location.coords.latitude}x{location.coords.longitude}
        </Text>
      ) : (
        <Text>{text}</Text>
      )} */}
        {/* <Text>Selected Station: {allStations[selectedStation].stop_name}</Text> */}
        <MapView
          onRegionChangeComplete={(region) => setRegion(region)}
          // provider={PROVIDER_GOOGLE}
          initialRegion={region}
          region={region}
          style={styles.map}
        >
          {stations.map((station) => (
            <Marker
              key={station}
              coordinate={{
                latitude: Number(allStations[station].stop_lat),
                longitude: Number(allStations[station].stop_lon),
              }}
              title={allStations[station].stop_name}
              description={`Lines: ${allStations[station].lines_at.join(", ")}`}
              onPress={() => {
                setSelectedStation(station);
                setRegion({
                  ...region,
                  latitude: Number(allStations[station].stop_lat),
                  longitude: Number(allStations[station].stop_lon),
                });
              }}
              pinColor="teal"
            />
          ))}
        </MapView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    backgroundColor: "#fff",
    color: "#00ffff",
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.6,
  },
});
