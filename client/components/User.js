import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Login from './Login';

export default function UserScreen() {
  return (
    <View style={styles.container}>
    <Login />
      {/* <Text style={styles.txt}>User Page (switch contents on logged in status)</Text> */}
    </View>
  )
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  txt: {
    color: "#eeff00",
  }
})