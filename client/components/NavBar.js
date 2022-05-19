import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ElevatorModal from "./ElevatorModal";
import { connect } from "react-redux";

function NavBar(props) {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.navContainer}>
        <Pressable
          onPress={() => navigation.navigate("Map")}
          style={({ pressed }) => [
            {
              transform: pressed ? [{ scale: 0.9 }] : [{ scale: 1.0 }],
            },
          ]}
        >
          <Image
            style={styles.icon}
            source={require("../../assets/home.png")}
          />
        </Pressable>
        <ElevatorModal stationId={props.stationId} />
        <Pressable
          onPress={() => navigation.navigate("User")}
          style={({ pressed }) => [
            {
              transform: pressed ? [{ scale: 0.9 }] : [{ scale: 1.0 }],
            },
          ]}
        >
          <Image
            style={styles.icon}
            source={require("../../assets/user.png")}
          />
        </Pressable>
      </View>
    </>
  );
}

const mapStateToProps = (state) => {
  return { stationId: state.selectedStation };
};

export default connect(mapStateToProps)(NavBar);

const styles = StyleSheet.create({
  navContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#222",
    paddingHorizontal: "10%",
    paddingTop: "5%",
    paddingBottom: "6%",
    color: "#00ffff",
    width: Dimensions.get("window").width,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  icon: {
    height: 28,
    width: 28,
  },
});
