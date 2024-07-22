import { configureStore } from "@reduxjs/toolkit";
import enzymesReducer from "./features/enzymesSlice";
import settingsReducer from "./features/settingsSlice";

const store = configureStore({
  reducer: {
    enzymes: enzymesReducer,
    settings: settingsReducer,
    // TODO, add reducers for other states
    // Sequences
  },
});

export default store;
