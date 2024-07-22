import { useSelector, useDispatch } from "react-redux";
import {
  setMinNumberOfCutsites,
  toggleMaxNumberOfCutsitesEnabled,
  setMaxNumberOfCutsites,
  setDisplayType,
} from "../features/settingsSlice";

import TextField from "@mui/material/TextField";
// import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function ExtraParametersTabLayout() {
  // Grab State from Redux Store
  const settingsState = useSelector((store) => store.settings);
  const minNumberOfCuts = settingsState.minNumberOfCutsites;
  const maxNumberOfCutsEnabled = settingsState.maxNumberOfCutsitesEnabled;
  const maxNumberOfCuts = settingsState.maxNumberOfCutsites;
  const displayType = settingsState.displayType;

  // Create Dispatcher to Dispatch Actions to Redux Store
  const dispatch = useDispatch();

  // Create a dictionary to grab the correct description for each display type
  const descriptions = {
    detailed:
      "Detailed view shows the entire DNA sequence and where the restriction enzyme(s) cut it.",
    "cutsite-locations":
      "Cut sites view only shows the locations where the DNA was cut for each restriction enzyme.",
    "number-of-cutsites":
      "Number of cutsites view only shows the number of times each restriction enzyme cut the DNA sequence.",
  };

  // Create Handlers for Dispatching Actions to Redux Store
  const handleMinNumberOfCutsChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= 0) {
      dispatch(setMinNumberOfCutsites(newValue));
    }
  };

  const handleMaxNumberOfCutsEnabledChange = () => {
    dispatch(toggleMaxNumberOfCutsitesEnabled());
  };

  const handleMaxNumberOfCutsChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= 0) {
      dispatch(setMaxNumberOfCutsites(newValue));
    }
  };

  // display type should be "detailed", "cutsite locations", or "number of cutsites"
  const handleDisplayTypeChange = (e) => {
    const newValue = e.target.value;
    dispatch(setDisplayType(newValue));
  };

  return (
    <>
      <h1 className="mb-2 text-3xl">Extra Parameters</h1>

      <div className="flex flex-col gap-12">
        <div className="flex w-3/4 flex-row items-center gap-4">
          <p>Min number of cutsites:</p>
          <TextField
            className="bg-gray-100 text-3xl text-black"
            label=""
            type="number"
            value={minNumberOfCuts}
            onChange={handleMinNumberOfCutsChange}
            onInput={(e) => {
              // Prevent setting the value to negative or non-numeric
              e.target.value = Math.max(0, parseInt(e.target.value) || 0);
            }}
            onBlur={(e) => {
              // If input is empty or zero, set it to zero and select the text
              if (e.target.value === "" || parseInt(e.target.value) === 0) {
                e.target.value = "0";
                // e.target.select();
              }
            }}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: 0,
              step: 1,
            }}
          />
        </div>

        <div className="flex w-3/4 flex-row items-center gap-4">
          <p className={maxNumberOfCutsEnabled ? "" : `${"text-gray-400"}`}>
            Max number of cutsites:
          </p>
          <TextField
            className="bg-gray-100 text-3xl text-black"
            label=""
            type="number"
            value={maxNumberOfCuts}
            disabled={!maxNumberOfCutsEnabled}
            onChange={handleMaxNumberOfCutsChange}
            onInput={(e) => {
              // Prevent setting the value to negative or non-numeric
              e.target.value = Math.max(0, parseInt(e.target.value) || 0);
            }}
            onBlur={(e) => {
              // If input is empty or zero, set it to zero and select the text
              if (e.target.value === "" || parseInt(e.target.value) === 0) {
                e.target.value = "0";
                // e.target.select();
              }
            }}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: 0,
              step: 1,
            }}
          />

          <div className="flex flex-row items-center gap-2">
            <input
              className="h-8 w-10"
              type="checkbox"
              checked={maxNumberOfCutsEnabled}
              onChange={handleMaxNumberOfCutsEnabledChange}
            />
            <p>Enable?</p>
          </div>
        </div>

        <div className="flex flex-row items-center gap-4">
          <p>Display:</p>
          <FormControl sx={{ m: 1, minWidth: 140 }}>
            <InputLabel id="demo-simple-select-label"></InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              className="bg-gray-100 text-3xl text-black"
              value={displayType}
              label=""
              onChange={handleDisplayTypeChange}
            >
              <MenuItem value={"detailed"}>Detailed</MenuItem>
              <MenuItem value={"cutsite-locations"}>Cut Sites</MenuItem>
              <MenuItem value={"number-of-cutsites"}>
                Number of Cut Sites
              </MenuItem>
            </Select>
          </FormControl>

          <p className="ml-2 w-3/4">*{descriptions[displayType]}</p>
        </div>
      </div>
    </>
  );
}

export default ExtraParametersTabLayout;
