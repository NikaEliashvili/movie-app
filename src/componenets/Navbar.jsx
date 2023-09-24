import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import NavButton from "./NavButton";

import { IoNavigateCircleOutline, IoBagCheckSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { useMovies, GENRE_URL } from "../useHooks/useApi";
import SearchInput from "./SearchInput";

export default function Navbar() {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(window.innerWidth < 768);
  const { data } = useMovies(GENRE_URL);

  function handleOpen() {
    setIsOpen((prev) => !prev);
  }

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

  const allGenres = data?.genres.map((genre) => {
    const baseClass =
      "py-1 w-full hover:bg-slate-800 hover:text-white text-center text-lg";
    return (
      <NavLink
        onClick={handleOpen}
        key={genre.id}
        to={`/categories/${genre.name}-${genre.id}`}
        className={({ isActive }) =>
          isActive
            ? `${baseClass} bg-slate-700 text-white`
            : `${baseClass} text-gray-400`
        }
      >
        {genre.name}
      </NavLink>
    );
  });

  return (
    <div className="w-full relative">
      <nav className="w-full p-3  flex flex-row items-center">
        <Link to="/" className="flex flex-row justify-center items-center">
          <img
            src="/images/main-logoV3.png"
            alt="Logo"
            className="mr-2 lg:w-10 w-6"
          />
          {!isMobileScreen && (
            <h1 className="text-gray-300 text-xl md:text-2xl lg:text-4xl font-semibold">
              <span className="text-red-600">Cinema</span>.Fy
            </h1>
          )}
        </Link>
        <SearchInput />
        {isMobileScreen && pathname === "/watchlist" ? (
          <NavButton Icon={IoNavigateCircleOutline} to="/" text="Browse" />
        ) : isMobileScreen && pathname === "/" ? (
          <NavButton Icon={IoBagCheckSharp} to="/watchlist" text="Watchlist" />
        ) : isMobileScreen ? (
          <div className="flex justify-center items-center gap-5 brightness-200">
            <NavButton
              Icon={IoNavigateCircleOutline}
              to="/"
              text={!isMobileScreen ? "Browse" : ""}
              isNavLink={true}
            />
            <NavButton
              Icon={IoBagCheckSharp}
              to="/watchlist"
              text={!isMobileScreen ? "Watchlist" : ""}
              isNavLink={true}
            />
          </div>
        ) : null}
      </nav>
      {isMobileScreen && (
        <>
          <div
            onClick={handleOpen}
            className=" w-full text-white bg-slate-900 flex justify-center items-center sm:text-xl text-sm font-bold md:py-3 py-2 gap-3 cursor-pointer hover:bg-slate-900 hover:text-gray-400"
          >
            <GiHamburgerMenu className="md:text-3xl text-lg" /> Categories
          </div>
          {isOpen && (
            <div className=" absolute bottom-[0] translate-y-[100%] z-[11] w-full h-[300%] flex flex-col justify-start items-center overflow-auto bg-slate-900 brightness-75 cursor-pointer ">
              {allGenres}
            </div>
          )}
        </>
      )}
    </div>
  );
}
