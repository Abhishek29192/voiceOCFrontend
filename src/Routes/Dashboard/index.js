import React from "react";
import Navbar from "../../components/Navbar";
import { VideoPlayer } from "../../components/VideoPlayer";
import ResponsiveNavbar from "../../components/ResponsiveNavbar";

export const Dashboard = () => {
  return (
    <div>
      <div>
        <Navbar />
        <VideoPlayer />
      </div>
    </div>
  );
};
