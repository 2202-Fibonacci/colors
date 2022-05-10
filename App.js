import React, {useState, useEffect} from 'react';
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View } from "react-native";
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  let userLat = '';
  let userLong = '';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    console.log('locaish', location.coords.latitude);
    text = 'Found';
    userLat = location.coords.latitude;
    userLong = location.coords.longitude;
    // text = JSON.stringify(location);
  }
  console.log('text', text)
  return (
    <View style={styles.container}>
    {
      (text === 'Found')
      ? <Text>Hello you're at {userLat}x{userLong}</Text>
      : <Text>{text}</Text>
    }
      <StatusBar style="auto" />
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
    justifyContent: "center",
    color: '#000000', //Laurynn changed for readability of forms
  },
});
