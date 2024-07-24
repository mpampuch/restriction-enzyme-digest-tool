import { useSelector, useDispatch } from "react-redux";
import {
  setInputString,
  toggleShowRestrictedDnaInput,
  setRestrictedInputString,
  toggleAutofillInputDnaSelected,
  toggleAutofillRestrictedDnaSelected,
} from "../features/settingsSlice";
// import { isFastaFormat } from "../../utils/validateFasta";
import { showToast } from "../../utils/showToast";

import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import { dnaToCut, dnaToNotCut } from "../../utils/autofillSequences";

function DnaInputTabLayout() {
  const settingsState = useSelector((store) => store.settings);
  const inputString = settingsState.inputString;
  const showRestrictedDnaInput = settingsState.showRestrictedDnaInput;
  const restrictedInputString = settingsState.restrictedInputString;
  const dispatch = useDispatch();

  const handleShowRestrictedDnaInputChange = () => {
    dispatch(toggleShowRestrictedDnaInput());
  };

  const handleInputStringChange = (e) => {
    e.preventDefault();
    const newValue = e.target.value;
    dispatch(setInputString(newValue));
    // console.log(isFastaFormat(newValue));

    // Check if the input string is empty
    if (newValue === "") {
      // If the autofill input DNA is selected, then clear the input string
      if (settingsState.autofillInputDnaSelected) {
        handleAutofillInputDNA();
      }
    }
  };

  const handleRestrictedInputStringChange = (e) => {
    e.preventDefault();
    const newValue = e.target.value;
    dispatch(setRestrictedInputString(newValue));
    // Check if the restricted string is empty
    if (newValue === "") {
      // If the autofill restricted DNA is selected, then clear the input string
      if (settingsState.autofillRestrictedDnaSelected) {
        handleAutofillRestrictedDNA();
      }
    }
  };

  const handleFileInputChange = (e, field) => {
    const fileInput = e.target;
    const file = fileInput.files[0];
    const reader = new FileReader();

    // Check if the file size is greater than 100kb
    if (file.size > 100 * 1024) {
      // Handle the error condition, such as displaying a message to the user
      showToast("File size exceeds 100kb limit");
      fileInput.value = null;
      return;
    }

    reader.onload = (event) => {
      const contents = event.target.result;
      // Update the appropriate input string based on the field parameter
      dispatch(
        field === "inputString"
          ? setInputString(contents)
          : setRestrictedInputString(contents),
      );
      // console.log(isFastaFormat(contents));
      // Clear the value of the file input to allow selecting the same file again
      fileInput.value = null;
    };
    reader.readAsText(file);
  };

  const handleAutofillInputDNA = () => {
    dispatch(toggleAutofillInputDnaSelected());
    if (settingsState.autofillInputDnaSelected) {
      dispatch(setInputString(""));
      return;
    } else {
      dispatch(setInputString(dnaToCut));
    }
  };

  const handleAutofillRestrictedDNA = () => {
    dispatch(toggleAutofillRestrictedDnaSelected());
    if (settingsState.autofillRestrictedDnaSelected) {
      dispatch(setRestrictedInputString(""));
      return;
    } else {
      dispatch(setRestrictedInputString(dnaToNotCut));
    }
  };

  return (
    <>
      <h1>DNA input</h1>
      <p>
        Input the DNA sequence(s) that you would like to digest. The input has
        to be in FASTA format and be less than 100kb.
      </p>
      <div className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-10 max-h-[250px] overflow-auto">
        <TextareaAutosize
          aria-label="minimum height"
          minRows={8}
          placeholder="Input DNA to digest"
          className="custom-overflow-y-scroll max-h-[200px] text-gray-800"
          value={inputString}
          onChange={(e) => handleInputStringChange(e)}
        />
      </div>
      <div className="flex flex-row items-center justify-between">
        <Button variant="contained" component="label">
          Upload File
          <input
            type="file"
            accept=".fasta, .fna, .ffn, .faa, .frn, .fa"
            hidden
            onChange={(e) => handleFileInputChange(e, "inputString")}
          />
        </Button>
        <div className="flex flex-row items-center gap-2">
          {settingsState.autofillInputDnaSelected ? (
            <p>Clear Form Data</p>
          ) : (
            <p>Auto-fill Input DNA</p>
          )}
          <Switch
            checked={settingsState.autofillInputDnaSelected}
            onChange={() => handleAutofillInputDNA()}
            size="small"
          />
        </div>
      </div>
      <div className="flex flex-row items-center">
        <Switch
          checked={settingsState.showRestrictedDnaInput}
          onChange={() => handleShowRestrictedDnaInputChange()}
        />
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
          this DNA will be excluded from the analysis on the desired DNA. The
          input has to be in FASTA format and be less than 100kb.
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
        <div className="flex flex-row items-center justify-between">
          <Button variant="contained" component="label">
            Upload File
            <input
              type="file"
              accept=".fasta, .fna, .ffn, .faa, .frn, .fa"
              hidden
              onChange={(e) =>
                handleFileInputChange(e, "restrictedInputString")
              }
            />
          </Button>
          <div className="flex flex-row items-center gap-2">
            {settingsState.autofillRestrictedDnaSelected ? (
              <p>Clear Form Data</p>
            ) : (
              <p>Auto-fill Input DNA</p>
            )}
            <Switch
              checked={settingsState.autofillRestrictedDnaSelected}
              onChange={() => handleAutofillRestrictedDNA()}
              size="small"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default DnaInputTabLayout;
