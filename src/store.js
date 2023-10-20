import { configureStore } from "@reduxjs/toolkit";
import enzymesReducer from "./features/enzymesSlice";

const store = configureStore({
  reducer: {
    enzymes: enzymesReducer,
  },
});

export default store;
