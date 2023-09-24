import { searchMovies } from "../useHooks/useApi";

//
import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export default function SearchInputValue() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isPressedEnter, setIsPressedEnter] = useState(false);
  const [inputValue, setInputValue] = useState("");

  function handleInputValue(e) {
    setInputValue(e.target.value);
  }
  function handleKeyPress(e) {
    if (inputValue.length > 0) {
      if (e.key === "Enter") {
        navigate(`/search/${inputValue}`);
      }
    }
  }

  return (
    <div
      onKeyDown={handleKeyPress}
      className="border-2 border-zinc-900 mx-auto rounded-full p-0 overflow-hidden flex flex-row justify-center items-center bg-zinc-900 w-[50%] md:w-[40%]"
    >
      <input
        type="text"
        value={inputValue}
        onChange={handleInputValue}
        className={`w-full h-full bg-transparent p-1 md:p-2 rounded-full  focus:outline-none
                    text-zinc-500
                        font-bold
                        text-sm
                        md:text-lg
               placeholder:text-zinc-500 
               placeholder:font-bold 
               placeholder:md:text-lg
               placeholder:text-sm
            `}
        placeholder="Search..."
      />
      {inputValue.length > 0 ? (
        <Link to={`/search/${inputValue}`} state={{ pathname: pathname }}>
          <FaSearch className="md:text-2xl mr-2 text-zinc-600 cursor-pointer" />
        </Link>
      ) : (
        <FaSearch className="md:text-2xl mr-2 text-zinc-600 cursor-pointer" />
      )}
    </div>
  );
}
