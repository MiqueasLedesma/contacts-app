import React from "react";

type Props = {};

export const HomeNavbar = (props: Props) => {
  return (
    <nav className="fixed top-0 w-full h-12 flex flex-row px-12 py-2 text-white bg-slate-900 justify-around items-center">
      <h2>Welcome!</h2>
      <form>
        <input
          type="text"
          name=""
          id=""
          className="rounded-md rounded-r-none p-1 bg-slate-400 px-4 text-black focus:outline-none focus:ring-0"
        />
        <button
          type="submit"
          className="rounded-md rounded-l-none bg-yellow-500 p-1 text-black hover:bg-yellow-400 transition-all"
        >
          Search
        </button>
      </form>
    </nav>
  );
};
