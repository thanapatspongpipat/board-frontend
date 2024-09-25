import {
     List,
     ListItem,
     ListItemButton,
     ListItemIcon,
     ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import React from "react";

interface ListSideBarProps {
     colorFont: string;
}

const ListSideBar: React.FC<ListSideBarProps> = ({ colorFont }) => {
     return (
          <List
               className={`flex flex-col p-3 gap-2 w-full h-full text-${colorFont}`}
          >
               {["Home", "Our Blog"].map((text, index) => (
                    <ListItem key={text} disablePadding>
                         <ListItemButton>
                              <ListItemIcon className={`text-${colorFont}`}>
                                   {index == 0 ? (
                                        <HomeIcon />
                                   ) : (
                                        <EditCalendarIcon />
                                   )}
                              </ListItemIcon>
                              <ListItemText primary={text} />
                         </ListItemButton>
                    </ListItem>
               ))}
          </List>
     );
};

export default ListSideBar;
