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

// Create a slice for the enzymes state
// A slice is a collection of reducer functions and actions for a specific feature
const enzymesSlice = createSlice({
  name: "enzymes",
  initialState,
  reducers: {
    selectEnzyme(state, action) {
      const enzymeKey = action.payload;

      state[enzymeKey].is_selected = !state[enzymeKey].is_selected;
    },
    greyOutEnzyme(state, action) {
      const enzymeKey = action.payload.enzyme;
      let settings = action.payload.setting;

      if (!Array.isArray(settings)) {
        settings = [settings]; // Ensure settings is an array
      }

      // TOGGLE LOGIC for each setting in the array
      settings.forEach((setting) => {
        if (!state[enzymeKey].greyed_out_by.includes(setting)) {
          state[enzymeKey].greyed_out_by.push(setting);
        } else {
          state[enzymeKey].greyed_out_by = state[
            enzymeKey
          ].greyed_out_by.filter((item) => item !== setting);
        }
      });

      // Also set is_selected to false if the enzyme is greyed out
      if (state[enzymeKey].greyed_out_by.length > 0) {
        state[enzymeKey].is_selected = false;
      }
    },

    resetEnzyme(state, action) {
      const enzymeKey = action.payload;
      state[enzymeKey].is_selected = false;
      state[enzymeKey].is_greyed_out = false;
    },
  },
});

export const { selectEnzyme, greyOutEnzyme, resetEnzyme } =
  enzymesSlice.actions;

export default enzymesSlice.reducer;
