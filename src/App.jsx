import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./componenets/Layout";
import Browse from "./pages/Browse";
import Watchlist from "./pages/Watchlist";
import Movie from "./pages/Movie";
import SearchedMovies from "./pages/SearchedMovies";

import {
  useMovies,
  TRENDING_MOVIES_URL,
  POPULAR_MOVIES_URL,
  TOP_RATED_MOVIES_URL,
  UPCOMING_MOVIES_URL,
  configuration,
} from "./useHooks/useApi";
import SearchCategories from "./pages/SearchCategories";
import ErrorPage from "./pages/ErrorPage";
import LoadingAnim from "./componenets/LoadingAnim";

function App() {
  const {
    data: trendingsData,
    loading: trendingLoading,
    error,
  } = useMovies(TRENDING_MOVIES_URL);
  const { data: topRatedData, loading: topRatedLoading } =
    useMovies(TOP_RATED_MOVIES_URL);
  const { data: upcomingData, loading: upcomingLoading } =
    useMovies(UPCOMING_MOVIES_URL);
  const { data: allMoviesData, loading: allMoviesLoading } =
    useMovies(POPULAR_MOVIES_URL);
  const imageBaseUrl = `${configuration?.images?.base_url}original`;
  const trendingMovies = trendingsData?.results;
  const randomIndex = Math.floor(Math.random() * trendingMovies?.length);
  const randomTrendingMovie = trendingMovies && trendingMovies[randomIndex];
  //
  const topRatedDataResults = topRatedData?.results.slice(0, 10);
  const upcomingDataResults = upcomingData?.results.slice(0, 10);

  if (
    !topRatedData ||
    !upcomingData ||
    !allMoviesData ||
    topRatedLoading ||
    upcomingLoading ||
    allMoviesLoading
  ) {
    return (
      <div className="w-full h-[100vh] bg-zinc-950 flex justify-center items-center">
        <LoadingAnim />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Layout />}>
          <Route
            exact
            index
            element={
              <Browse
                randomTrendingMovie={randomTrendingMovie}
                imageBaseUrl={imageBaseUrl}
                trendingLoading={trendingLoading}
                error={error.stack}
                topRatedData={topRatedDataResults}
                topRatedLoading={topRatedLoading}
                trendingData={trendingMovies}
                upcomingData={upcomingDataResults}
              />
            }
          />
          <Route exact path="watchlist" element={<Watchlist />} />
          <Route exact path="categories/:id" element={<SearchCategories />} />
          <Route exact path="search/:id" element={<SearchedMovies />} />
        </Route>
        <Route exact path="/movies/:id" element={<Movie />} />
        <Route exact path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
