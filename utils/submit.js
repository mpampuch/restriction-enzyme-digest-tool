import { getSelectedEnzymeNames } from "./getSelectedEnzymes";
import { isFastaFormat } from "./validateFasta";
import { showToast } from "./showToast";
import { pythonScriptPort } from "../config/config";

export function submit(store) {
  // Get the current state of the Redux store
  const state = store.getState();

  console.log("Submitting form...");

  // Get the DNA sequence to cut
  const dnaToCut = state.settings.inputString.trim();

  // Validate the the input was not empty
  if (dnaToCut === "") {
    showToast("No input DNA sequence provided.");
    return;
  }

  // Validate that the input was a valid FASTA format
  const dnaToCutFastaValidation = isFastaFormat(dnaToCut);
  if (dnaToCutFastaValidation !== "Format: Correct") {
    showToast(
      `DNA input is not in proper FASTA format. ${dnaToCutFastaValidation}`,
    );
    return;
  }

  // Check if the overall string is less than 100kb
  if (dnaToCut.length > 100 * 1024) {
    showToast("DNA input sequence exceeds 100kb limit");
  }

  // Get the DNA sequence to not cut
  const dnaToNotCut = state.settings.restrictedInputString.trim();

  // Validate that the input was a valid FASTA format if it was provided
  if (dnaToNotCut !== "") {
    const dnaToNotCutFastaValidation = isFastaFormat(dnaToNotCut);
    if (dnaToNotCutFastaValidation !== "Format: Correct") {
      showToast(
        `Restricted DNA input is not in proper FASTA format. ${dnaToNotCutFastaValidation}`,
      );
      return;
    }
  }

  // Check if the overall string is less than 100kb
  if (dnaToNotCut.length > 100 * 1024) {
    showToast("Restricted DNA input sequence exceeds 100kb limit");
  }

  // Get the selected enzymes
  const enzymesToUse = getSelectedEnzymeNames(state.enzymes);

  // Validate that at least one enzyme was selected
  if (enzymesToUse.length === 0) {
    showToast("No enzymes selected.");
    return;
  }

  // Get the minimum and maximum number of cutsites
  const minCuts = state.settings.minNumberOfCutsites;
  const maxCuts = state.settings.maxNumberOfCutsites;

  // validate that the minimum number of cutsites is less than the maximum number of cutsites
  if (minCuts > maxCuts) {
    showToast(
      "Minimum number of cutsites is greater than the maximum number of cutsites.",
    );
    return;
  }

  // Get the display type
  const displayType = state.settings.displayType;
  const diplayTypeConversion = {
    detailed: "map",
    "cutsite-locations": "list",
    "number-of-cutsites": "number",
  };
  const displayTypeConverted = diplayTypeConversion[displayType];

  // Log the form data to
  console.log("DNA to cut: ", dnaToCut);
  console.log("DNA to not cut: ", dnaToNotCut);
  console.log("Enzymes to use: ", enzymesToUse);
  console.log("Minimum cuts: ", minCuts);
  console.log("Maximum cuts: ", maxCuts);
  console.log("Display type: ", displayType);
  console.log("Display type converted: ", displayTypeConverted);

  // Construct the data object to send to the server
  const formData = {
    dna_to_cut: dnaToCut,
    dna_to_not_cut: dnaToNotCut,
    enzymes: enzymesToUse,
    min_cuts: minCuts,
    max_cuts: maxCuts,
    output_style: displayTypeConverted,
  };

  // Send the form data to the server
  console.log("Sending form data to server...");
  fetch(`http://localhost:${pythonScriptPort}/execute-python-script`, {
    // Update URL to localhost:3000
    method: "POST",
    body: JSON.stringify(formData), // Convert formData to JSON string
    headers: {
      "Content-Type": "application/json", // Set content type to JSON
    },
  })
    .then((response) => response.text())
    .then((data) => {
      console.log("Python script output:", data);
      // Handle the output as needed
    })
    .catch((error) => {
      console.error("Error executing Python script:", error);
      // Handle errors
    });
}
