import { Button } from "@nextui-org/react";
import React from "react";
import { signOut } from "next-auth/react";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
     Box,
     Divider,
     Drawer,
     List,
     ListItem,
     ListItemButton,
     ListItemIcon,
     ListItemText,
} from "@mui/material";
import ListSideBar from "./ListSideBar";

const AppBar = () => {
     const [open, setOpen] = React.useState(false);

     const toggleDrawer = (newOpen: boolean) => () => {
          setOpen(newOpen);
     };

     const DrawerList = (
          <Box
               sx={{ width: 250, bgcolor: "#243831" }}
               role="presentation"
            //    onClick={toggleDrawer(false)}
          >
               <List className="flex flex-col bg-[#243831] h-screen text-white p-3 gap-2 w-full">
                    <ArrowForwardIcon
                        className="cursor-pointer"
                         onClick={toggleDrawer(false)}
                         fontSize="medium"
                    />
                    <ListSideBar colorFont="white"/>
               </List>
          </Box>
     );

     return (
          <div className="flex justify-between items-center w-full bg-[#243831] px-5 py-2">
               <div className="text-xl text-white p-2">
                    <span>a Board</span>
               </div>
               <div className="sm:block md:hidden text-white cursor-pointer">
                    <MenuIcon onClick={toggleDrawer(true)} fontSize="medium" />
               </div>
               <div className="hidden md:block">
                    <Button
                         type="submit"
                         className="text-black p-2"
                         onClick={() => signOut()}
                    >
                         Sign Out
                    </Button>
               </div>
               <Drawer
                    anchor={"right"}
                    open={open}
                    onClose={toggleDrawer(false)}
               >
                    {DrawerList}
               </Drawer>
          </div>
     );
};

export default AppBar;
