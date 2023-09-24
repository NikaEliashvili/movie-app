import { useCallback } from "react";
import { Link } from "react-router-dom";

export default function AllGenres({ data }) {
  const allGenres = data?.map(({ id, name }) => (
    <Link
      key={id}
      to={`/categories/${name}-${id}`}
      state={{ prevPath: location?.pathname }}
      className=" font-semibold text-sm w-fit text-left mb-1 cursor-pointer text-gray-400
      hover:text-gray-100 
      py-1 "
    >
      {name}
    </Link>
  ));
  return (
    <div className="px-2 max-h-[80%] flex flex-col justify-center items-start w-full ">
      <h1 className="text-zinc-600 text-[13px] ml-1 mt-7 mb-3  font-semibold ">
        Categories
      </h1>

      <div
        className="flex flex-col justify-start items-start px-2 overflow-y-auto w-full max-h-[100%]  
      "
      >
        {allGenres}
      </div>
    </div>
  );
}
