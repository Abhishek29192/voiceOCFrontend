import React from "react";
import BroadcastOptions from "../../../components/BroadcastOptions";
import { PrimaryButton } from "../../../components/Button";
import Navbar from "../../../components/Navbar";
import { Base2 } from "../../../components/Typography";
import styles from "./BroadcastHistory.module.css";

export const BroadcastHistory = () => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <BroadcastOptions />
        <div className={styles.section1}>
          <Base2 className="poppins p-4 bg-green-400">Date Range Filter</Base2>
          <PrimaryButton text={"hello"} className="ml-2" />
        </div>
      </div>
    </div>
  );
};
