import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const MOBILE_BREAKPOINT = 768; // px

export default function ResponsiveGuard({ children }) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT,
  );

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {children}
      {isMobile && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            minHeight: "100vh",
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#222",
            color: "#fff",
            fontSize: "1.5rem",
            textAlign: "center",
            padding: "2rem",
          }}
        >
          This application is only available on desktop-sized screens. <br />
          Please use the correct device or enlarge your browser window.
        </div>
      )}
    </>
  );
}

ResponsiveGuard.propTypes = {
  children: PropTypes.node,
};
