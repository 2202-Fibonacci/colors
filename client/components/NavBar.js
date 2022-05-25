import React, { useState, useEffect } from "react";
import { Dimensions, Image, Pressable, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ElevatorModal from "./ElevatorModal";
import ServiceAlertModal from "./ServiceAlertModal";
import { connect } from "react-redux";
import Heart from "./Heart";
import { useQuery, gql } from "@apollo/client";

const SERVICE_ALERT = gql`
  query ServiceAlert($train: String!, $onlyActive: Boolean) {
    serviceAlert(train: $train, onlyActive: $onlyActive) {
      routeId
      alerts {
        type
        text
        activePeriodText
      }
    }
  }
`;

function NavBar(props) {
  const navigation = useNavigation();

  const [onHomePage, setOnHomePage] = useState(true);
  const [activeAlerts, setActiveAlerts] = useState(false);

  const { data, loading, error } = useQuery(SERVICE_ALERT, {
    variables: { train: props.line, onlyActive: true },
  });

  useEffect(() => {
    if (data && data.serviceAlert.alerts.length > 0) {
      setActiveAlerts(true);
    } else if (data && data.serviceAlert.alerts.length === 0) {
      setActiveAlerts(false);
    }
  }, [data]);

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
        disable={!onHomePage || !activeAlerts}
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
