import React from "react";

type Props = {};

export const ContactCard = (props: Props) => {
  return (
    <div className="flex flex-col gap-2 w-44 h-52 bg-white shadow-sm hover:shadow-lg shadow-slate-700">
      <div className="w-full h-2/3 bg-blue-500"></div>
      <h4 className="mx-4">Lorem ipsum dolor sit amet.</h4>
    </div>
  );
};
