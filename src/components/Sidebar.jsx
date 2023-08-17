import Logo from "./Logo";

function Sidebar() {
  return (
    <div className="flex h-full basis-8/12 flex-col items-center bg-[#42484d] px-10 pb-6 pt-6">
      <Logo />
    </div>
  );
}

export default Sidebar;
