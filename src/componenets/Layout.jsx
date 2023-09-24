import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import LeftNavbar from "./LeftNavbar";

export default function Layout() {
  const [isMobileScreen, setIsMobileScreen] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleScreenWidth = () => {
      if (window.innerWidth < 768) {
        setIsMobileScreen(true);
      } else {
        setIsMobileScreen(false);
      }
    };

    window.addEventListener("resize", handleScreenWidth);

    return () => window.removeEventListener("resize", handleScreenWidth);
  }, []);

  return (
    <div className="bg-black w-full h-full">
      <Navbar />
      <div className="bg-black w-full md:grid md:grid-cols-[minmax(100px,_200px)_minmax(100px,_1fr)]">
        {!isMobileScreen && <LeftNavbar />}
        <Outlet />
      </div>
    </div>
  );
}
// flex flex-row items-start justify-between
