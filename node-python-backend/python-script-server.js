// Import modules using ES module syntax
import express from "express";
import { spawn } from "child_process";
import bodyParser from "body-parser";
import { pythonScriptPort } from "../config/config.js";
import cors from "cors"; // Import the cors middleware using ES module syntax

const app = express();
const port = pythonScriptPort;

app.use(bodyParser.json()); // Parse JSON bodies
app.use(cors()); // Use the cors middleware to enable CORS

// Endpoint to execute Python script
app.post("/execute-python-script", (req, res) => {
  // Extract data from the request body
  const {
    dna_to_cut,
    dna_to_not_cut,
    enzymes,
    min_cuts,
    max_cuts,
    output_style,
  } = req.body;

  // Construct arguments for the Python script
  const pythonArgs = [
    "--dna_to_cut",
    dna_to_cut,
    "--dna_to_not_cut",
    dna_to_not_cut,
    "--enzymes",
    ...enzymes, // Spread enzymes array
    "--min_cuts",
    min_cuts,
    "--max_cuts",
    max_cuts,
    "--output_style",
    output_style,
  ];

  // Spawn Python process with arguments
  const pythonProcess = spawn("python", [
    "Restriction-js-to-python-script.py",
    ...pythonArgs,
  ]);

  // Handle stdout and stderr from the Python process
  pythonProcess.stdout.on("data", (data) => {
    console.log(`Python script output: ${data}`);
    res.send(data.toString()); // Send output back to client
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`Python script error: ${data}`);
    res.status(500).send(data.toString()); // Send error back to client
  });
});

app.listen(port, () => {
  console.log(
    `Python script execution server listening at http://localhost:${port}`,
  );
});
