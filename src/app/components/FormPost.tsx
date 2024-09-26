import {
     Dialog,
     DialogActions,
     DialogContent,
     DialogTitle,
     FormControl,
     InputLabel,
     NativeSelect,
     OutlinedInput,
     TextField,
} from "@mui/material";
import { Button, MenuItem, Select } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Blog, Category, createBlog } from "../../lib/interface/blog";
import { createBlogPost, updateBlogPost } from "../../lib/service/blog.service";

interface PropsModal {
     open: boolean;
     onClose: () => void;
     initialData?: Blog | null;
}

const ModalFormPost: React.FC<PropsModal> = ({
     open,
     onClose,
     initialData,
}) => {
     const { data: session } = useSession();
     const [category, setCategory] = useState<Category | string>("");
     const [topic, setTopic] = useState<string>("");
     const [content, setContent] = useState<string>("");

     const handleSubmitForm = async () => {
          if (session) {
               const data: createBlog = {
                    category: category as Category, // Cast to Category
                    topic, // Ensure the property name matches your interface
                    content,
                    authorId: session.user.id, // Use authorId from the session
               };

               try {
                    if (initialData) {
                         await updateBlogPost(String(initialData.id), data);
                    } else {
                         // Create a new post if no `initialData`
                         await createBlogPost(data);
                    }
                    onClose();
               } catch (error) {
                    console.error("Error creating blog post:", error);
               }
          } else {
               console.error("User not authenticated.");
          }
     };

     useEffect(() => {
          if (open && initialData) {
               setCategory(initialData.category.toString()); // Set category from initial data
               setTopic(initialData.topic);
               setContent(initialData.content);
          }
     }, [open, initialData]);

     return (
          <Dialog
               open={open}
               onClose={onClose}
               aria-labelledby="form-dialog-title"
               fullWidth
               maxWidth="md"
          >
               <DialogTitle id="form-dialog-title">
                    {initialData ? "Edit Post" : "Create Post"}{" "}
               </DialogTitle>
               <DialogContent className="flex flex-col gap-y-5">
                    <FormControl fullWidth size="small" sx={{ marginTop: 2 }}>
                         <Select
                              defaultSelectedKeys={[category]}
                              placeholder="Choose a community"
                              id="category"
                              value={category}
                              onChange={(e) =>
                                   setCategory(e.target.value as Category)
                              } // Cast to Category
                         >
                              {Object.entries(Category).map(([key, value]) => (
                                   <MenuItem key={key} value={value}>
                                        {key}
                                   </MenuItem>
                              ))}
                         </Select>
                    </FormControl>
                    <FormControl sx={{ minWidth: 120 }} fullWidth required>
                         <OutlinedInput
                              className="rounded-md"
                              size="small"
                              id="topic"
                              placeholder="Title"
                              value={topic}
                              onChange={(e) => setTopic(e.target.value)}
                         />
                    </FormControl>
                    <FormControl className="w-full">
                         <TextField
                              className="w-full rounded-md"
                              id="content"
                              multiline
                              rows={4}
                              placeholder="What's on your mind"
                              value={content}
                              onChange={(e) => setContent(e.target.value)}
                         />
                    </FormControl>
               </DialogContent>
               <DialogActions className="flex px-6 py-4 gap-x-2">
                    <Button
                         onClick={onClose}
                         color="success"
                         variant="bordered"
                    >
                         Cancel
                    </Button>
                    <Button
                         onClick={handleSubmitForm}
                         color="success"
                         className="text-white"
                    >
                         {initialData ? "Update" : "Post"}
                    </Button>
               </DialogActions>
          </Dialog>
     );
};

export default ModalFormPost;
