import React from "react";
import { Options } from "../Typography";
import { RiHistoryFill } from "react-icons/ri";
import { TbCalendarTime } from "react-icons/tb";
import { CgTemplate } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { Routes as AppRoute } from "../../constants/RoutesNames";
import "./BroadcastOption.css";

export const BroadcastOptions = () => {
  const navigate = useNavigate();
  const handleTemplateMessage = () => {
    navigate(`${AppRoute.templateMessage}`);
  };
  return (
    <div className="broadcast_option">
      <div className="options__list pb-12 pt-12">
        <RiHistoryFill className="Options" size={"1.3rem"} />
        <Options>Broadcast History</Options>
      </div>
      <div className="options__list pb-12">
        <TbCalendarTime className="Options" size={"1.3rem"} />
        <Options>Scheduled Broadcast</Options>
      </div>
      <div className="options__list pb-12" onClick={handleTemplateMessage}>
        <CgTemplate className="Options" size={"1.3rem"} />
        <Options>Tempalate Message</Options>
      </div>
    </div>
  );
};

export default BroadcastOptions;