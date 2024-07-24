import { configureStore } from "@reduxjs/toolkit";
import enzymesReducer from "./features/enzymesSlice";
import settingsReducer from "./features/settingsSlice";
import outputReducer from "./features/outputSlice";

const store = configureStore({
  reducer: {
    enzymes: enzymesReducer,
    settings: settingsReducer,
    output: outputReducer,
  },
});

export default store;
