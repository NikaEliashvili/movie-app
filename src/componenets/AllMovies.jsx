import { memo, useState } from "react";
import MovieCard from "./MovieCard";

import {
  MoviesByCategories,
  configuration,
  ALL_MOVIES_URL,
} from "../useHooks/useApi";
import addFavorites from "../useHooks/addFavorites";
import removeFavorite from "../useHooks/removeFavorite";

import LoadingAnim from "../componenets/LoadingAnim";
import PagesChangingBtns from "./PagesChangingBtns";

const AllMovies = memo(function AllMovies({ handleTriggers, FavoritedIds }) {
  const [curPage, setCurPage] = useState(1);
  const { moviesData, maxPage, error, isLoading } = MoviesByCategories(
    ALL_MOVIES_URL,
    curPage
  );

  function decPage() {
    setCurPage((prev) => prev - 1);
  }
  function incPage() {
    setCurPage((prev) => prev + 1);
  }

  const allMovieCards = moviesData?.map((movie) => {
    const posterBaseUrl = `${configuration?.images?.base_url}original`;

    return (
      <MovieCard
        key={`${movie.id}`}
        movie={movie}
        posterBaseUrl={posterBaseUrl}
        addFavorites={addFavorites}
        removeFavorite={removeFavorite}
        handleTriggers={handleTriggers}
        FavoritedIds={FavoritedIds}
      />
    );
  });

  if (isLoading) {
    return (
      <div className="w-full scroll-smooth min-h-[40rem] flex justify-center items-center">
        <LoadingAnim />
      </div>
    );
  }

  return (
    <div className="w-full  sm:pl-3 text-center scroll-smooth min-h-[20rem]">
      <h1
        className="text-white md:text-2xl text-xl ml-1 md:ml-0 w-fit "
        id="topBorder"
      >
        All Movies
      </h1>
      <div className="mx-auto w-full rounded-lg  flex flex-wrap gap-5 justify-around sm:justify-start">
        {allMovieCards}
      </div>
      <PagesChangingBtns
        curPage={curPage}
        maxPage={maxPage}
        decPage={decPage}
        incPage={incPage}
        error={error}
      />
      {error && <h1 className="text-red-300 italic text-xl">{error}</h1>}
    </div>
  );
});

export default AllMovies;

// <div className="text-orange-600 flex justify-center items-center gap-5 w-full py-4 ">
//   <button
//     onClick={() => {
//       setCurPage((prev) => prev - 1);
//     }}
//     className="flex flex-row text-center justify-center items-center text-2xl font-bold font-mono  bg-zinc-800 cursor-pointer rounded-sm transition duration-100 enabled:hover:bg-orange-900 enabled:hover:text-gray-300 enabled:active:scale-[0.97] disabled:text-zinc-600  disabled:cursor-default"
//     disabled={curPage === 1}
//   >
//     <a
//       href="#top-movies"
//       className="w-full flex flex-row text-center justify-center items-center py-1 pr-5 pl-2 scroll-smooth"
//     >
//       <RiArrowLeftSFill className="text-4xl" />
//       Prev
//     </a>
//   </button>
//   <h1 className="text-xl font-mono font-bold">{curPage}</h1>
//   <button
//     onClick={() => {
//       setCurPage((prev) => prev + 1);
//     }}
//     className="flex flex-row text-center justify-center items-center text-2xl font-bold font-mono  bg-zinc-800 cursor-pointer rounded-sm transition duration-100 enabled:hover:bg-orange-900 enabled:hover:text-gray-300 enabled:active:scale-[0.97] disabled:text-zinc-600 disabled:cursor-default"
//     disabled={error || curPage === maxPage}
//   >
//     <a
//       href="#top-movies"
//       className="w-full flex flex-row text-center justify-center items-center py-1 pl-5 pr-2 scroll-smooth"
//     >
//       Next
//       <RiArrowRightSFill className="text-4xl" />
//     </a>
//   </button>
// </div>
