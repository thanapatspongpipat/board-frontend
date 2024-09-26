"use client";

import { Blog } from "@/lib/interface/blog";
import { Comment } from "@/lib/interface/comment";
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
     const [comments, setComments] = useState<Comment[]>([]);
     const fetchBlog = async () => {
          if (id) {
               try {
                    const blogData = await getBlog(String(id));
                    setBlog(blogData);
                    setComments(blogData.comments); // Set comments when blog is fetched
               } catch (error) {
                    console.error("Error fetching blog:", error);
               }
          }
     };
     const handleCommentChange = async () => {
          // Refresh comments after creating or updating
          await fetchBlog();
     };

     useEffect(() => {
          fetchBlog();
     }, [comments]);
     return (
          <div className="flex flex-col align-middle w-full h-full bg-slate-50">
               <ListBlog blogs={blog ? [blog] : []} />
               <ListComment comments={comments} />
          </div>
     );
};

export default ContentDetail;
