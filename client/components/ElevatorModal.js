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

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Pressable
          style={styles.container}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.modalView}>
            <StationAlerts station={stationId} />
            {/* <Pressable
              style={[styles.button]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>X</Text>
            </Pressable> */}
          </View>
        </Pressable>
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
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, .3)",
  },
  modalView: {
    backgroundColor: "black",
    // height: "30%",
    marginBottom: "50%",
    margin: "6%",
    padding: "6%",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 2,
    borderWidth: 2,
    borderColor: "yellow",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
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
