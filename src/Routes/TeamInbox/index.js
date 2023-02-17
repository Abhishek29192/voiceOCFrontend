import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import cookie from "react-cookies";
import { PrimaryButton, SecondaryButton } from "../../components/Button";
import { AiOutlineSearch } from "react-icons/ai"
import { SerachSection } from "./SerachSection";
import { NewMessage } from "./NewMessage";
import { FaWhatsapp } from "react-icons/fa"
import { TiMessages } from "react-icons/ti"
import { FaPen } from "react-icons/fa"


export const TeamInbox = () => {
  const [search, setSearch] = useState(false);
  const [newMessage, setNewMessage] = useState(false);
  useEffect(() => {
    cookie.save(
      "accessToken",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiI2M2UwYzhjZDQ4OTYzMzdiNmUyZTc5NTIiLCJyb2xlIjoic3VwZXJhZG1pbiIsImlhdCI6MTY3NTc1MTMxN30.AZUDv5jufP2FfyiWb0MN5j-hk3gC-WG3ujp03OVMZFU",
      {}
    );
  }, []);

  const rowData = [{
    Name: "Abhishek kashyap",
    dashboard_url: "www.usdjghmkj.com",
    username: "abhiK",
    password: "AAAAAA"
  }]

  const colourStyles = {
    control: (styles) => {
      return {
        ...styles,
        backgroundColor: "white",
        width: "17rem",
        height: "2.7rem",
        boxShadow: "none",
        fontSize: "12px",
        fontFamily: "poppins",
        marginTop: "2px",
        // border: "1px solid #5536db",
        // "&:hover": {
        //   border: "1px solid #5536db",
        // },
      };
    },
    option: (styles, { data, isDisabled }) => {
      return {
        ...styles,
        backgroundColor: isDisabled ? "red" : "white",
        color: "#000",
        width: "7rem",
        fontSize: "12px",
        fontFamily: "poppins",
        cursor: isDisabled ? "not-allowed" : "pointer",
      };
    },
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="flex">
        <div className="w-[25%] border justify-center h-[100vh]">
          <div className="flex w-full justify-center items-center">
            <PrimaryButton text={`New Message`} className="w-[60%] m-5 " onClick={() => { setNewMessage(!newMessage); setSearch(false) }} />
            <div className="bg-slate-200 p-2 h-full rounded-md" onClick={() => { setSearch(!search); setNewMessage(false) }}>
              <AiOutlineSearch size={"1.5rem"} className="" />
            </div>
          </div>
          {
            search && !newMessage && (
              <>
                <div className="p-2">
                  <SerachSection />
                </div>
              </>
            )
          }
          {
            newMessage && !search && (
              <div className="px-2">
                <NewMessage />
              </div>

            )
          }
          {!newMessage && !search && (<div>
            <div className="border-b-[1px] mt-3">
              <div className="flex p-2 rounded-md items-center">
                <div className="flex h-11 px-4 py-[0.70rem] ml-3  bg-slate-200 rounded-3xl items-center justify-center">
                  <div className="font-extrabold">H</div>
                </div>
                <div className="px-7 w-full">
                  <div className="font-bold">+919998754621</div>
                  <div className="text-slate-300 text-sm">16/02/2023 3:32 PM</div>
                  <div className="py-2 text-slate-300 text-sm">Hiiii....</div>
                </div>
              </div>
            </div>
            <div className="border-b-[1px]">
              <div className="flex p-2 rounded-md items-center">
                <div className="flex h-11 px-4 py-[0.70rem] ml-3  bg-slate-200 rounded-3xl items-center justify-center">
                  <div className="font-extrabold">H</div>
                </div>
                <div className="px-7 w-full">
                  <div className="font-bold">+919998754621</div>
                  <div className="text-slate-300 text-sm">16/02/2023 3:32 PM</div>
                  <div className="py-2 text-slate-300 text-sm">Hiiii....</div>
                </div>
              </div>
            </div>
            <div className="border-b-[1px]">
              <div className="flex p-2 rounded-md items-center">
                <div className="flex h-11 px-4 py-[0.70rem] ml-3  bg-slate-200 rounded-3xl items-center justify-center">
                  <div className="font-extrabold">H</div>
                </div>
                <div className="px-7 w-full">
                  <div className="font-bold">+919998754621</div>
                  <div className="text-slate-300 text-sm">16/02/2023 3:32 PM</div>
                  <div className="py-2 text-slate-300 text-sm">Hiiii....</div>
                </div>
              </div>
            </div>
            <div className="border-b-[1px]">
              <div className="flex p-2 rounded-md items-center">
                <div className="flex h-11 px-4 py-[0.70rem] ml-3  bg-slate-200 rounded-3xl items-center justify-center">
                  <div className="font-extrabold">H</div>
                </div>
                <div className="px-7 w-full">
                  <div className="font-bold">+919998754621</div>
                  <div className="text-slate-300 text-sm">16/02/2023 3:32 PM</div>
                  <div className="py-2 text-slate-300 text-sm">Hiiii....</div>
                </div>
              </div>
            </div>
          </div>)}
        </div>
        <div className="w-[50%] border bg-slate-200">Abhisdhmsbk,jhmn,mn</div>
        <div className="w-[25%] p-2 items-center">
          <div className="flex py-5 px-1 border-b-[1px] items-center">
            <div className="flex h-11 px-4 py-[0.70rem] ml-2 bg-slate-200 rounded-3xl items-center justify-center">
              <div className="font-extrabold">H</div>
            </div>
            <div className="flex px-2 w-full justify-between items-center">
              <div>
                <div className="font-bold">+919998754621</div>
                <div className="text-sm poppins">Available</div>
              </div>
              <div className="flex ">
                <div className="flex bg-slate-200 rounded-md p-2">
                  <FaWhatsapp />
                </div>
                <div className="flex bg-slate-200 rounded-md p-2 ml-2">
                  <TiMessages />
                </div>
              </div>
            </div>
          </div>
          <div className="py-4 px-1 border-b-[1px] items-center">
            <div className="poppins font-bold">Basic information</div>
            <div className="flex py-2">
              <div className="poppins text-sm font-semibold">Phone Number : </div>
              <div className="poppins text-sm">+917974077787</div>
            </div>
          </div>
          <div className="flex flex-col border-b-[1px]">
            <div className="flex justify-between py-4 px-1  items-center">
              <div className="poppins font-bold text-[0.95rem]">Contact custom parameters</div>
              <div className="relative w-fit">
                <PrimaryButton className="h-[35px]" />
                <FaPen color="white" className="absolute top-2 left-3" />
              </div>
            </div>
            <div>
              {rowData.map((e) => {
                return (
                  <div className="flex flex-col justify-center pt-4">
                    <div className="flex justify-center px-2">
                      <div className="flex pl-2 py-1 border rounded-l-md w-40">Name</div>
                      <div className="border rounded-r-md w-full py-1 flex justify-center">{e.Name}</div>
                    </div>
                    <div className="flex justify-center px-2">
                      <div className="flex pl-2 py-1 border rounded-l-md w-40">Base url </div>
                      <div className="border rounded-r-md w-full py-1 flex justify-center">{e.dashboard_url}</div>
                    </div>
                    <div className="flex justify-center px-2 pb-4">
                      <div className="flex pl-2 py-1 border rounded-l-md w-40">Username </div>
                      <div className="border rounded-r-md w-full py-1 flex justify-center">{e.username}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
