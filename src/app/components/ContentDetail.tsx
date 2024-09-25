"use client";

import { Blog } from "@/lib/interface/blog";
import { getBlog } from "@/lib/service/blog.service";
import { useSearchParams } from "next/navigation";
import { NextRequest } from "next/server";
import React, { useEffect, useState } from "react";
import ListBlog from "./ListBlog";
import ListComment from "./ListComment";

interface DetailProps {
     id: string;
     // blog: Blog;
}

const ContentDetail: React.FC<DetailProps> = ({ id }) => {
     const [blog, setBlog] = useState<Blog>();

     useEffect(() => {
          if (id) {
               const fetchBlog = async () => {
                    try {
                         const blogData = await getBlog(String(id));
                         console.log(blogData);
                         setBlog(blogData); // Set the blog data in the state
                    } catch (error) {
                         console.error("Error fetching blog:", error);
                    }
               };

               fetchBlog();
          }
     }, []);
     return (
          <div className="flex flex-col align-middle w-full h-full bg-slate-50">
               <ListBlog blogs={blog ? [blog] : []} />
               <ListComment />
          </div>
     );
};

export default ContentDetail;
