import { configureStore } from "@reduxjs/toolkit";
import enzymesReducer from "./features/enzymesSlice";

const store = configureStore({
  reducer: {
    enzymes: enzymesReducer,
    // TODO, add reducers for other states
    // Settings
    // Sequences
  },
});

export default store;
