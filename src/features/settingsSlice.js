import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inputString: "",
  dnaInputProvided: false,
  showRestrictedDnaInput: false,
  restrictedInputString: "",
  restrictedDnaInputProvided: false,
  exclude3PrimeOverhangs: false,
  exclude5PrimeOverhangs: false,
  excludeBluntEnds: false,
  excludeAs: false,
  excludeCs: false,
  excludeGs: false,
  excludeTs: false,
  excludeAmbiguousBases: false,
  excludeNs: false,
  excludeWs: false,
  excludeSs: false,
  excludeMs: false,
  excludeKs: false,
  excludeRs: false,
  excludeYs: false,
  excludeBs: false,
  excludeDs: false,
  excludeHs: false,
  excludeVs: false,
  excludeMethylationSensitive: false,
  excludeMethylationInsensitive: false,
  minNumberOfCutsites: 0,
  maxNumberOfCutsitesEnabled: false,
  maxNumberOfCutsites: 1000,
  displayType: "detailed", // can be "detailed", "cutsite-locations", or "number-of-cutsites"
};

// TODO
// Create a slice for the settings state
// A slice is a collection of reducer functions and actions for a specific feature

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setInputString(state, action) {
      state.inputString = action.payload;
    },
    toggleProvideDnaInput(state) {
      state.dnaInputProvided = !state.dnaInputProvided;
    },
    toggleShowRestrictedDnaInput(state) {
      state.showRestrictedDnaInput = !state.showRestrictedDnaInput;
    },
    setRestrictedInputString(state, action) {
      state.restrictedInputString = action.payload;
    },
    toggleProvideRestrictedDnaInput(state) {
      state.restrictedDnaInputProvided = !state.restrictedDnaInputProvided;
    },
    toggleExclude3PrimeOverhangs(state) {
      state.exclude3PrimeOverhangs = !state.exclude3PrimeOverhangs;
    },
    toggleExclude5PrimeOverhangs(state) {
      state.exclude5PrimeOverhangs = !state.exclude5PrimeOverhangs;
    },
    toggleExcludeBluntEnds(state) {
      state.excludeBluntEnds = !state.excludeBluntEnds;
    },
    toggleExcludeAs(state) {
      state.excludeAs = !state.excludeAs;
    },
    toggleExcludeCs(state) {
      state.excludeCs = !state.excludeCs;
    },
    toggleExcludeGs(state) {
      state.excludeGs = !state.excludeGs;
    },
    toggleExcludeTs(state) {
      state.excludeTs = !state.excludeTs;
    },
    toggleExcludeAmbiguousBases(state) {
      state.excludeAmbiguousBases = !state.excludeAmbiguousBases;
    },
    toggleExcludeNs(state) {
      state.excludeNs = !state.excludeNs;
    },
    toggleExcludeWs(state) {
      state.excludeWs = !state.excludeWs;
    },
    toggleExcludeSs(state) {
      state.excludeSs = !state.excludeSs;
    },
    toggleExcludeMs(state) {
      state.excludeMs = !state.excludeMs;
    },
    toggleExcludeKs(state) {
      state.excludeKs = !state.excludeKs;
    },
    toggleExcludeRs(state) {
      state.excludeRs = !state.excludeRs;
    },
    toggleExcludeYs(state) {
      state.excludeYs = !state.excludeYs;
    },
    toggleExcludeBs(state) {
      state.excludeBs = !state.excludeBs;
    },
    toggleExcludeDs(state) {
      state.excludeDs = !state.excludeDs;
    },
    toggleExcludeHs(state) {
      state.excludeHs = !state.excludeHs;
    },
    toggleExcludeVs(state) {
      state.excludeVs = !state.excludeVs;
    },
    toggleExcludeMethylationSensitive(state) {
      state.excludeMethylationSensitive = !state.excludeMethylationSensitive;
    },
    toggleExcludeMethylationInsensitive(state) {
      state.excludeMethylationInsensitive =
        !state.excludeMethylationInsensitive;
    },
    setMinNumberOfCutsites(state, action) {
      state.minNumberOfCutsites = action.payload;
    },
    toggleMaxNumberOfCutsitesEnabled(state) {
      state.maxNumberOfCutsitesEnabled = !state.maxNumberOfCutsitesEnabled;
    },
    setMaxNumberOfCutsites(state, action) {
      state.maxNumberOfCutsites = action.payload;
    },
    setDisplayType(state, action) {
      state.displayType = action.payload;
    },
    resetSettings() {
      () => initialState;
    },
  },
});

export const {
  setInputString,
  toggleProvideDnaInput,
  toggleShowRestrictedDnaInput,
  setRestrictedInputString,
  toggleProvideRestrictedDnaInput,
  toggleExclude3PrimeOverhangs,
  toggleExclude5PrimeOverhangs,
  toggleExcludeBluntEnds,
  toggleExcludeAs,
  toggleExcludeCs,
  toggleExcludeGs,
  toggleExcludeTs,
  toggleExcludeAmbiguousBases,
  toggleExcludeNs,
  toggleExcludeWs,
  toggleExcludeSs,
  toggleExcludeMs,
  toggleExcludeKs,
  toggleExcludeRs,
  toggleExcludeYs,
  toggleExcludeBs,
  toggleExcludeDs,
  toggleExcludeHs,
  toggleExcludeVs,
  toggleExcludeMethylationSensitive,
  toggleExcludeMethylationInsensitive,
  setMinNumberOfCutsites,
  toggleMaxNumberOfCutsitesEnabled,
  setMaxNumberOfCutsites,
  setDisplayType,
  resetSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;
