import React from "react";
import Styles from "./BroadcastHistoryoverview.module.css";
import { RiCheckDoubleLine } from "react-icons/ri";

export const BrodcastHistoryOverview = () => {
  return (
    <div>
      <div className={Styles.box}>
        <div className="info_left">
          <div>0</div>
          <div className="pt-4">Failed!</div>
        </div>
        <div className="info_right">
          <div>
            <RiCheckDoubleLine size={"1.3rem"} />
          </div>
        </div>
      </div>
    </div>
  );
};
