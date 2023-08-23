function OutputContainer() {
  return (
    <div className="relative flex h-full flex-1 flex-col items-center bg-[#2d3439] px-20 pb-6 pt-6 outline outline-gray-200">
      <h1 className="text-xl">Output</h1>
      <footer className="mt-auto">
        <p className="text-base text-gray-300">
          &copy; Copyright {new Date().getFullYear()} by Mark Pampuch.
        </p>
      </footer>
    </div>
  );
}

export default OutputContainer;
