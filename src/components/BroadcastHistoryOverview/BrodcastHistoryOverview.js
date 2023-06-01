import React from "react";
import Styles from "./BroadcastHistoryoverview.module.css";
import {RiCheckDoubleLine} from "react-icons/ri";

export const BrodcastHistoryOverview = ({component, statusText, count}) => {
  return (
    <div>
      <div className={Styles.box}>
        <div className="info_left">
          <div className="font-semibold">{count}</div>
          <div className="pt-5 font-semibold">{statusText}</div>
        </div>
        <div className="bg-white h-fit rounded-full ">
          <div className="p-2">{component}</div>
        </div>
      </div>
    </div>
  );
};
