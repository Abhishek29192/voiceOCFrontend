import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { TbInbox } from "react-icons/tb";
import { RiContactsBook2Line } from "react-icons/ri";
import { BsBroadcast } from "react-icons/bs";
import { TbSettingsAutomation } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";
import { CiSettings } from "react-icons/ci";
import { BiBell } from "react-icons/bi";
import { SlPeople } from "react-icons/sl";
import { GrIntegration } from "react-icons/gr";
import { TbWebhook } from "react-icons/tb";
import "./ResponsiveNavbar.css";
import { useNavigate } from "react-router-dom";
import { Routes as AppRoute } from "../../constants/RoutesNames";
// import { useDetectClickOutside } from "react-detect-click-outside";

export default function ResponsiveNavbar() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  // const ref = useDetectClickOutside({
  //   onTriggered: (open) => {
  //     setOpen(!open);
  //   },
  // });

  const ItemObj = [
    { icon: <TbInbox size={"1.2rem"} />, item: "Team Inbox", key: 1 },
    { icon: <RiContactsBook2Line size={"1.2rem"} />, item: "Contacts", key: 2 },
    { icon: <BsBroadcast size={"1.2rem"} />, item: "Boadcasts", key: 3 },
    {
      icon: <TbSettingsAutomation size={"1.2rem"} />,
      item: "Automation",
      key: 4,
    },
    { icon: <RxDashboard size={"1.2rem"} />, item: "Dashboard", key: 5 },
    { icon: <CiSettings size={"1.2rem"} />, item: "Settings" },
    { icon: <SlPeople size={"1.2rem"} />, item: "Operator Management", key: 6 },
    { icon: <GrIntegration size={"1.2rem"} />, item: "Integration", key: 7 },
    { icon: <TbWebhook size={"1.2rem"} />, item: "Webhooks", key: 8 },
  ];

  const handleMenu = () => {
    setOpen((open) => !open);
  };

  const selectedOption = (element) => {
    switch (element) {
      case "Boadcasts":
        navigate(`${AppRoute.templateMessage}`);
        console.log(AppRoute.templateMessage);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    let handler = () => {
      setOpen(false);
    };

    document.addEventListener("mousedown", handler);
  });

  return (
    <div className="flex flex-col relative justify-center">
      <div onClick={handleMenu}>
        <GiHamburgerMenu
          color="black"
          size={"1.5rem"}
          className="cursor-pointer"
        />
      </div>
      <div className="absolute bg-white-500 border -top-3 -ml-5 w-52">
        {open ? (
          <div className=" flex justify-center w-full items-center">
            <div className="menu_nav_top">
              <div className="flex flex-row w-full p-2 justify-center items-center">
                <div className="flex flex-col">
                  <div className="connection_status">
                    CONNECTION
                    <div className="status_info">!</div>
                  </div>
                  <div>
                    <span className="connecion_number">+14798024855</span>
                  </div>
                </div>
                <div className="notification_icon">
                  <BiBell size={"1.5rem"} />
                </div>
              </div>

              <div className="h-[80vh] p-2">
                {ItemObj?.map((ele, index) => {
                  return (
                    <div
                      className="flex items-center mt-9 cursor-pointer"
                      onClick={() => {
                        selectedOption(ele.item);
                      }}
                      key={ele.key}
                    >
                      <div className="pr-2">{ele.icon}</div>
                      <div className="items-center text-sm">{ele.item}</div>
                    </div>
                  );
                })}
              </div>
              <button className="menu_button">Get Started</button>
            </div>
          </div>
        ) : (
          " "
        )}
      </div>
    </div>
  );
}
