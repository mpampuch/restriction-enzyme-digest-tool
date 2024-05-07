import Button from "@mui/material/Button";
import Logo from "./Logo";
import BasicTabs from "./Tabs";
import { useStore } from "react-redux";
import { submit } from "../../utils/submit";
import { useSelector, useDispatch } from "react-redux";
import { setOutputLoading, setOutputString } from "../features/settingsSlice";

function Sidebar() {
  const store = useStore(); // Access the Redux store instance
  const settingsState = useSelector((store) => store.settings);
  const outputLoading = settingsState.outputLoading;

  const dispatch = useDispatch(); // Create a dispatcher

  const handleSubmit = async () => {
    dispatch(setOutputLoading(true)); // Set the outputLoading state to true
    console.log("submitting:");

    try {
      // Call the submit function and await its result
      const output = await submit(store);
      // Set the outputString state with the output
      dispatch(setOutputString(output));
      // Handle the output (data returned by the Python script)
      console.log("Python script output:", output);
      // Do further processing if needed
    } catch (error) {
      // Handle errors
      console.error("Error executing Python script:", error);
    } finally {
      // Set the outputLoading state to false
      dispatch(setOutputLoading(false));
    }

    console.log("done");
  };

  return (
    <div className="sidebar flex h-full basis-8/12 flex-col items-center bg-[#383843] px-10 pb-6 pt-6 outline  outline-gray-200">
      <Logo />
      <BasicTabs />
      <div className="mt-auto">
        {/* Add onClick handler to call handleSubmit when the button is clicked */}
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={outputLoading}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;
