import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { addFavorite } from "../store";
import { connect } from "react-redux";

function Heart({ station, addFavorite }) {
  return (
    <Button title="♡" color="#eeff00" onPress={() => addFavorite(station)} />
  );
}

const mapDispatchToProps = (dispatch) => ({
  addFavorite: (station) => dispatch(addFavorite(station)),
});

export default connect(null, mapDispatchToProps)(Heart);

const styles = StyleSheet.create({
  updatesContainer: {
    backgroundColor: "#000",
    padding: "2%",
    color: "#eeff00",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
  },
});
