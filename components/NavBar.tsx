import { Dispatch, SetStateAction } from "react";

import DropdownMenuDemo from "./DropdownMenu";

type NavBarProps = {
  setMode: Dispatch<SetStateAction<string>>;
  toolSelected: string;
};

export const NavBar = (props: NavBarProps) => {
  const { setMode, toolSelected } = props;
  return (
    <nav className="w-full h-20 fixed z-50 top-0 flex bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 justify-center items-center px-10 shadow-lg shadow-principal/95">
      <h1 className="text-5xl text-[#000000] font-ramptartOne">
        {toolSelected}
      </h1>
      <div className="absolute right-10 z-50">
        <DropdownMenuDemo setMode={setMode} />
      </div>
    </nav>
  );
};
