import { useSelector } from "react-redux";
import TextFileOutput from "./TextFileOutput";
import Loader from "./Loader";

function OutputContainer() {
  const settingsState = useSelector((store) => store.settings);
  const outputState = useSelector((store) => store.output);
  const submittedAtLeastOnce = settingsState.submittedAtLeastOnce;
  const outputLoading = outputState.outputLoading;
  const outputString = outputState.outputString;

  return (
    <div className="relative flex h-full flex-1 flex-col items-center justify-between gap-4 bg-[#10161B] px-20 pb-6 pt-6 align-middle outline outline-gray-200">
      <h1 className="text-xl">Output</h1>

      {outputLoading ? (
        <Loader />
      ) : (
        <TextFileOutput
          text={submittedAtLeastOnce ? outputString : ""}
          className="h-full w-full"
        />
      )}
      <footer>
        <p className="text-base text-gray-300">
          &copy; Copyright {new Date().getFullYear()} by Mark Pampuch.
        </p>
      </footer>
    </div>
  );
}

export default OutputContainer;
