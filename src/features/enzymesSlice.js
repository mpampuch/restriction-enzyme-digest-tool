import { createSlice } from "@reduxjs/toolkit";
import { enzymes } from "../../utils/enzymes";

// Sort enzymes by name alphabetically and assign that to the initial state
const unsortedEnzymes = enzymes;

// Get the keys and sort them alphabetically
const sortedKeys = Object.keys(unsortedEnzymes).sort();

// Create a new object with sorted key-value pairs
const initialState = {};
sortedKeys.forEach((key) => {
  initialState[key] = unsortedEnzymes[key];
});

const enzymesSlice = createSlice({
  name: "enzymes",
  initialState,
  reducers: {
    selectEnzyme(state, action) {
      const enzymeKey = action.payload;

      state[enzymeKey].is_selected = !state[enzymeKey].is_selected;
    },
    greyOutEnzyme(state, action) {
      const enzymeKey = action.payload;
      state[enzymeKey].is_greyed = !state[enzymeKey].is_greyed;
    },
    resetEnzyme(state, action) {
      const enzymeKey = action.payload;
      state[enzymeKey].is_selected = false;
      state[enzymeKey].is_greyed = false;
    },
  },
});

export const { selectEnzyme, greyOutEnzyme, resetEnzyme } =
  enzymesSlice.actions;

export default enzymesSlice.reducer;
