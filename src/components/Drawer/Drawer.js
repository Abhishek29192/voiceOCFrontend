import zIndex from "@mui/material/styles/zIndex";
import React, {Children} from "react";
// import component 👇
import Drawer from "react-modern-drawer";
//import styles 👇
import "react-modern-drawer/dist/index.css";

export const Drawers = ({children, isOpen, toggleDrawer, direction}) => {
  return (
    <>
      <button onClick={toggleDrawer}>Show</button>
      <Drawer
        style={{width: "32vw"}}
        open={isOpen}
        onClose={toggleDrawer}
        direction={direction}
        className="bla bla bla"
      >
        {children}
      </Drawer>
    </>
  );
};
