import Button from "@mui/material/Button";
import Logo from "./Logo";
import BasicTabs from "./Tabs";

function Sidebar() {
  return (
    <div className="flex h-full basis-8/12 flex-col items-center bg-[#708090] px-10 pb-6 pt-6 outline  outline-gray-200">
      <Logo />
      <BasicTabs />
      <div className="mt-auto">
        <Button variant="contained">Submit</Button>
      </div>
    </div>
  );
}

export default Sidebar;
