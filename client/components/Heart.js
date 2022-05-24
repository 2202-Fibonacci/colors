import React, { useState, useEffect } from "react";
import { Button, Pressable, Image, StyleSheet, Text, View } from "react-native";
import { addFavorite } from "../store";
import { connect } from "react-redux";

function Heart({ station, addFavorite, disable, favorites }) {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          transform: pressed ? [{ scale: 0.9 }] : [{ scale: 1.0 }],
        },
      ]}
      disabled={disable}
      onPress={() => addFavorite(station)}
    >
      <Image
        style={styles.icon}
        source={
          favorites.includes(station)
            ? require("../../assets/fav.png")
            : require("../../assets/notfav.png")
        }
      />
    </Pressable>
  );
}

const mapStateToProps = (state) => {
  return { favorites: state.favorites };
};

const mapDispatchToProps = (dispatch) => ({
  addFavorite: (station) => dispatch(addFavorite(station)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Heart);

const styles = StyleSheet.create({
  icon: {
    height: 24,
    width: 24,
  },
});
