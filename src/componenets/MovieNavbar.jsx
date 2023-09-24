import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import NavButton from "../componenets/NavButton";
import { IoNavigateCircleOutline } from "react-icons/io5";
import { BsFillBagCheckFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";

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
          <img src="/main-logoV3.png" alt="Logo" className="mr-2 w-10 " />
          {!isMobileScreen && (
            <h1 className="text-gray-300 text-2xl sm:text-4xl font-semibold">
              <span className="text-red-600">Cinema</span>.Fy
            </h1>
          )}
        </Link>
        <div className="border-2 border-zinc-900 mx-auto rounded-full p-0 overflow-hidden flex flex-row justify-center items-center bg-zinc-900 w-[50%] md:w-[40%]">
          <input
            type="text"
            className={`w-full h-full bg-transparent p-2 rounded-full  focus:outline-none
                    text-zinc-500
                        font-bold
                        text-lg
               placeholder:text-zinc-500 
               placeholder:font-bold 
               placeholder:text-lg
            `}
            placeholder="Search..."
          />
          <FaSearch className="text-2xl mr-2 text-zinc-600 cursor-pointer" />
        </div>{" "}
        <div className="flex justify-center items-center gap-5 brightness-200">
          <NavButton
            Icon={IoNavigateCircleOutline}
            to="/"
            text={!isMobileScreen ? "Browse" : ""}
            isNavLink={true}
          />
          <NavButton
            Icon={BsFillBagCheckFill}
            to="/watchlist"
            text={!isMobileScreen ? "Watchlist" : ""}
            isNavLink={true}
          />
        </div>
      </nav>
    </div>
  );
}
