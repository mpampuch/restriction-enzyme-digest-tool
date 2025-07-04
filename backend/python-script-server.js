// Import modules using ES module syntax
import express from "express";
import { spawn } from "child_process";
import bodyParser from "body-parser";
import cors from "cors"; // Import the cors middleware using ES module syntax
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Get environment variable for the port number
const port = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0"; // Use '0.0.0.0' to listen on all network interfaces

app.use(bodyParser.json()); // Parse JSON bodies
app.use(cors()); // Use the cors middleware to enable CORS

// Serve static files from the frontend build
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Define a route for the root path
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// API endpoint to execute Python script
app.post("/api/execute-python-script", (req, res) => {
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
    "/app/backend/Restriction-js-to-python-script.py",
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

// Handle all other routes by serving the frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
