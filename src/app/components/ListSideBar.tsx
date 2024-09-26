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
interface LinkItem {
     href: string;
     text: string;
     icon: React.ReactNode;
}

const linkList: LinkItem[] = [
     { href: "/board", text: "Home", icon: <HomeIcon /> },
     { href: "", text: "Our Blog", icon: <EditCalendarIcon /> }, // Update href as needed
];
const ListSideBar: React.FC<ListSideBarProps> = ({ colorFont }) => {
     return (
          <List
               className={`flex flex-col p-3 gap-2 w-full h-full text-${colorFont}`}
          >
               {linkList.map((link, index) => (
                    <ListItem key={index} disablePadding>
                         <ListItemButton href={link.href}>
                              <ListItemIcon className={`text-${colorFont}`}>
                                   {link.icon}
                              </ListItemIcon>
                              <ListItemText primary={link.text} />
                         </ListItemButton>
                    </ListItem>
               ))}
          </List>
     );
};

export default ListSideBar;
