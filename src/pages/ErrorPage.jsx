import { Link } from "react-router-dom";
import disconnectIMG from "/images/disconnect.svg";

export default function ErrorPage() {
  return (
    <div className="relative w-full h-[100vh] bg-slate-950 flex justify-center items-center ">
      <img
        src={disconnectIMG}
        alt="404 | Page Not Found"
        className="absolute top-0 "
      />

      <Link
        to="/"
        className=" cursor-pointer  text-white m-auto bg-slate-900 py-5 px-10 text-2xl rounded-lg drop-shadow-[0px_3px_15px_rgba(0,0,0,1)]"
      >
        Back To Home
      </Link>
    </div>
  );
}
