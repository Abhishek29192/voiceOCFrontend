import React, { useEffect, useState } from "react";
import { TbInbox } from "react-icons/tb";
import { RiContactsBook2Line } from "react-icons/ri";
import { VscListSelection } from "react-icons/vsc";
import { RxDividerVertical } from "react-icons/rx";
import { BiBell } from "react-icons/bi";
import { MdOutlineCampaign } from "react-icons/md";
import { BsExclamationCircle } from "react-icons/bs";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsBroadcast } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Routes as AppRoute } from "../../constants/RoutesNames";
import ResponsiveNavbar from "../ResponsiveNavbar";
import styles from "./Navbar.module.css";

export const Navbar = ({
  setOpenProfile,
  openProfile,
  setNewBroadcastPopup1,
  activeTab
}) => {

  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  console.log(activeTab)
  const role = JSON.parse(localStorage.getItem("userDetails")).role;



  const handlebroadcast = () => {
    localStorage.setItem("activeTab", "broadcast");
    localStorage.setItem("activeMenuOption", "boradcastHistory");
    navigate(`${AppRoute.history}`);
    setIsActive(true)
  };

  const handleContacts = () => {
    localStorage.setItem("activeTab", "contacts");
    navigate(`${AppRoute.contacts}`);
    setIsActive(true)

  };

  const handleInbox = () => {
    localStorage.setItem("activeTab", "inbox");
    navigate(`${AppRoute.teamInbox}`);
    setIsActive(true)
  };

  const handleCampaign = () => {
    localStorage.setItem("activeTab", "campaign");
    navigate(`${AppRoute.campaign}`);
  };

  // useEffect(() => {
  //   console.log(isActive, "active")
  // }, [isActive])


  return (
    <div className={styles.nav__container}>
      {/* <div className="flex xl:hidden h-full p-3 w-[18rem] ">
        <ResponsiveNavbar />
      </div> */}
      {role === "admin" ? (
        <div className=" flex w-[60%]">
          <div
            // onClick={() => setIsActive("teamInbox")}
            onClick={() => {
              handleInbox();
              setIsActive(true)
            }}
            // style={{ border: "1px solid green" }}
            className={`${activeTab === "inbox" ? styles.icon__container__active : styles.icon__container}`}
          >
            <TbInbox className={styles.icon__style} />
            <p className="text-base"
            >
              Team Inbox
            </p>
          </div>
          <div
            // onClick={() => setActive(1)}
            // onClick={() => setIsActive("contact")}
            onClick={() => {
              handleContacts();
            }}
            className={`${activeTab === "contacts" ? styles.icon__container__active : styles.icon__container}`}
          >
            <RiContactsBook2Line className={styles.icon__style} />
            <p className="text-base"  >
              Contacts
            </p>
          </div>
          <div
            // onClick={() => setActive(2)}
            // onClick={() => setIsActive("broadcast")}
            onClick={() => {
              handlebroadcast();
            }}
            className={`${activeTab === "broadcast" ? styles.icon__container__active : styles.icon__container}`}

          >
            <BsBroadcast
              className={styles.icon__style}
            />
            <p className="text-base"  >
              Broadcast
            </p>
          </div>

          <div className={styles.icon__container}
            onClick={() => {
              handleCampaign();
            }}
          >
            <MdOutlineCampaign size={"1.5rem"} className={styles.icon__style} />
            <p className="text-base"  >
              Campaign
            </p>
          </div>
        </div>
      ) : (
        <div className=" xl:flex hidden w-[60%]">
          <div className={styles.icon__container} onClick={handleInbox}>
            <TbInbox className={styles.icon__style} />
            <p className="text-base" >
              Team Inbox
            </p>
          </div>
        </div>
      )
      }


      <div className="flex justify-between items-center w-[35%]">
        {/* <div className="hidden xl:flex items-center">
          <VscListSelection size={"1.5rem"} />
          <RxDividerVertical className="ml-2 h-7 w-12 items-center text-slate-300" />
          <BiBell size={"1.4rem"} />
        </div> */}
        <div className="flex  right-0 justify-end w-full ml-22">
          <div className="pl-18">
            <div className="flex item-center justify-center">
              <p className={styles.connectedText}>CONNECTED</p>
              <BsExclamationCircle className="pl-10 text-blue-700" />
            </div>
            <p className={styles.number__style}>+919560410355</p>
          </div>
          <div >
            <HiOutlineUserCircle
              size={"2.7rem"}
              onClick={() => setOpenProfile(!openProfile)}
            />
          </div>
        </div>
      </div>
    </div >
  );
};

export default Navbar;
