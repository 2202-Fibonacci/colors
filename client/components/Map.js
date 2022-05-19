import React, { useState, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import * as Location from "expo-location";
const allStations = require("../../MTA/stations");
import Lines from "./Lines";
import StationAlerts from "./StationAlerts";
import { selectStation } from "../store";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

function Map(props) {
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
    text = "Found";
  }

  const stations = Object.keys(allStations);

  const images = {
    _7: require("../../assets/marker/7.png"),
    _7BDFM: require("../../assets/marker/7BDFM.png"),
    _7EM: require("../../assets/marker/7EM.png"),
    _7NW: require("../../assets/marker/7NW.png"),
    _123: require("../../assets/marker/123.png"),
    _1AB: require("../../assets/marker/1AB.png"),
    _1AC: require("../../assets/marker/1AC.png"),
    _1RW: require("../../assets/marker/1RW.png"),
    _23ACERW: require("../../assets/marker/23ACERW.png"),
    _456: require("../../assets/marker/456.png"),
    _4LN: require("../../assets/marker/4LN.png"),
    _456JZ: require("../../assets/marker/456JZ.png"),
    _456NRW: require("../../assets/marker/456NRW.png"),
    _456NRJZ: require("../../assets/marker/456NRJZ.png"),
    _2345: require("../../assets/marker/2345.png"),
    _2345R: require("../../assets/marker/2345R.png"),
    _4567: require("../../assets/marker/4567.png"),
    _6BDFM: require("../../assets/marker/6BDFM.png"),
    _6EM: require("../../assets/marker/6EM.png"),
    ABCD: require("../../assets/marker/ABCD.png"),
    ACE: require("../../assets/marker/ACE.png"),
    ACG: require("../../assets/marker/ACG.png"),
    ACL: require("../../assets/marker/ACL.png"),
    ACLJZ: require("../../assets/marker/ACLJZ.png"),
    BDFM: require("../../assets/marker/BDFM.png"),
    BDNQ: require("../../assets/marker/BDNQ.png"),
    EFMR: require("../../assets/marker/EFMR.png"),
    EJZ: require("../../assets/marker/EJZ.png"),
    FG: require("../../assets/marker/FG.png"),
    FGR: require("../../assets/marker/FGR.png"),
    FML: require("../../assets/marker/FML.png"),
    G: require("../../assets/marker/G.png"),
    JMZ: require("../../assets/marker/JMZ.png"),
    JZ: require("../../assets/marker/JZ.png"),
    L: require("../../assets/marker/L.png"),
    NQRW: require("../../assets/marker/NQRW.png"),
    SIR: require("../../assets/marker/SIR.png"),
    AtlanticTer: require("../../assets/marker/AtlanticTer.png"),
    FultonSt: require("../../assets/marker/FultonSt.png"),
    JacksonHts: require("../../assets/marker/JacksonHts.png"),
    TimesSq: require("../../assets/marker/TimesSq.png"),
    default: require("../../assets/marker/default.png"),
  };
  return (
    <View style={styles.mapPageContainer}>
      <Lines
        lines={allStations[selectedStation].lines_at}
        station={selectedStation}
      />
      {/* <StationAlerts station={selectedStation} /> */}
      <View style={styles.mapContainer}>
        {/* {text === "Found" ? (
        <Text>
          Hello you're at {location.coords.latitude}x{location.coords.longitude}
        </Text>
      ) : (
        <Text>{text}</Text>
      )} */}
        <MapView
          onRegionChangeComplete={(region) => setRegion(region)}
          // provider={PROVIDER_GOOGLE}
          initialRegion={region}
          region={region}
          style={styles.map}
          showsUserLocation={true}
          showsMyLocationButton={true}
          userInterfaceStyle="dark"
          tintColor="#ff0000"
          mapType="mutedStandard"
        >
          {stations
            .filter((station) => allStations[station].draw)
            .map((station) => {
              {
                /* let markerImg = '../../assets/marker/default.png'; */
              }
              let markerImg = allStations[station].icon;
              {
                /* let markerImg = images[allStations[station].icon]; */
              }
              if (!allStations[station].icon)
                console.log(`${station} missing icon`);
              {
                /* else console.log(`${allStations[station].icon}.png`); */
              }
              {
                /* if (allStations[station].icon) markerImg = '../../assets/marker/' + allStations[station].icon + '.png'; */
              }
              return (
                <Marker
                  key={station}
                  coordinate={{
                    latitude: Number(allStations[station].stop_lat),
                    longitude: Number(allStations[station].stop_lon),
                  }}
                  title={allStations[station].stop_name}
                  description={`Lines: ${allStations[station].lines_at.join(
                    ", "
                  )}`}
                  // icon={require('../../assets/NQRW.png')}
                  onPress={() => {
                    setSelectedStation(station);
                    props.selectStation(station);
                    // setRegion({
                    //   ...region,
                    //   latitude: Number(allStations[station].stop_lat),
                    //   longitude: Number(allStations[station].stop_lon),
                    // });
                  }}
                  // pinColor="yellow"
                >
                  <Image
                    source={images[markerImg]}
                    style={
                      allStations[station].complex
                        ? { height: 20, width: 15 }
                        : { height: 13, width: 10 }
                    }
                  />
                </Marker>
              );
            })}
        </MapView>
        {/* <StationAlerts station={selectedStation} /> */}
      </View>
    </View>
  );
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      selectStation,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Map);

const styles = StyleSheet.create({
  mapPageContainer: {
    backgroundColor: "#000",
    flex: 1,
    padding: 0,
    margin: 0,
    justifyContent: "start",
    alignItems: "center",
  },
  mapContainer: {
    flex: 1,
    backgroundColor: "#000",
    color: "#00ffff",
    justifyContent: "center",
    alignItems: "center",
    padding: "0%",
    margin: "0%",
  },
  map: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
