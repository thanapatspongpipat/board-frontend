import React from "react";
import ListSideBar from "./ListSideBar";

const SideBar = () => {
     return (
          <div className="hidden md:flex md:flex-col w-[250px] bg-[#BBC2C0] text-black">
               <ListSideBar colorFont="black"/>
          </div>
     );
};

export default SideBar;
