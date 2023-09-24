import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import NavButton from "../componenets/NavButton";
import { IoNavigateCircleOutline, IoBagCheckOutline } from "react-icons/io5";
import SearchInput from "../componenets/SearchInput";
export default function MovieNavbar() {
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
    <div className="w-full">
      <nav className="w-full p-3  flex flex-row items-center">
        <Link to="/" className="flex flex-row justify-center items-center">
          <img
            src="/images/main-logoV3.png"
            alt="Logo"
            className="mr-2 w-10 "
          />
          {!isMobileScreen && (
            <h1 className="text-gray-300 text-2xl sm:text-4xl font-semibold">
              <span className="text-red-600">Cinema</span>.Fy
            </h1>
          )}
        </Link>
        <SearchInput />
        <div className="flex justify-center items-center gap-5 brightness-200">
          <NavButton
            Icon={IoNavigateCircleOutline}
            to="/"
            text={!isMobileScreen ? "Browse" : ""}
            isNavLink={true}
          />
          <NavButton
            Icon={IoBagCheckOutline}
            to="/watchlist"
            text={!isMobileScreen ? "Watchlist" : ""}
            isNavLink={true}
          />
        </div>
      </nav>
    </div>
  );
}
