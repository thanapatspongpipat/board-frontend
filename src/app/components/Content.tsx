import React, { useEffect, useState } from "react";
import {
     FormControl,
     InputAdornment,
     InputLabel,
     MenuItem,
     OutlinedInput,
     Select,
     Dialog,
     DialogActions,
     DialogContent,
     DialogContentText,
     DialogTitle,
     TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Modal } from "@nextui-org/react";
import ListBlog from "./ListBlog";
import FormPost from "./FormPost";
import ModalFormPost from "./FormPost";
import { Blog } from "@/lib/interface/blog";
import { getAllBlogs } from "@/lib/service/blog.service";

const Content = () => {
     const [open, setOpen] = useState<boolean>(false); // State to control modal visibility

     const handleClickOpen = () => setOpen(true);
     const handleClose = () => setOpen(false);
     const [blogs, setBlogs] = useState<Blog[]>([]);
     useEffect(() => {
          const fetchBlogs = async () => {
               const response = await getAllBlogs();
               setBlogs(response);
               //    setBlogs(response);
          };
          fetchBlogs();
     }, []);

     return (
          <div className="flex flex-col align-middle w-full h-screen bg-slate-50">
               <div className="flex w-full justify-center ">
                    <div className="flex w-full gap-x-7 m-4">
                         <FormControl
                              sx={{ minWidth: 120, border: "none" }}
                              fullWidth
                              variant="standard"
                         >
                              <OutlinedInput
                                   size="small"
                                   id="outlined-adornment-amount"
                                   startAdornment={
                                        <InputAdornment position="start">
                                             <SearchIcon />
                                        </InputAdornment>
                                   }
                                   placeholder="Search"
                              />
                         </FormControl>
                         <FormControl
                              sx={{ minWidth: 120, border: "none" }}
                              size="small"
                         >
                              <InputLabel id="demo-select-small-label">
                                   Category
                              </InputLabel>
                              <Select
                                   labelId="demo-select-small-label"
                                   id="demo-select-small"
                                   placeholder="Category"
                                   label="Category"
                              >
                                   <MenuItem value="History">History</MenuItem>
                                   <MenuItem value="Food">Food</MenuItem>
                                   <MenuItem value="Pets">Pets</MenuItem>
                              </Select>
                         </FormControl>
                         <Button
                              className="text-white mr-0.5"
                              color="success"
                              onClick={handleClickOpen} // Open the modal on click
                         >
                              Create
                         </Button>
                    </div>
               </div>
               <div className="flex w-full h-screen p-5 shadow-2xl rounded-md overflow-auto pb-5">
                    <ListBlog blogs={blogs} />
               </div>
               <ModalFormPost open={open} onClose={handleClose} />

          </div>
     );
};

export default Content;
