import { AiFillFire } from "react-icons/ai";
import PlayButton from "./PlayButton";
import { memo } from "react";

const Billboard = memo(function Billboard({
  baseUrl,
  srcUrl,
  title,
  description,
  movieId,
}) {
  const checkDescription =
    description.split(" ").length > 60
      ? description.split(" ").slice(1, 60).join(" ") + "..."
      : description;

  return (
    <div className="relative w-full bg-slate-700 mb-2 md:rounded-lg">
      <div
        className="overflow-hidden w-full h-[300px] md:h-[350px] lg:h-[400px] md:rounded-lg flex justify-center items-center relative object-cover before:content-[''] before:absolute
        before:bg-black before:bg-opacity-80 before:blur-[10px] md:before:w-[55%] before:w-[65%] lg:before:w-[48%] before:h-[180%] before:-top-6 before:-left-6 
        "
      >
        <h1
          className="text-white bg-red-700 w-[10rem] py-[2px] text-[8px] rounded-lg absolute top-2 -left-[54px] flex justify-center items-center -rotate-[30deg] 
          border border-white shadow-sm shadow-red-900 drop-shadow-lg 
          "
        >
          TRENDING <AiFillFire size={10} className="ml-1 " />
        </h1>
        <img
          className="w-full h-full object-cover"
          src={baseUrl + srcUrl}
          alt=""
        />
      </div>
      <div className="absolute top-0 left-0 md:w-[45%] w-[55%] lg:w-[40%] h-full pt-10 pl-4 flex flex-col justify-start items-start ">
        <h1 className="text-white text-lg sm:text-2xl font-sans text-left font-bold z-10 leading-none whitespace-normal mb-2">
          {title || "Title Here Of the movie"}
        </h1>
        <hr className="h-[2px] opacity-70 rounded-full my-2 bg-zinc-600 border-none  w-full" />
        <p className="text-left font-sans font-normal text-[10px] xl:text-sm 2xl:text-lg text-gray-400 leading-none whitespace-normal ">
          {checkDescription || `No Description...`}
        </p>
        <div className="mt-[1rem]">
          <PlayButton movieId={movieId} />
        </div>
      </div>
    </div>
  );
});

export default Billboard;
