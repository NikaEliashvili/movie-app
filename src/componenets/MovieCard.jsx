import { memo, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { BsPlus } from "react-icons/bs";
import { BsFillPlayFill, BsFillBagCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";

import { LazyLoadImage } from "react-lazy-load-image-component";
import lozad from "lozad";
import errorImgUrl from "/images/404error.jpg";

const MovieCard = memo(function MovieCard({
  addFavorites,
  removeFavorite,
  handleTriggers,
  movie,
  posterBaseUrl,
  FavoritedIds,
}) {
  const [isFavorited, setIsFavorited] = useState(
    FavoritedIds?.some((item) => item.id === movie.id) || false
  );
  useEffect(() => {
    setIsFavorited(FavoritedIds?.some((item) => item.id === movie.id) || false);
  }, [FavoritedIds]);
  const location = useLocation();

  const handleIsFavorite = () => {
    setIsFavorited(!isFavorited);
  };
  const imagePath = movie?.poster_path
    ? posterBaseUrl + movie?.poster_path
    : errorImgUrl;

  const observer = lozad();
  observer.observe();
  return (
    <div
      key={movie?.id}
      className="relative group flex-shrink-0 bg-gradient-to-br from-indigo-500 to-indigo-300 md:w-[9rem] md:min-h-[12rem] w-[6rem] min-h-[5rem] rounded-lg flex justify-center items-center animate-wiggle transform-none  overflow-hidden grow-1"
    >
      <LazyLoadImage
        className={`lozard w-full h-full object-cover brightness-105 cursor-pointer animate-imgTransition 
        group-hover:brightness-[20%] gradient-to-r
        delay-300 duration-500 transition rounded-md
        ${!movie?.poster_path && "bg-gray-300 brightness-75"}
        `}
        src={imagePath}
        alt={movie?.title + " Poster"}
      />
      <div
        className="absolute bottom-0 w-full h-[70%] bg-slate-950 opacity-0 translate-y-full cursor-poineter delay-300 duration-500 transition
      group-hover:opacity-100
      group-hover:translate-y-0
      "
      >
        <div className="flex flex-row justify-start items-center gap-3 px-2 pt-2 pb-1">
          <Link
            to={"/movies/" + movie.id}
            state={{ prevPath: location?.pathname }}
            className="flex flex-row justify-center items-center bg-white rounded-full md:w-7 md:h-7 w-4 h-4 hover:bg-gray-400
            "
          >
            <BsFillPlayFill className="md:ml-1 ml-[1px] text-slate-900 md:text-3xl " />
          </Link>
          {!isFavorited ? (
            <div
              onClick={() => {
                handleIsFavorite();
                handleTriggers();
                addFavorites(movie);
              }}
              className="cursor-pointer flex flex-row justify-center items-center border-2 broder-white rounded-full md:w-7 md:h-7 w-4 h-4 hover:border-gray-400 hover:text-gray-400 text-white
            "
            >
              <BsPlus className=" md:text-3xl" />
            </div>
          ) : (
            <div
              onClick={() => {
                handleIsFavorite();
                handleTriggers();
                removeFavorite(movie?.id);
              }}
              className="cursor-pointer flex flex-row justify-center items-center border-0 broder-white rounded-full md:w-7 md:h-7 w-4 h-4 hover:border-gray-400 hover:text-gray-400 text-white
            "
            >
              <BsFillBagCheckFill className=" md:text-3xl" />
            </div>
          )}
        </div>
        <div className="text-white cursor-pointer flex flex-col w-full justify-start items-start md:px-3 px-2">
          <p className="md:text-sm text-[10px] text-left ">
            {movie?.title?.length > 20
              ? movie?.title.slice(0, 20) + "..."
              : movie?.title}
          </p>
          <div className="flex flex-col w-full justify-start items-start  md:mt-2">
            {movie?.vote_average && (
              <p className="flex justify-between items-center gap-1 ml-auto md:text-sm text-[10px]">
                <AiFillStar className="mt-[2px] text-orange-400" />
                {movie?.vote_average - parseInt(movie?.vote_average) === 0
                  ? movie?.vote_average + ".0"
                  : movie?.vote_average?.toFixed(1)}
              </p>
            )}
            {movie?.release_date && (
              <p className="md:text-xs text-[8px]  text-left ml-auto text-zinc-300">
                {movie?.release_date}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default MovieCard;
