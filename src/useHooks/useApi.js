import { useEffect, useState } from "react";
import MovieCard from "../componenets/MovieCard";

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzFkMTQ1NzU3NzlhYWE1OThmM2YyNWEwYjMzZWViZSIsInN1YiI6IjY1MDk3MTUwZmEyN2Y0MDBjYWE1OWFkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Oa352t0TQ0JiUH0NkhH6GNMw-IaenynzEmpOcgC4iT8",
  },
};
export const GENRE_URL =
  "https://api.themoviedb.org/3/genre/movie/list?language=en";

export const TRENDING_MOVIES_URL =
  "https://api.themoviedb.org/3/trending/movie/week?language=en-US";
export const POPULAR_MOVIES_URL =
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
export const UPCOMING_MOVIES_URL =
  "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
export const TOP_RATED_MOVIES_URL =
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

export const ALL_MOVIES_URL =
  "https://api.themoviedb.org/3/discover/movie?language=en-US&page=";
// 'https://api.themoviedb.org/3/discover/movie?language=en-US&page=1&sort_by=popularity.desc&with_genres=action'
//
export const configuration = {
  images: {
    base_url: "http://image.tmdb.org/t/p/",
    secure_base_url: "https://image.tmdb.org/t/p/",
    backdrop_sizes: ["w300", "w780", "w1280", "original"],
    logo_sizes: ["w45", "w92", "w154", "w185", "w300", "w500", "original"],
    poster_sizes: ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
    profile_sizes: ["w45", "w185", "h632", "original"],
    still_sizes: ["w92", "w185", "w300", "original"],
  },
  change_keys: [
    "adult",
    "air_date",
    "also_known_as",
    "alternative_titles",
    "biography",
    "birthday",
    "budget",
    "cast",
    "certifications",
    "character_names",
    "created_by",
    "crew",
    "deathday",
    "episode",
    "episode_number",
    "episode_run_time",
    "freebase_id",
    "freebase_mid",
    "general",
    "genres",
    "guest_stars",
    "homepage",
    "images",
    "imdb_id",
    "languages",
    "name",
    "network",
    "origin_country",
    "original_name",
    "original_title",
    "overview",
    "parts",
    "place_of_birth",
    "plot_keywords",
    "production_code",
    "production_companies",
    "production_countries",
    "releases",
    "revenue",
    "runtime",
    "season",
    "season_number",
    "season_regular",
    "spoken_languages",
    "status",
    "tagline",
    "title",
    "translations",
    "tvdb_id",
    "tvrage_id",
    "type",
    "video",
    "videos",
  ],
};

/* export Functions Bellow  -------------------------------  */

export function useMovies(url) {
  const [data, setData] = useState({
    data: null,
    loading: true,
    error: "",
  });

  useEffect(() => {
    fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          setData((prev) => ({ ...prev, error: true }));
        }
        return res.json();
      })
      .then((moviesData) => {
        setData((prev) => ({
          ...prev,
          data: moviesData,
          loading: false,
        }));
      })
      .catch((err) => {
        setData((prev) => ({
          ...prev,
          error: err,
        }));
        console.error(err);
      })
      .finally(() => {
        setData((prev) => ({
          ...prev,
          loading: false,
        }));
      });
  }, [url]);

  return data;
}

export function findMovieData(id) {
  const [data, setData] = useState({
    data: null,
    loading: true,
    error: "",
  });
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=cc1d14575779aaa598f3f25a0b33eebe&?language=en-US&append_to_response=videos`,
      options
    )
      .then((res) => {
        if (!res.ok) {
          setData((prev) => ({ ...prev, error: true }));
        }
        return res.json();
      })
      .then((moviesData) => {
        setData((prev) => ({
          ...prev,
          data: moviesData,
          loading: false,
        }));
      })
      .catch((err) => {
        setData((prev) => ({
          ...prev,
          error: err,
        }));
        console.error(err);
      })
      .finally(() => {
        setData((prev) => ({
          ...prev,
          loading: false,
        }));
      });
  }, []);

  return data;
}

export function MoviesByCategories(url, page, genreId = null, genre = "") {
  const [moviesData, setMoviesData] = useState([]);
  const [maxPage, setMaxPage] = useState(undefined);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch(
      `${url}${page}&sort_by=popularity.desc&with_genres=${genreId || ""}`,
      options
    )
      .then((res) => {
        if (!res.ok) {
          setError("Something went wrong\n Please refresh the page");
          return moviesData ? moviesData : ["No Items Found"];
        }
        setError(null);
        return res.json();
      })
      .then((data) => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
        console.log(moviesData);
        setMoviesData(data.results);
        setMaxPage(data.total_pages);
      })
      .catch((err) => {
        console.log(err, "error catched in Catch");
        setError(err);
      })
      .finally(
        setTimeout(() => {
          setIsLoading(false);
        }, 500)
      );
  }, [page, genre]);

  return { moviesData, maxPage, error, isLoading };
}
export function searchMovies(page, searchQuery) {
  const [moviesData, setMoviesData] = useState([]);
  const [maxPage, setMaxPage] = useState(undefined);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&language=en-US&page=${page}`,
      options
    )
      .then((res) => {
        if (!res.ok) {
          setError("Something went wrong\n Please refresh the page");
          return moviesData ? moviesData : ["No Items Found"];
        }
        setError(null);
        return res.json();
      })
      .then((data) => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
        console.log(moviesData);
        setMoviesData(data.results);
        setMaxPage(data.total_pages);
      })
      .catch((err) => {
        console.log(err, "error catched in Catch");
        setError(err);
      })
      .finally(
        setTimeout(() => {
          setIsLoading(false);
        }, 500)
      );
  }, [page, searchQuery]);

  return { moviesData, maxPage, error, isLoading };
}
