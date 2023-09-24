import { useState } from "react";
import { useParams } from "react-router-dom";

import { configuration, searchMovies } from "../useHooks/useApi";
import PagesChangingBtns from "../componenets/PagesChangingBtns";
import MovieCard from "../componenets/MovieCard";
import LoadingAnim from "../componenets/LoadingAnim";
import addFavorites from "../useHooks/addFavorites";
import removeFavorite from "../useHooks/removeFavorite";

export default function SearchedMovies() {
  const { id: searchQuery } = useParams();
  const [curPage, setCurPage] = useState(1);
  const { moviesData, maxPage, error, isLoading } = searchMovies(
    curPage,
    searchQuery
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

  const sortedMoviesData = moviesData?.sort((a, b) =>
    a.popularity > b.popularity ? -1 : 1
  );

  const allMovieCards = sortedMoviesData?.map((movie) => {
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
    <div className="w-full text-center px-5" id="topBorder">
      <h1 className="text-white md:text-base  w-fit flex items-center gap-2 not-italic">
        {allMovieCards.length > 0 ? (
          "searched:"
        ) : (
          <span className="text-red-400">Could not be found:</span>
        )}
        <span className="italic text-lg  underline"> {searchQuery}</span>
      </h1>
      {/* flex flex-wrap gap-5 justify-between */}
      <div className=" w-full rounded-lg flex flex-wrap gap-5 justify-start">
        {allMovieCards}
      </div>
      {error && <h1 className="text-red-300 italic text-xl">{error}</h1>}
      <PagesChangingBtns
        curPage={curPage}
        maxPage={maxPage}
        decPage={decPage}
        incPage={incPage}
        error={error}
      />
    </div>
  );
}
