import React, { useEffect, useState } from "react";
import {
     FormControl,
     InputAdornment,
     InputLabel,
     MenuItem,
     OutlinedInput,
     Select,
     SelectChangeEvent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Modal } from "@nextui-org/react";
import ListBlog from "./ListBlog";
import FormPost from "./FormPost";
import ModalFormPost from "./FormPost";
import { Blog, CategoryLabels, Category } from "@/lib/interface/blog";
import { getAllBlogs } from "@/lib/service/blog.service";

const Content = () => {
     const [open, setOpen] = useState<boolean>(false);
     const handleClickOpen = () => setOpen(true);
     const handleClose = () => setOpen(false);
     const [blogs, setBlogs] = useState<Blog[]>([]);
     const [search, setSearch] = useState<string>("");
     const [category, setCategory] = useState<string>("");

     const fetchBlogs = async (filters?: {
          search?: string;
          category?: string;
     }) => {
          const response = await getAllBlogs(filters); // Pass filters to the API
          setBlogs(response);
     };

     useEffect(() => {
          fetchBlogs();
     }, []);

     const handleSearchChange = (
          event: React.ChangeEvent<HTMLInputElement>
     ) => {
          const newSearch = event.target.value;
          setSearch(newSearch);
          fetchBlogs({ search: newSearch, category });
     };

     const handleCategoryChange = (event: SelectChangeEvent<string>) => {
            const newCategory = event.target.value as string; // Get the selected category value
            setCategory(newCategory); // Update state
            fetchBlogs({ search, category: newCategory }); // Fetch blogs with the new category
        };

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
                                   value={search}
                                   onChange={handleSearchChange}
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
                                   value={category || ""}
                                   onChange={handleCategoryChange}
                                   label="Category"
                              >
                                   <MenuItem value="">
                                        <em>None</em>
                                   </MenuItem>
                                   {Object.values(Category).map((value) => (
                                        <MenuItem key={value} value={value}>
                                             {CategoryLabels[value as Category]}{" "}
                                             {/* Display label */}
                                        </MenuItem>
                                   ))}
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
               <ModalFormPost
                    open={open}
                    onClose={async () => {
                         handleClose();
                         await fetchBlogs();
                    }}
               />
          </div>
     );
};

export default Content;
