import { configureStore } from "@reduxjs/toolkit";
const SELECT_STATION = "SELECT_STATION";

export const selectStation = (stationId) => ({
  type: SELECT_STATION,
  stationId,
});

const initialState = { selectedStation: "128" };

export const stationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_STATION:
      return { ...state, selectedStation: action.stationId };
    default:
      return state;
  }
};

const store = configureStore({ reducer: stationReducer });
export default store;
