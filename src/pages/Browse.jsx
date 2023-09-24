import { memo, useState, useEffect } from "react";
import Billboard from "../componenets/Billboard";
import MoviesList from "../componenets/MoviesList";
import AllMovies from "../componenets/AllMovies";
import LoadingPulse from "../componenets/LoadingPulse";

import addFavorites from "../useHooks/addFavorites";
import removeFavorite from "../useHooks/removeFavorite";
//

const Browse = memo(function Browse({
  imageBaseUrl,
  randomTrendingMovie,
  trendingLoading,
  error,
  topRatedData,
  topRatedLoading,
  trendingData,
  upcomingData,
}) {
  const [isTriggered, setIsTriggered] = useState(true);

  const [FavoritedIds, setFavoritedIds] = useState(
    JSON.parse(localStorage.getItem("favoritedItems")) || []
  );
  function handleTriggers() {
    setIsTriggered((prev) => !prev);
  }
  useEffect(() => {
    setFavoritedIds(JSON.parse(localStorage.getItem("favoritedItems")) || []);
  }, [addFavorites, removeFavorite, isTriggered]);

  if (error) {
    return (
      <div className="w-full text-center  h-[20rem] flex flex-col items-center justify-center">
        <h1 className="text-gray-400 text-center text-md ">
          <span className="text-xl text-red-400">Error Occured: </span>
          {error}
        </h1>
      </div>
    );
  }

  if (trendingLoading || topRatedLoading) {
    return <LoadingPulse />;
  }

  return (
    <div className="w-full text-center md:px-2  min-h-fit flex flex-col items-center justify-start">
      <Billboard
        baseUrl={imageBaseUrl}
        srcUrl={randomTrendingMovie?.backdrop_path}
        randomTrendingMovie={randomTrendingMovie}
        title={randomTrendingMovie?.title}
        description={randomTrendingMovie?.overview}
        movieId={randomTrendingMovie?.id}
        handleTriggers={handleTriggers}
        FavoritedIds={FavoritedIds}
      />
      <MoviesList
        data={upcomingData}
        listTitle="Upcoming"
        handleTriggers={handleTriggers}
        FavoritedIds={FavoritedIds}
      />
      <MoviesList
        data={trendingData}
        listTitle="Trending"
        handleTriggers={handleTriggers}
        FavoritedIds={FavoritedIds}
      />
      <MoviesList
        data={topRatedData}
        listTitle="Popular"
        handleTriggers={handleTriggers}
        FavoritedIds={FavoritedIds}
      />
      <AllMovies handleTriggers={handleTriggers} FavoritedIds={FavoritedIds} />
    </div>
  );
});

export default Browse;
