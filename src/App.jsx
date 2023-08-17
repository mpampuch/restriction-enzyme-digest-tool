import { lazy } from "react";

const AppLayout = lazy(() => import("./pages/AppLayout"));

// dist/assets/index-59fcab9b.css   30.56 kB │ gzip:   5.14 kB
// dist/assets/index-f7c12d89.js   572.44 kB │ gzip: 151.29 kB

function App() {
  return <AppLayout />;
}

export default App;
