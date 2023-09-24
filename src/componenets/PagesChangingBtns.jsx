import { memo } from "react";
import { RiArrowLeftSFill, RiArrowRightSFill } from "react-icons/ri";

const PagesChangingBtns = memo(function PagesChangingBtns({
  curPage,
  maxPage,
  error,
  incPage,
  decPage,
}) {
  return (
    <div className="text-orange-600 flex justify-center items-center gap-5 w-full py-4 ">
      <button
        onClick={decPage}
        className="group flex flex-row text-center justify-center items-center text-2xl font-bold font-mono  bg-zinc-800 cursor-pointer rounded-sm transition duration-100 enabled:hover:bg-orange-900 enabled:hover:text-gray-300 enabled:active:scale-[0.97] disabled:text-zinc-600  "
        disabled={curPage === 1}
      >
        <a
          href="#topBorder"
          className="w-full flex flex-row text-center justify-center items-center py-1 pr-5 pl-2 scroll-smooth group-disabled:cursor-default group:cursor-pointer "
        >
          <RiArrowLeftSFill className="text-4xl" />
          Prev
        </a>
      </button>
      <h1 className="text-xl font-mono font-bold">{curPage}</h1>
      <button
        onClick={incPage}
        className="group flex flex-row text-center justify-center items-center text-2xl font-bold font-mono  bg-zinc-800 cursor-pointer rounded-sm transition duration-100 enabled:hover:bg-orange-900 enabled:hover:text-gray-300 enabled:active:scale-[0.97] disabled:text-zinc-600"
        disabled={error || curPage === maxPage}
      >
        <a
          href="#topBorder"
          className="w-full flex flex-row text-center justify-center items-center py-1 pl-5 pr-2 scroll-smooth  group-disabled:cursor-default group:cursor-pointer"
        >
          Next
          <RiArrowRightSFill className="text-4xl" />
        </a>
      </button>
    </div>
  );
});

export default PagesChangingBtns;
