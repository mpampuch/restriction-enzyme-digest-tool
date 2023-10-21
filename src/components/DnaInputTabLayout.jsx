import { useSelector, useDispatch } from "react-redux";
import { toggleShowRestrictedDnaInput } from "../features/settingsSlice";

import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
// import LabelledSwitch from "./LabelledSwitch";
import Switch from "@mui/material/Switch";

function DnaInputTabLayout() {
  // Grab State from Redux Store
  const settingsState = useSelector((store) => store.settings);
  const showRestrictedDnaInput = settingsState.showRestrictedDnaInput;
  // Create Dispatcher to Dispatch Actions to Redux Store
  const dispatch = useDispatch();

  // Create Handlers for Dispatching Actions to Redux Store
  const handleShowRestrictedDnaInputChange = () => {
    dispatch(toggleShowRestrictedDnaInput());
  };
  return (
    <>
      <h1>DNA input</h1>
      <p>
        Inpt the DNA sequence(s) that you would like to digest. The input has to
        be in FASTA format and be less than 1Mb.
      </p>
      {/* TODO, FIX THE OVERFLOW AND ADD A SCROLL WHEN THIS GETS TOO BIG */}
      <div className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-10 max-h-[250px] overflow-auto">
        <TextareaAutosize
          aria-label="minimum height"
          minRows={7}
          placeholder="Input DNA to digest"
          className="text-gray-800"
        />
      </div>
      <Button variant="contained" component="label">
        Upload File
        <input type="file" hidden />
      </Button>
      {/* TODO, ADD THIS LOGIC TO THE LABELLED DNA INPUT THING BUT DO IT USING A GLOBAL STATE MANAGEMENT SYSTEM LIKE REDUX TO ENSURE PARENT CAN GET THE STATE */}
      <div className="flex flex-row items-center">
        <Switch onChange={() => handleShowRestrictedDnaInputChange()} />
        <p> Add Restricted DNA input</p>
      </div>
      <div
        className={`overflow-auto transition-all duration-500 ease-in-out ${
          showRestrictedDnaInput ? "max-h-[450px]" : "max-h-0"
        }`}
      >
        {/* {showRestrictedInput && (
              <> */}
        <p>
          Inpt the DNA sequence(s) that you would not like to digest. If this is
          filled out, then any enzyme that performs one or more digestions in
          this DNA will be exluded from the analysis on the desired DNA. The
          input has to be in FASTA format and be less than 1Mb.
        </p>
        <div className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-10 max-h-[300px] overflow-auto">
          <TextareaAutosize
            aria-label="minimum height"
            minRows={7}
            placeholder="Input DNA that you don't want to digest"
            className="max-h-[250px] text-gray-800"
          />
        </div>
        <Button variant="contained" component="label">
          Upload File
          <input type="file" hidden />
        </Button>
        {/* </>
            )} */}
      </div>
    </>
  );
}

export default DnaInputTabLayout;
