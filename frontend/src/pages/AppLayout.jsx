import OutputContainer from "../components/OutputContainer";
import Sidebar from "../components/Sidebar";

function AppLayout() {
  return (
    <div className="relative flex h-screen overscroll-y-none bg-gray-300 p-1">
      <Sidebar />

      <OutputContainer />
    </div>
  );
}

export default AppLayout;
