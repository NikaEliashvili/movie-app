import { NavLink } from "react-router-dom";

export default function NavButton({ Icon, to, text, isNavLink }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        ` text-white flex flex-row justify-center items-center gap-2 group hover:text-gray-300 ${
          isNavLink && (isActive ? "text-white" : "text-zinc-600")
        }`
      }
    >
      <Icon className="sm:text-2xl text-xl" />
      <h1 className=" text-xs md:text-sm font-semibold">{text}</h1>
    </NavLink>
  );
}
