import { Dispatch, SetStateAction } from "react";

import DropdownMenuDemo from "./DropdownMenu";

type NavBarProps = {
  setMode: Dispatch<SetStateAction<string>>;
  toolSelected: string;
};

export const NavBar = (props: NavBarProps) => {
  const { setMode, toolSelected } = props;
  return (
    <nav className="w-full h-20 fixed top-0 flex bg-principal justify-center items-center px-10 shadow-lg shadow-principal/95">
      <h1 className="text-5xl text-[#000000] font-ramptartOne">
        {toolSelected}
      </h1>
      <div className="absolute right-10">
        <DropdownMenuDemo setMode={setMode} />
      </div>
    </nav>
  );
};
