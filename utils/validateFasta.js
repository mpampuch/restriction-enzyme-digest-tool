export function isFastaFormat(input) {
  // Split the input string into lines
  const lines = input.split("\n");

  // Check if the input has at least two lines (sequence description and data)
  if (lines.length < 2) {
    return "Format: Incorrect; Reason: Insufficient lines.";
  }

  // Check if the first line starts with '>'
  if (!lines[0].startsWith(">")) {
    return "Format: Incorrect; Reason: Sequence description missing.";
  }

  // Check if the sequence description line does not contain newlines
  if (lines[0].includes("\n")) {
    return "Format: Incorrect; Reason: Invalid sequence description.";
  }

  // Check if the sequence data lines do not contain '>'
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].startsWith(">")) {
      return "Format: Incorrect; Reason: Sequence description inside data.";
    }

    // Check if the sequence data contains only valid DNA characters
    if (!/^[ACGTacgt]+$/.test(lines[i])) {
      return `Format: Incorrect; Reason: Invalid DNA characters in sequence data (line ${
        i + 1
      }).`;
    }
  }

  // If all checks pass, it's in proper FASTA format
  return "Format: Correct";
}
