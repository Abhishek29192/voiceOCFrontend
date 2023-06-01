import React from "react";
import { Options } from "../Typography";
import { RiHistoryFill } from "react-icons/ri";
import { TbCalendarTime } from "react-icons/tb";
import { CgTemplate } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { Routes as AppRoute } from "../../constants/RoutesNames";
import styles from "./BroadcastOption.module.css";

export const BroadcastOptions = ({ activeMenuOption }) => {
  const navigate = useNavigate();

  const handleTemplateMessage = () => {
    localStorage.setItem("activeMenuOption", "templateMessage");
    navigate(`${AppRoute.templateMessage}`);
  };

  const handleBoradcastHistory = () => {
    localStorage.setItem("activeMenuOption", "boradcastHistory");
    navigate(`${AppRoute.history}`);
  };

  const handleScheduledBroadcast = () => {
    localStorage.setItem("activeMenuOption", "scheduledBroad")
    navigate(`${AppRoute.scheduleBroadcast}`);
  };

  return (
    <div className={styles.broadcast_option}>
      <div
        className={`${activeMenuOption === "boradcastHistory" ? styles.options__list__active : styles.options__list} pt-11`}
        onClick={handleBoradcastHistory}
      >
        <RiHistoryFill className="Options" size={"1.3rem"} />
        <Options>Broadcast History</Options>
      </div>
      <div className={activeMenuOption === "scheduledBroad" ? styles.options__list__active : styles.options__list} onClick={handleScheduledBroadcast}>
        <TbCalendarTime className="Options" size={"1.3rem"} />
        <Options>Scheduled Broadcast</Options>
      </div>
      <div className={activeMenuOption === "templateMessage" ? styles.options__list__active : styles.options__list} onClick={handleTemplateMessage}>
        <CgTemplate className="Options" size={"1.3rem"} />
        <Options>Tempalate Message</Options>
      </div>
    </div>
  );
};

export default BroadcastOptions;
