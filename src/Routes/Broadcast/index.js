import React from "react";
import Navbar from "../../components/Navbar";
import BroadcastOptions from "../../components/BroadcastOptions";

export const Broadcast = () => {
  return (
    <div className="h-screen">
      <Navbar />
      {/* --------------------------------- */}
      <div className="hidden xl:flex">
        <BroadcastOptions />
      </div>
      <div>ywtshf</div>
    </div>
    // </div>
  );
};
