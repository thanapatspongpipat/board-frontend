import { Avatar, Chip, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import TextsmsIcon from "@mui/icons-material/Textsms";
import { Blog } from "../../lib/interface/blog";
import { getAllBlogs } from "@/lib/service/blog.service";
import { useRouter } from "next/navigation";

interface PropsBlogs {
     blogs: Blog[];
}

const ListBlog: React.FC<PropsBlogs> = ({blogs}) => {
     const router = useRouter();
     return (
          <div className="flex flex-col w-full h-full">
               {blogs.map((blog) => (
                    <div
                         key={blog.id}
                         onClick={() => router.push(`/board/${blog.id}`)}
                    >
                         <div className="hover:bg-slate-300 hover:cursor-pointer p-8 align-middle gap-y-6 flex flex-col bg-white">
                              <div className="flex items-center gap-x-6">
                                   <Avatar sizes="large" />
                                   <span className="text-medium">
                                        {blog.author.email}
                                   </span>
                              </div>
                              <Chip className="w-fit" label={blog.category} />
                              <div className="w-full">
                                   <div className="font-bold text-medium md:text-xl">
                                        <span>{blog.topic}</span>
                                   </div>
                                   <div className="text-sm md:text-md mt-2">
                                        <span>{blog.content}</span>
                                   </div>
                              </div>
                              <div className="flex items-center gap-x-2 align-middle">
                                   <TextsmsIcon className="text-sm md:text-medium" />
                                   <span className="text-sm md:text-medium">
                                        {blog.comments.length} Comment
                                   </span>
                              </div>
                         </div>
                         <Divider />
                    </div>
               ))}
               <Divider />
          </div>
     );
};

export default ListBlog;
