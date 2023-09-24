import { memo } from "react";
import { configuration } from "../useHooks/useApi";
import { useHorizontalScroll } from "../useHooks/useSideScroll";
import MovieCard from "./MovieCard";

import addFavorites from "../useHooks/addFavorites";
import removeFavorite from "../useHooks/removeFavorite";
//

const MoviesList = memo(function MoviesList({
  data,
  listTitle,
  handleTriggers,
  FavoritedIds,
}) {
  const scrollRef = useHorizontalScroll();
  const posterBaseUrl = `${configuration?.images?.base_url}original`;

  const allMovieCards = data
    ?.sort((a, b) => (a.vote_average > b.vote_average ? -1 : 1))
    ?.map((movie) => (
      <MovieCard
        key={`${movie.id}-567890`}
        movie={movie}
        posterBaseUrl={posterBaseUrl}
        addFavorites={addFavorites}
        removeFavorite={removeFavorite}
        handleTriggers={handleTriggers}
        FavoritedIds={FavoritedIds}
      />
    ));
  // localStorage.clear();
  return (
    <div className="w-full mb-2  rounded-lg ">
      <h1 className="text-white text-xl md:text-2xl w-fit mr-auto mb-0 md:mb-2 ml-1 md:ml-0">
        {listTitle}
      </h1>
      <div
        ref={scrollRef}
        className="scroll-smooth w-full h-[200px] rounded-lg  flex flex-row overflow-x-auto gap-5 
        "
      >
        {allMovieCards}
      </div>
    </div>
  );
});

export default MoviesList;
