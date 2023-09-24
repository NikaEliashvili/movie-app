import { NavLink } from "react-router-dom";
import { IoNavigateCircleOutline } from "react-icons/io5";
import { AiOutlineHeart } from "react-icons/ai";
import NavButton from "./NavButton";
export default function FeedButtons() {
  return (
    <div className="max-h-[30%] mx-2 ">
      <h1 className="text-zinc-600 text-xs ml-1 mb-5  font-semibold">Feed</h1>
      <div className="flex flex-col justify-center items-start gap-5">
        <div className="w-full flex flex-row justify-start items-center gap-2">
          <NavButton
            to="/"
            text="Browse"
            Icon={IoNavigateCircleOutline}
            isNavLink={true}
          />
        </div>
        <div className="w-full flex flex-row justify-start items-center gap-2">
          <NavButton
            to="/watchlist"
            text="Watchlist"
            Icon={AiOutlineHeart}
            isNavLink={true}
          />
        </div>
      </div>
    </div>
  );
}
