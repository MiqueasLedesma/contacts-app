import Link from "next/link";
import React from "react";

type Props = {};

export const NoContactCard = (props: Props) => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <h2>You don't have any contact!</h2>
      <Link
        href={"/home/new"}
        className="rounded-md shadow-sm shadow-current bg-slate-600 hover:bg-slate-500 text-white transition-all duration-500 w-fit h-fit px-4 py-2"
      >
        Create Contact
      </Link>
    </div>
  );
};
