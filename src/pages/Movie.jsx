import { useState } from "react";

import { useLocation, useParams, Link } from "react-router-dom";

import { findMovieData, configuration } from "../useHooks/useApi";
import MovieNavbar from "../componenets/MovieNavbar";
import LoadingAnim from "../componenets/LoadingAnim";

import ErrorPage from "../pages/ErrorPage";
import errorImgUrl from "../../public/404Error.jpg";

import { AiOutlineArrowLeft } from "react-icons/ai";

export default function Movie() {
  const location = useLocation();
  const { id: movieId } = useParams();
  const { data: movieData, loading, error } = findMovieData(movieId);

  const videoUrl = `https://www.youtube.com/embed/${movieData?.videos?.results[0]?.key}`;
  const videoUrl2 = `https://www.youtube.com/watch?v=${movieData?.videos?.results[0]?.key}`;
  const imageUrl = movieData?.poster_path
    ? `${configuration?.images?.base_url}original${movieData?.poster_path}`
    : errorImgUrl;
  if (!loading && (movieData === null || !movieData || error)) {
    return <ErrorPage />;
  }

  const LoadingDiv = () => (
    <div className="w-full bg-slate-500">
      <div className="animate-pulse bg-slate-700 h-[50vh] lg:h-[70vh] flex justify-center items-center">
        <LoadingAnim />
      </div>
    </div>
  );

  function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <MovieNavbar />
      <Link
        to={location?.state?.prevPath || "/"}
        className="text-white w-fit mr-auto rounded-md p-2 flex flex-row justify-start items-center hover:text-gray-400 transition text-lg"
      >
        <AiOutlineArrowLeft className="pt-0" size={25} /> Go Back
      </Link>
      {loading ? (
        <LoadingDiv />
      ) : (
        <iframe
          className="w-full h-[50vh] lg:h-[70vh]"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          src={videoUrl}
        ></iframe>
      )}
      <a
        href={videoUrl2}
        target="_new"
        className="text-white font-bold italic underline w-full p-2 bg-red-500 text-center"
      >
        Watch on YouTube.com
      </a>
      {!loading ? (
        <div className="w-full  flex flex-row justify-start items-start bg-zinc-900 py-5 px-5 gap-5">
          <img
            className="w-[150px] text-white rounded-lg"
            src={imageUrl}
            alt={movieData?.title + " Poster"}
          />

          <div className="flex flex-col items-start justify-center ">
            <p className="text-zinc-100 text-4xl font-bold">
              {movieData?.title}
            </p>
            <p className="text-zinc-300  text-base italic font-extralight">
              -{movieData?.tagline}
            </p>
            <hr className="h-px w-[90%] my-1 bg-zinc-800 opacity-5" />
            <p className="text-gray-300 font-bold">
              <span className="font-normal text-gray-300 ">
                {movieData?.genres.map((g) => g.name).join(", ")}
              </span>
            </p>
            <hr className="h-px w-[90%] my-1 bg-zinc-800 opacity-5" />
            <p className="text-gray-300 font-bold max-w-[90%]">
              <span className="font-sans font-normal text-gray-300">
                {movieData?.overview}
              </span>
            </p>
            <hr className="h-px w-[90%] my-1 bg-zinc-800 opacity-5" />
            {movieData?.budget > 0 && (
              <p className="text-gray-300 font-bold w-[90%]  text-right">
                <span className="font-normal font-mono text-gray-300 ">
                  {numberWithSpaces(movieData?.budget)} $
                </span>
              </p>
            )}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
