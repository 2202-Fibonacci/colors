import React, { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
} from "react-native";
import StationAlerts from "./StationAlerts";
const allStations = require("../../MTA/stations");

const ElevatorModal = ({ stationId }) => {
  const [modalVisible, setModalVisible] = useState(false);
  //   const stationId = "128";
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.container}>
          <View style={styles.modalView}>
            <StationAlerts station={stationId} />
            <Pressable
              style={[styles.button]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>X</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* escalator button to open modal */}
      <Pressable
        style={({ pressed }) => [
          {
            transform: pressed ? [{ scale: 0.9 }] : [{ scale: 1.0 }],
            display: !allStations[stationId].accessible ? "none" : "inline",
          },
        ]}
        onPress={() => setModalVisible(true)}
      >
        <Image
          style={styles.icon}
          source={require("../../assets/escalator.png")}
        />
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "60%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "black",
    margin: "5%",
    padding: "4%",
    alignItems: "center",
    elevation: 2,
    borderWidth: 2,
    borderColor: "yellow",
  },
  button: {
    padding: "2%",
    marginTop: "3%",
    height: 24,
    width: 24,
    alignSelf: "flex-end",
    elevation: 2,
    backgroundColor: "#eeff00",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    height: 28,
    width: 28,
  },
  textStyle: {
    fontFamily: "Helvetica",
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default ElevatorModal;
