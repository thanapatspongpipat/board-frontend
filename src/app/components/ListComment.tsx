import { Avatar, TextField } from "@mui/material";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";

function ListComment() {
     const [open, setOpen] = useState<boolean>(false);
     //      const handleShowInputComment = (isOpen: boolean) => {
     //             setOpen(isOpen);
     //      };

     const addComment = (
          <div className="flex flex-col w-full h-full gap-y-4">
               <div className="w-full">
                    <TextField
                         className="w-full"
                         id="outlined-multiline-static"
                        //  label="Multiline"
                         multiline
                         rows={4}
                         defaultValue=""
                         placeholder="What's on your mind"
                    />
               </div>
               <div className="flex justify-end gap-x-2">
                    <Button
                         onClick={() => setOpen(false)}
                         color="success"
                         variant="bordered"
                    >
                         Cancel
                    </Button>
                    <Button color="success" className="text-white">Post</Button>

               </div>
          </div>
     );

     return (
          <div className="flex flex-col w-full h-full bg-white rounded-md py-4 px-6">
               {!open && (
                    <Button
                         onClick={() => setOpen(true)}
                         color="success"
                         variant="bordered"
                         className="text-medium w-fit"
                    >
                         Add Comments
                    </Button>
               )}
               {open && <div className="flex w-full">{addComment}</div>}

               <div className="align-middle py-3 gap-y-6 flex flex-col">
                    <div className="flex align-top items-top gap-x-6 py-3">
                         <Avatar sizes="large" />
                         <div className="flex flex-col w-full justify-start gap-y-2">
                              <div>
                                   <span>Name</span>
                              </div>
                              <div className="text-sm md:text-md max-w-5xl">
                                   <span>
                                        Lorem ipsum dolor, sit amet consectetur
                                        adipisicing elit. Ipsa, natus! Ipsam
                                        explicabo ea doloremque ullam non sequi
                                        quisquam voluptatibus accusamus
                                        reiciendis quis, iusto esse omnis totam
                                        pariatur odio temporibus magni! Placeat
                                        temporibus quae asperiores earum est
                                        sequi iure tempora eveniet fugiat
                                        praesentium accusantium delectus
                                        corrupti at, tempore odio quaerat harum
                                        impedit dolores in, aspernatur saepe
                                        voluptatibus expedita? Dolor, pariatur
                                        culpa.
                                   </span>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}

export default ListComment;
