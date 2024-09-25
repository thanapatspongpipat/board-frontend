"use client";
import React, { ReactNode } from "react";
import AppBar from "../components/AppBar";
import SideBar from "../components/SideBar";

interface BlogLayoutProps {
     children: ReactNode;
}

const BlogLayout: React.FC<BlogLayoutProps> = ({ children }) => {
     // Note the spelling of `children`
     return (
          <div className="relative w-full h-screen">
               <div className="sticky top-0 z-10 w-full">
                    <AppBar />
               </div>
               <div className="w-full h-full overflow-hidden">
                    <div className="flex w-full h-full">
                         <SideBar />
                         <main className="w-full h-full">{children}</main>
                    </div>
               </div>
          </div>
     );
};

export default BlogLayout;
