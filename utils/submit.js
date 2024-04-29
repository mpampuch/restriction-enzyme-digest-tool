import { getSelectedEnzymeNames } from "./getSelectedEnzymes";
import { isFastaFormat } from "./validateFasta";
import { toast } from "react-toastify";

export function submit(store) {
  // Get the current state of the Redux store
  const state = store.getState();

  console.log("Submitting form...");

  // Get the DNA sequence to cut
  const dnaToCut = state.settings.inputString.trim();

  // Validate the the input was not empty
  if (dnaToCut === "") {
    console.log("toast");
    toast.error("No input DNA sequence provided.", {
      position: "top-left",
      autoClose: 5000, // Close the toast after 5 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return;
  }

  // Validate that the input was a valid FASTA format
  const dnaToCutFastaValidation = isFastaFormat(dnaToCut);
  if (dnaToCutFastaValidation !== "Format: Correct") {
    toast.error(
      `DNA input is not in proper FASTA format. ${dnaToCutFastaValidation}`,
      {
        position: "top-left",
        autoClose: 5000, // Close the toast after 5 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      },
    );
    return;
  }

  // Get the DNA sequence to not cut
  const dnaToNotCut = state.settings.restrictedInputString.trim();

  // Validate that the input was a valid FASTA format if it was provided
  if (dnaToNotCut !== "") {
    const dnaToNotCutFastaValidation = isFastaFormat(dnaToNotCut);
    if (dnaToNotCutFastaValidation !== "Format: Correct") {
      toast.error(
        `Restricted DNA input is not in proper FASTA format. ${dnaToNotCutFastaValidation}`,
        {
          position: "top-left",
          autoClose: 5000, // Close the toast after 5 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        },
      );
      return;
    }
  }
  // Get the selected enzymes
  const enzymesToUse = getSelectedEnzymeNames(state.enzymes);

  // Validate that at least one enzyme was selected
  if (enzymesToUse.length === 0) {
    toast.error("No enzymes selected.", {
      position: "top-left",
      autoClose: 5000, // Close the toast after 5 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return;
  }

  // Get the minimum and maximum number of cutsites
  const minCuts = state.settings.minNumberOfCutsites;
  const maxCuts = state.settings.maxNumberOfCutsites;

  // validate that the minimum number of cutsites is less than the maximum number of cutsites
  if (minCuts > maxCuts) {
    toast.error(
      "Minimum number of cutsites is greater than the maximum number of cutsites.",
      {
        position: "top-left",
        autoClose: 5000, // Close the toast after 5 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      },
    );
    return;
  }

  // Get the display type
  const displayType = state.settings.displayType;

  // Log the form data to
  console.log("DNA to cut: ", dnaToCut);
  console.log("DNA to not cut: ", dnaToNotCut);
  console.log("Enzymes to use: ", enzymesToUse);
  console.log("Minimum cuts: ", minCuts);
  console.log("Maximum cuts: ", maxCuts);
  console.log("Display type: ", displayType);
}
