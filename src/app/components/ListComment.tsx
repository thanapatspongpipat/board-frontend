"use client";

import { Comment, CreateComment } from "@/lib/interface/comment";
import {
     createComment,
     updateComment,
     deleteComment,
} from "@/lib/service/comment.service"; // Assuming these functions exist
import { Avatar, TextField } from "@mui/material";
import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModalDelete from "./ModalDelete";

interface ListCommentProps {
     comments: Comment[];
     onCommentChange?: () => void;
     
}

const ListComment: React.FC<ListCommentProps> = ({ comments }) => {
     const [open, setOpen] = useState<boolean>(false);
     const [editingCommentId, setEditingCommentId] = useState<number | null>(
          null
     );
     const [selectedComment, setSelectedComment] = useState<Comment | null>(
          null
     );
     const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

     const [isEdit, setIsEdit] = useState<boolean>(false);
     const { id } = useParams(); // Assuming 'id' is the post or blog ID
     const { data: session } = useSession();
     const [commentText, setCommentText] = useState<string>("");

     const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setCommentText(e.target.value);
     };

     const handleCreateOrUpdateComment = async () => {
          if (!session) {
               console.log("User not logged in");
               return;
          }

          const newComment: CreateComment = {
               postId: Number(id), // Assuming the ID refers to the post or blog
               authorId: session.user?.id, // Ensure you are getting the user ID from session
               content: commentText,
          };

          try {
               if (selectedComment) {
                    await updateComment(String(selectedComment.id), newComment);
               } else {
                    // If not editing, create a new comment
                    await createComment(newComment);
               }
               setCommentText("");
               setOpen(false);
               setSelectedComment(null); // Reset the editing state
          } catch (error) {
               console.error("Failed to create or update comment", error);
          }
     };

     const handleDeleteClick = (comment: Comment) => {
          setSelectedComment(comment); // Set the selected blog for deletion
          setOpenDeleteModal(true); // Open the delete modal
     };

     const handleEditComment = (comment: Comment) => {
          setIsEdit(true);
          setCommentText(comment.content); // Load the comment content into the input
          setSelectedComment(comment); // Track the comment being edited
          setOpen(true); // Open the input for editing
     };

     const handleDeleteComment = async () => {
          if (selectedComment) {
               try {
                    await deleteComment(String(selectedComment.id));
                    setOpenDeleteModal(false); 
                    setSelectedComment(null);
               } catch (error) {
                    console.error("Failed to delete comment", error);
               }
          }
     };

     const addCommentForm = (
          <div className="flex flex-col w-full h-full gap-y-4">
               <div className="w-full">
                    <TextField
                         className="w-full"
                         id="outlined-multiline-static"
                         multiline
                         rows={4}
                         value={commentText}
                         onChange={handleCommentChange}
                         placeholder="What's on your mind"
                    />
               </div>
               <div className="flex justify-end gap-x-2">
                    <Button
                         onClick={() => {
                              setIsEdit(false);
                              setOpen(false);
                              setEditingCommentId(null); // Reset when canceling
                         }}
                         color="success"
                         variant="bordered"
                    >
                         Cancel
                    </Button>
                    <Button
                         onClick={handleCreateOrUpdateComment}
                         color="success"
                         className="text-white"
                    >
                         {selectedComment ? "Update" : "Post"}
                    </Button>
               </div>
          </div>
     );

     return (
          <div className="flex flex-col w-full h-full bg-white rounded-md py-4 px-6">
               {!open && !isEdit && (
                    <Button
                         onClick={() => {
                              setOpen(true);
                              setIsEdit(false); // Ensure we are not in edit mode
                              setCommentText(""); // Reset comment text for new comment
                         }}
                         color="success"
                         variant="bordered"
                         className="text-medium w-fit"
                    >
                         Add Comment
                    </Button>
               )}
               {open && !isEdit && (
                    <div className="flex w-full">{addCommentForm}</div>
               )}

               <div className="align-middle py-3 gap-y-6 flex flex-col">
                    {comments.map((comment) => (
                         <div
                              key={comment.id}
                              className="flex align-top items-top gap-x-6 py-3"
                         >
                              <Avatar sizes="large" />
                              <div className="flex flex-col w-full justify-start gap-y-2">
                                   <div className="flex justify-between">
                                        <div>
                                             <span>{comment.author.email}</span>
                                        </div>
                                        {Number(session?.user?.id) ===
                                             Number(comment.author.id) && (
                                             <div className="flex gap-x-5">
                                                  <BorderColorOutlinedIcon
                                                       onClick={() =>
                                                            handleEditComment(
                                                                 comment
                                                            )
                                                       }
                                                       color="success"
                                                       fontSize="small"
                                                  />
                                                  <DeleteOutlineOutlinedIcon
                                                       onClick={() =>
                                                            handleDeleteClick(
                                                                 comment
                                                            )
                                                       }
                                                       fontSize="small"
                                                       color="success"
                                                  />
                                             </div>
                                        )}
                                   </div>
                                   {!isEdit ||
                                   selectedComment?.id !== comment.id ? (
                                        <div className="text-sm md:text-md max-w-5xl">
                                             <span>{comment.content}</span>
                                        </div>
                                   ) : (
                                        <div className="flex w-full">
                                             {addCommentForm}{" "}
                                             {/* This will show the form for editing */}
                                        </div>
                                   )}

                                   <div className="text-xs text-gray-500">
                                        <span>
                                             {new Date(
                                                  comment.createdAt
                                             ).toLocaleDateString()}
                                        </span>
                                   </div>
                              </div>
                         </div>
                    ))}
               </div>
               {selectedComment && (
                    <ModalDelete
                         open={openDeleteModal}
                         onClose={() => setOpenDeleteModal(false)}
                         title="Please confirm if you wish to delete the comment"
                         description="Are you sure you want to delete the comment? Once deleted, it cannot be recovered."
                         onSubmit={handleDeleteComment}
                    />
               )}
          </div>
     );
};

export default ListComment;
