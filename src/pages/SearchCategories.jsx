import { useState } from "react";
import { useParams } from "react-router-dom";

import {
  MoviesByCategories,
  ALL_MOVIES_URL,
  configuration,
} from "../useHooks/useApi";
import PagesChangingBtns from "../componenets/PagesChangingBtns";
import MovieCard from "../componenets/MovieCard";
import LoadingAnim from "../componenets/LoadingAnim";
import addFavorites from "../useHooks/addFavorites";
import removeFavorite from "../useHooks/removeFavorite";

function SearchCategories() {
  const { id: genreCode } = useParams();
  const genreArr = genreCode?.split("-");
  const title = genreArr[0];
  const genreId = genreArr[1];
  const [curPage, setCurPage] = useState(1);
  const { moviesData, maxPage, error, isLoading } = MoviesByCategories(
    ALL_MOVIES_URL,
    curPage,
    genreId,
    genreCode
  );
  const [FavoritedIds, setFavoritedIds] = useState(
    JSON.parse(localStorage.getItem("favoritedItems")) || []
  );
  const [isTriggered, setIsTriggered] = useState(true);

  function handleTriggers() {
    setIsTriggered((prev) => !prev);
  }

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
        key={`-${movie.id}-1234`}
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
    <div
      className="w-full  sm:pl-3 text-center scroll-smooth min-h-[20rem]"
      id="topBorder"
    >
      <h1 className="text-white md:text-2xl ml-3 w-fit flex items-center">
        {title}
      </h1>
      {/* flex flex-wrap gap-5 justify-between */}
      <div className=" mx-auto w-full rounded-lg  flex flex-wrap gap-5 justify-around sm:justify-start">
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
}

export default SearchCategories;
