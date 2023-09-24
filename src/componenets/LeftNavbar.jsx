import FeedButtons from "./FeedButtons";
import AllGenres from "./AllGenres";
import { useMovies } from "../useHooks/useApi";
import { GENRE_URL } from "../useHooks/useApi";

export default function LeftNavbar() {
  const { data, loading, error } = useMovies(GENRE_URL);
  // console.log(error.stack.length, error.stack);
  return (
    <>
      <div className="bg-zinc-950 flex flex-col  h-full min-w-[10rem] w-full">
        <FeedButtons />
        {error.stack && (
          <div className="w-full h-[30rem] flex pt-[5rem] justify-center items-start text-red-100 text-xl relative">
            Occured Error
            <div className="animate-ping w-2 h-2 bg-red-600 rounded-full"></div>
          </div>
        )}
        {!error.stack &&
          (loading ? (
            <div className="w-full h-[30rem] flex justify-center items-start ">
              <div className="animate-spin mt-[5rem] w-10 h-10  border-blue-700 border-l-8  border-dotted rounded-full"></div>
            </div>
          ) : (
            <AllGenres data={data?.genres} />
          ))}
      </div>
    </>
  );
}
