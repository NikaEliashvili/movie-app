import { Link } from "react-router-dom";

import { BsFillPlayFill } from "react-icons/bs";

export default function PlayButton({ movieId }) {
  return (
    <div>
      <Link
        to={`/movies/${movieId}`}
        className="text-white flex flex-row justify-center items-center
      bg-gray-100 bg-opacity-10 sm:py-2 sm:px-5 py-0 px-3 rounded-md sm:rounded-[0.7rem] backdrop-blur-xl
      hover:bg-opacity-20  transition sm:text-xl text-lg
      "
      >
        <BsFillPlayFill className="text-xl sm:text-2xl  mr-1 -ml-1" /> Play
      </Link>
    </div>
  );
}
