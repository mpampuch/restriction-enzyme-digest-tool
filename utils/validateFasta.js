export function isFastaFormat(input) {
  // Split the input string into lines
  const lines = input.split("\n");

  // Check if the input has at least two lines (sequence description and data)
  if (lines.length < 2) {
    return "Reason: Insufficient lines";
  }

  // Check if the odd lines starts with '>'
  for (let i = 0; i < lines.length; i += 2) {
    // Iterate over even lines
    if (!lines[i].startsWith(">")) {
      return `Reason: Sequence description missing (line ${i + 1}).`;
    }
    // Check if the sequence description line does not contain newlines
    if (lines[i].includes("\n")) {
      return `Reason: Invalid sequence description (line ${i + 1}).`;
    }

    // Check if the sequence description line (odd line) starts with '>' and contains only whitespace after '>'
    if (!/^>\s*\S/.test(lines[i])) {
      return `Reason: Sequence description missing or empty (line ${i + 1}).`;
    }
  }

  // Check if the sequence data lines do not contain '>'
  for (let i = 1; i < lines.length; i += 2) {
    // Iterate over even lines
    if (lines[i].startsWith(">")) {
      return `Reason: Sequence description inside data (line ${i + 1}).`;
    }

    // Check if the sequence data contains only valid DNA characters
    if (!/^[ACGTacgt]+$/.test(lines[i])) {
      return `Reason: Invalid DNA characters in sequence data (line ${i + 1}).`;
    }
  }

  // If all checks pass, it's in proper FASTA format
  return "Format: Correct";
}
