import { Avatar, Chip, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import TextsmsIcon from "@mui/icons-material/Textsms";
import { Blog } from "../../lib/interface/blog";
import { useRouter } from "next/navigation";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useSession } from "next-auth/react";
import ModalFormPost from "./FormPost";
import { deleteBlogPost } from "@/lib/service/blog.service";
import ModalDelete from "./ModalDelete";
interface PropsBlogs {
     blogs: Blog[];
}

const ListBlog: React.FC<PropsBlogs> = ({ blogs }) => {
     const router = useRouter();
     const { data: session } = useSession();
     const [openEditModal, setOpenEditModal] = useState<boolean>(false);
     const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
     const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
     const [localBlogs, setLocalBlogs] = useState<Blog[]>(blogs); // State to hold blogs

     const handleEditClick = (blog: Blog) => {
          setSelectedBlog(blog); // Set the selected blog
          setOpenEditModal(true); // Open the edit modal
     };

     const handleDeleteClick = (blog: Blog) => {
          setSelectedBlog(blog); // Set the selected blog for deletion
          setOpenDeleteModal(true); // Open the delete modal
     };

     const handleDelete = async () => {
          if (selectedBlog) {
               try {
                    await deleteBlogPost(String(selectedBlog.id));
                    setLocalBlogs((prevBlogs) => prevBlogs.filter((b) => b.id !== selectedBlog.id));
                    setOpenDeleteModal(false); 
                    setSelectedBlog(null);
                    router.push("/board");
               } catch (error) {
                    console.error("Error deleting blog post:", error);
               }
          }
     };

     useEffect(() => {
          setLocalBlogs(blogs);
     }, [blogs]);

     return (
          <div className="flex flex-col w-full h-full">
               {localBlogs.map((blog) => (
                    <div
                         key={blog.id}
                         onClick={() => router.push(`/board/${blog.id}`)}
                    >
                         <div className="hover:bg-slate-300 hover:cursor-pointer p-8 align-middle gap-y-6 flex flex-col bg-white">
                              <div className="flex justify-between items-center gap-x-6">
                                   <div className="flex items-center gap-x-4">
                                        <Avatar sizes="large" />
                                        <span className="text-medium">
                                             {blog.author.email}
                                        </span>
                                   </div>
                                   {Number(session?.user?.id) ===
                                        Number(blog.author.id) && (
                                        <div className="flex gap-x-5">
                                             <BorderColorOutlinedIcon
                                                  color="success"
                                                  onClick={(e) => {
                                                       e.stopPropagation(); // Prevent click on the parent div
                                                       handleEditClick(blog);
                                                  }}
                                             />
                                             <DeleteOutlineOutlinedIcon
                                                  onClick={(e) => {
                                                       e.stopPropagation(); // Prevent click on the parent div
                                                       handleDeleteClick(blog);
                                                  }}
                                                  color="success"
                                             />
                                        </div>
                                   )}
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
               {selectedBlog && (
                    <ModalFormPost
                         open={openEditModal}
                         onClose={() => {
                              setOpenEditModal(false);
                              setSelectedBlog(null);
                         }}
                         initialData={selectedBlog} // Pass the selected blog for editing
                    />
               )}
               <ModalDelete
                    open={openDeleteModal}
                    onClose={() => setOpenDeleteModal(false)}
                    title="Please confirm if you wish to 
                    delete the post"
                    description="Are you sure you want to delete the post? Once deleted, it cannot be recovered."
                    onSubmit={handleDelete}
               />
          </div>
     );
};

export default ListBlog;
