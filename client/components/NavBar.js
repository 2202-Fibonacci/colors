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
import ServiceAlertModal from "./ServiceAlertModal";
import { connect } from "react-redux";
import Heart from "./Heart";

function NavBar(props) {
  const [onHomePage, setOnHomePage] = useState(true);
  const navigation = useNavigation();

  return (
    <View style={styles.navContainer}>
      <Pressable
        onPress={() => {
          navigation.navigate("Map");
          setOnHomePage(true);
        }}
        style={({ pressed }) => [
          {
            transform: pressed ? [{ scale: 0.9 }] : [{ scale: 1.0 }],
          },
        ]}
      >
        <Image style={styles.icon} source={require("../../assets/home.png")} />
      </Pressable>

      <ElevatorModal stationId={props.stationId} disable={!onHomePage} />
      <ServiceAlertModal
        stationId={props.stationId}
        line={props.line}
        disable={!onHomePage}
      />
      <Heart station={props.stationId} disable={!onHomePage} />

      <Pressable
        onPress={() => {
          navigation.navigate("User");
          setOnHomePage(false);
        }}
        style={({ pressed }) => [
          {
            transform: pressed ? [{ scale: 0.9 }] : [{ scale: 1.0 }],
          },
        ]}
      >
        <Image style={styles.icon} source={require("../../assets/user.png")} />
      </Pressable>
    </View>
  );
}

const mapStateToProps = (state) => {
  return { stationId: state.selectedStation, line: state.selectedLine };
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
    paddingTop: "4%",
    paddingBottom: "5%",
    // borderWidth: 0.5,
    // borderTopColor: "#eeff00",
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
