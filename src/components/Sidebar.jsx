import Button from "@mui/material/Button";
import Logo from "./Logo";
import BasicTabs from "./Tabs";
import { useStore } from "react-redux";
import { submit } from "../../utils/submit";

function Sidebar() {
  const store = useStore(); // Access the Redux store instance

  const handleSubmit = () => {
    submit(store); // Call the submit function
  };

  return (
    <div className="sidebar flex h-full basis-8/12 flex-col items-center bg-[#383843] px-10 pb-6 pt-6 outline  outline-gray-200">
      <Logo />
      <BasicTabs />
      <div className="mt-auto">
        {/* Add onClick handler to call handleSubmit when the button is clicked */}
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;
