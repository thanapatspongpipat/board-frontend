import {
     Dialog,
     DialogActions,
     DialogContent,
     DialogContentText,
     DialogTitle,
} from "@mui/material";
import { Button } from "@nextui-org/react";
import React from "react";

interface ModalDeleteProps {
     title: string;
     description: string;
     open: boolean;
     onClose: () => void;
     onSubmit: () => void;
}

const ModalDelete: React.FC<ModalDeleteProps> = ({
     open,
     onClose,
     title,
     description,
     onSubmit
}) => {
     return (
          <Dialog
               className="align-middle text-center"
               open={open}
               onClose={onClose}
               aria-labelledby="alert-dialog-title"
               aria-describedby="alert-dialog-description"
          >
               <DialogTitle id="alert-dialog-title" className="p-6">
                    {title}
               </DialogTitle>
               <DialogContent className="p-6">
                    <DialogContentText id="alert-dialog-description">
                         {description}
                    </DialogContentText>
               </DialogContent>
               <DialogActions className="flex w-full p-6 gap-x-2">
                    <Button
                         className="w-1/2"
                         color="default"
                         variant="bordered"
                         onClick={onClose}
                    >
                         Cancel
                    </Button>
                    <Button
                         onClick={onSubmit}
                         color="danger"
                         className="text-white w-1/2"
                         autoFocus
                    >
                         Delete
                    </Button>
               </DialogActions>
          </Dialog>
     );
};

export default ModalDelete;
