import React from "react";
import { TbInbox } from "react-icons/tb";
import { RiContactsBook2Line } from "react-icons/ri";
import { VscListSelection } from "react-icons/vsc";
import { RxDividerVertical } from "react-icons/rx";
import { BiBell } from "react-icons/bi";
import { MdOutlineCampaign } from "react-icons/md"
import { BsExclamationCircle } from "react-icons/bs";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsBroadcast } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Routes as AppRoute } from "../../constants/RoutesNames";
import ResponsiveNavbar from "../ResponsiveNavbar";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  const navigate = useNavigate();
  const handlebroadcast = () => {
    navigate(`${AppRoute.history}`);
  };

  const handleContacts = () => {
    navigate(`${AppRoute.contacts}`);
  };

  const handleInbox = () => {
    navigate(`${AppRoute.teamInbox}`);
  };

  const handleCampaign = () => {
    navigate(`${AppRoute.campaign}`);
  }
  return (
    <div className={styles.nav__container}>
      <div className="flex xl:hidden h-full p-3 w-[18rem] ">
        <ResponsiveNavbar />
      </div>
      <div className=" xl:flex hidden w-[60%]">
        <div className={styles.icon__container}>
          <TbInbox className={styles.icon__style} />
          <p className="text-base" onClick={handleInbox}>
            Team Inbox
          </p>
        </div>
        <div className={styles.icon__container}>
          <RiContactsBook2Line className={styles.icon__style} />
          <p className="text-base" onClick={handleContacts}>
            Contacts
          </p>
        </div>
        <div className={styles.icon__container}>
          <BsBroadcast className={styles.icon__style} />
          <p className="text-base" onClick={handlebroadcast}>
            Broadcast
          </p>
        </div>
        <div className={styles.icon__container}>
          <MdOutlineCampaign size={"1.5rem"} className={styles.icon__style} />
          <p className="text-base" onClick={handleCampaign}>
            Campaign
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center w-[35%]">
        <div className="hidden xl:flex items-center">
          <VscListSelection size={"1.5rem"} />
          <RxDividerVertical className="ml-2 h-7 w-12 items-center text-slate-300" />
          <BiBell size={"1.4rem"} />
        </div>
        <div className=" flex  right-0">
          <div className="hidden xl:block pl-10">
            <div className="flex item-center justify-center">
              <p className={styles.connectedText}>CONNECTED</p>
              <BsExclamationCircle className="pl-16 text-blue-700" />
            </div>
            <p className={styles.number__style}>+14798024855</p>
          </div>
          <div className="">
            <HiOutlineUserCircle size={"2.4rem"} />
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Navbar;
