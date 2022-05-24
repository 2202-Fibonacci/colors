import React, { useState, useEffect } from "react";
import { Button, Pressable, Image, StyleSheet, Text, View } from "react-native";
import { addFavorite, removeFavorite } from "../store";
import { connect } from "react-redux";

function Heart({ station, addFavorite, disable, favorites, removeFavorite }) {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          transform: pressed ? [{ scale: 0.9 }] : [{ scale: 1.0 }],
        },
      ]}
      disabled={disable}
      onPress={() =>
        favorites.includes(station)
          ? removeFavorite(station)
          : addFavorite(station)
      }
    >
      <Image
        style={styles.icon}
        source={
          disable
            ? require("../../assets/fav_inactive.png")
            : favorites.includes(station)
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
  removeFavorite: (station) => dispatch(removeFavorite(station)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Heart);

const styles = StyleSheet.create({
  icon: {
    height: 24,
    width: 24,
  },
});
