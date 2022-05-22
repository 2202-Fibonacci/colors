import { configureStore } from "@reduxjs/toolkit";

const SELECT_STATION = "SELECT_STATION";
const SELECT_LINE = "SELECT_LINE";
const SET_USER = "SET_USER";

export const selectStation = (stationId) => ({
  type: SELECT_STATION,
  stationId,
});

export const selectLine = (line) => ({
  type: SELECT_LINE,
  line,
});

export const setUser = (user) => ({
  type: SET_USER,
  user,
});

const initialState = { selectedLine: "", selectedStation: "128", user: {} };

export const stationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_STATION:
      return { ...state, selectedStation: action.stationId };
    case SELECT_LINE:
      return { ...state, selectedLine: action.line };
    case SET_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
};

const store = configureStore({ reducer: stationReducer });
export default store;
