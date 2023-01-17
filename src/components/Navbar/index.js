import React from "react";
import { TbInbox } from "react-icons/tb";
import { RiContactsBook2Line } from "react-icons/ri";
import { VscListSelection } from "react-icons/vsc";
import { RxDividerVertical } from "react-icons/rx";
import { BiBell } from "react-icons/bi";
import { BsExclamationCircle } from "react-icons/bs";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsBroadcast } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Routes as AppRoute } from "../../constants/RoutesNames";
import ResponsiveNavbar from "../ResponsiveNavbar";
import { TemplateData } from "../../hook/Query";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  const navigate = useNavigate();
  const handlebroadcast = () => {
    navigate(`${AppRoute.broadcast}`);
  };

  const handleContacts = () => {
    navigate(`${AppRoute.contacts}`);
  };

  const handleInbox = () => {
    navigate("/");
  };

  const { data } = TemplateData();
  // console.log(data.data[0].title, "dataa");

  // const { data } = useQuery("templateData", fetchTempalteMessageData, {
  //   cacheTime: 5000, // to remain data in cache memory
  //   staleTime: 10000, //is the data dosent changes we can use to decrease network request
  //   // enabled: false,  //TO DIABLE THE API CALL
  //   select: (data) => {
  //     const title = data.data.map((i) => console.log(i.title));
  //   },
  // });
  //

  return (
    <div className={styles.nav__container}>
      <div className="flex xl:hidden h-full p-3 w-[18rem] ">
        <ResponsiveNavbar />
      </div>
      <div className="ml-28 xl:flex hidden">
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
      </div>

      <div className=" pl-28 hidden xl:flex items-center">
        <VscListSelection size={"1.5rem"} />
        <RxDividerVertical className="ml-2 h-7 w-12 items-center text-slate-300" />
      </div>
      <div className="hidden xl:flex">
        <BiBell size={"1.4rem"} />
      </div>
      <div className="pl-9 hidden xl:block ">
        <div className="flex item-center justify-center">
          <p className={styles.connectedText}>CONNECTED</p>
          <BsExclamationCircle className="pl-1 text-blue-700" />
        </div>
        <p className={styles.number__style}>+14798024855</p>
      </div>
      <HiOutlineUserCircle size={"2.4rem"} />
    </div>
  );
};

export default Navbar;
