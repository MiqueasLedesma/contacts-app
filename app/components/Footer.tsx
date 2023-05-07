import Image from "next/image";
import React from "react";
import hearthIcon from "../../public/icons/hearth-icon.svg";

type Props = {};

export const Footer = (props: Props) => {
  return (
    <footer className="w-full px-8 py-2 fixed bottom-0 flex flex-row justify-around flex-wrap bg-slate-700 text-slate-100">
      <h2 className="flex flex-row gap-2 items-center">
        Made with{" "}
        <span>
          <Image src={hearthIcon} alt="hearth.png" width={18} height={18} />
        </span>{" "}
        by Miqueas Ledesma
      </h2>
    </footer>
  );
};
