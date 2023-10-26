import { useSelector, useDispatch } from "react-redux";
import {
  setInputString,
  // toggleProvideDnaInput,
  toggleShowRestrictedDnaInput,
  setRestrictedInputString,
  // toggleProvideRestrictedDnaInput,
} from "../features/settingsSlice";
import { isFastaFormat } from "../../utils/validateFasta";

import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
// import LabelledSwitch from "./LabelledSwitch";
import Switch from "@mui/material/Switch";

function DnaInputTabLayout() {
  // Grab State from Redux Store
  const settingsState = useSelector((store) => store.settings);
  const inputString = settingsState.inputString;
  const showRestrictedDnaInput = settingsState.showRestrictedDnaInput;
  const restrictedInputString = settingsState.restrictedInputString;

  // Create Dispatcher to Dispatch Actions to Redux Store
  const dispatch = useDispatch();

  // Create Handlers for Dispatching Actions to Redux Store
  const handleShowRestrictedDnaInputChange = () => {
    dispatch(toggleShowRestrictedDnaInput());
  };

  const handleInputStringChange = (e) => {
    e.preventDefault();
    const newValue = e.target.value;
    dispatch(setInputString(newValue));
    console.log(isFastaFormat(newValue));
  };

  const handleRestrictedInputStringChange = (e) => {
    e.preventDefault();
    const newValue = e.target.value;
    dispatch(setRestrictedInputString(newValue));
  };
  return (
    <>
      <h1>DNA input</h1>
      <p>
        Input the DNA sequence(s) that you would like to digest. The input has
        to be in FASTA format and be less than 1Mb.
      </p>
      <div className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-10 max-h-[250px] overflow-auto">
        <TextareaAutosize
          aria-label="minimum height"
          minRows={8}
          placeholder="Input DNA to digest"
          className="max-h-[200px] text-gray-800"
          value={inputString}
          onChange={(e) => handleInputStringChange(e)}
        />
      </div>
      <Button variant="contained" component="label">
        Upload File
        <input
          type="file"
          accept=".fasta, .fna, .ffn, .faa, .frn, .fa"
          hidden
        />
      </Button>
      <div className="flex flex-row items-center">
        <Switch onChange={() => handleShowRestrictedDnaInputChange()} />
        <p> Add Restricted DNA input</p>
      </div>
      <div
        className={`overflow-auto transition-all duration-500 ease-in-out ${
          showRestrictedDnaInput ? "max-h-[450px]" : "max-h-0"
        }`}
      >
        <p>
          Input the DNA sequence(s) that you would not like to digest. If this
          is filled out, then any enzyme that performs one or more digestions in
          this DNA will be exluded from the analysis on the desired DNA. The
          input has to be in FASTA format and be less than 1Mb.
        </p>
        <div className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-10 max-h-[300px] overflow-auto">
          <TextareaAutosize
            aria-label="minimum height"
            minRows={8}
            placeholder="Input DNA that you don't want to digest"
            className="max-h-[200px] text-gray-800"
            value={restrictedInputString}
            onChange={(e) => handleRestrictedInputStringChange(e)}
          />
        </div>
        <Button variant="contained" component="label">
          Upload File
          <input
            type="file"
            accept=".fasta, .fna, .ffn, .faa, .frn, .fa"
            hidden
          />
        </Button>
        {/* </>
            )} */}
      </div>
    </>
  );
}

export default DnaInputTabLayout;
