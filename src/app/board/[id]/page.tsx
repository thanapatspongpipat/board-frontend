"use client";

import ContentDetail from "@/app/components/ContentDetail";
import { Blog } from "@/lib/interface/blog";
import { getBlog } from "@/lib/service/blog.service";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const BlogDetail = () => {
     const {id} = useParams();

     return (
          <div>
            {id ? <ContentDetail id={id as string} /> : <div>No ID found.</div>} {/* Check if id exists */}
          </div>
     );
};

export default BlogDetail;
