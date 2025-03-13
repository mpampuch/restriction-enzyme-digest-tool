// Import modules using ES module syntax
import express from "express";
import { spawn } from "child_process";
import bodyParser from "body-parser";
// import { pythonScriptPort } from "../frontend/config/config.js";
import cors from "cors"; // Import the cors middleware using ES module syntax

const app = express();
// Get environment variable for the port number
const port = process.env.PORT;
// const port = process.env.PORT || 3001;
// const port = 3001;
const host = process.env.HOST || "0.0.0.0"; // Use '0.0.0.0' to listen on all network interfaces

app.use(bodyParser.json()); // Parse JSON bodies
app.use(cors()); // Use the cors middleware to enable CORS

// Define a route for the root path
app.get("/", (req, res) => {
  res.send(`Python backend is running. Host is ${host}. Port is ${port}.`);
});

// Endpoint to execute Python script
app.post("/execute-python-script", (req, res) => {
  // Extract data from the request body
  const {
    dna_to_cut,
    dna_to_not_cut,
    enzymes,
    min_cuts,
    max_cuts,
    max_cuts_enabled,
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
    "--max_cuts_enabled",
    max_cuts_enabled,
    "--max_cuts",
    max_cuts,
    "--output_style",
    output_style,
  ];

  // Spawn Python process with arguments
  const pythonProcess = spawn("python3", [
    "/app/Restriction-js-to-python-script.py",
    ...pythonArgs,
  ]);

  // Handle stdout and stderr from the Python process
  let stdoutBuffer = ""; // Buffer to accumulate stdout data

  // Event handler for stdout data
  pythonProcess.stdout.on("data", (data) => {
    stdoutBuffer += data.toString(); // Append data to the buffer
  });

  // Event handler for end of stdout
  pythonProcess.stdout.on("end", () => {
    // console.log("All stdout data received.");
    // console.log(`Python script output: ${stdoutBuffer}`);
    // Send accumulated stdout data back to the client
    res.send(stdoutBuffer);
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
