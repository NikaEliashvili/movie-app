import { useEffect, useState } from "react";

import MovieCard from "../componenets/MovieCard";
import { configuration } from "../useHooks/useApi";

import addFavorites from "../useHooks/addFavorites";
import removeFavorite from "../useHooks/removeFavorite";

export default function Watchlist() {
  const [watchList, setWatchlist] = useState(
    JSON.parse(localStorage.getItem("favoritedItems")) || []
  );
  const [FavoritedIds, setFavoritedIds] = useState(
    JSON.parse(localStorage.getItem("favoritedItems")) || []
  );
  const [isTriggered, setIsTriggered] = useState(true);
  const set = new Set();
  const filteredWatchlist =
    watchList?.filter((o) => {
      if (set.has(o.id)) return false;
      set.add(o.id);
      return true;
    }) || [];

  const handleWatchlist = () => {
    setWatchlist(JSON.parse(localStorage.getItem("favoritedItems")) || []);
  };

  function handleTriggers() {
    setIsTriggered((prev) => !prev);
  }

  useEffect(() => {
    handleWatchlist();
  }, [addFavorites, removeFavorite, isTriggered]);

  //

  const favoriteItems = filteredWatchlist?.reverse()?.map((movie) => {
    const posterBaseUrl = `${configuration?.images?.base_url}original`;
    return (
      <MovieCard
        key={`card-${movie.id}`}
        movie={movie}
        posterBaseUrl={posterBaseUrl}
        addFavorites={addFavorites}
        removeFavorite={removeFavorite}
        handleTriggers={handleTriggers}
        FavoritedIds={FavoritedIds}
      />
    );
  });
  if (filteredWatchlist?.length === 0) {
    return (
      <div className="w-full text-center mt-4">
        <h1 className="text-gray-300 font-serif text-md w-full text-left italic">
          No items found ...
        </h1>
      </div>
    );
  }
  return (
    <div className="w-full text-center px-5">
      <h1 className="text-white text-2xl w-fit">Watchlist</h1>
      <div
        className=" w-full rounded-lg  flex flex-wrap gap-5 
        "
      >
        {favoriteItems}
      </div>
    </div>
  );
}
