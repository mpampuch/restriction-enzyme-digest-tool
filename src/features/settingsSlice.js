// TODO
// Settings state should contain the following information
const initialState = {
  dnaInputProvide: false,
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
  maxNumberOfCutsites: Infinity,
  displayType: "detailed", // can be "detailed", "cutsite locations", or "number of cutsites"
};

// TODO
// Create a slice for the settings state
// A slice is a collection of reducer functions and actions for a specific feature
