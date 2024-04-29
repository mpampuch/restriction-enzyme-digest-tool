import { useState, useEffect } from "react";
import TextFileOutput from "./TextFileOutput";
// import if
import restrictionDigestAnalysis from "../outputs/restriction-digest-analysis.txt"; // Import the .txt file

function OutputContainer() {
  const [fileContent, setFileContent] = useState(""); // State to hold the file content

  useEffect(() => {
    // Fetch the content of the .txt file
    fetch(restrictionDigestAnalysis)
      .then((response) => response.text())
      .then((data) => {
        setFileContent(data); // Set the content in state
      })
      .catch((error) => {
        console.error("Error fetching file content:", error);
      });
  }, []); // Empty dependency array to run the effect only once

  return (
    <div className="relative flex h-full flex-1 flex-col items-center justify-between gap-4 bg-[#10161B] px-20 pb-6 pt-6 align-middle outline outline-gray-200">
      <h1 className="text-xl">Output</h1>

      <TextFileOutput text={fileContent} className="h-full w-full" />

      <footer>
        <p className="text-base text-gray-300">
          &copy; Copyright {new Date().getFullYear()} by Mark Pampuch.
        </p>
      </footer>
    </div>
  );
}

export default OutputContainer;
