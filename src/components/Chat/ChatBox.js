import React, { useEffect, useRef } from "react";
import moment from "moment/moment";
import { BsFillFilePdfFill } from "react-icons/bs";
import { HiOutlineDownload } from "react-icons/hi";
import { HandleDownload } from "./downloadFile";

// fetch('http://3.6.197.151:3057/sample.xls')
//   .then((response) => response.blob())
//   .then((blob) => {
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'sample.xls';
//     document.body.appendChild(a);
//     a.click();
//     a.remove();

const handleDownload = (message) => {
  console.log("clickedddd")
  console.log(message, "------------------");
  fetch(message.url)
    .then((response) => response.blob())
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = message.name;
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
};

export const ChatBoxReciver = ({
  message,
  messageType,
  messageTime,
  messageFrom,
}) => {
  return messageType === "text" ? (
    <div>
      <div
        style={{ flexFlow: "column" }}
        className="flex flex-wrap bg-white w-fit px-11 py-2 poppins rounded-r-2xl rounded-b-2xl m-3 mt-4 max-w-[50%] break-words "
      >
        {/* <audio ref={audioPlayer} src={notification} /> */}
        {message}
      </div>
      <div className="text-xs px-5 py-2">
        {moment(messageTime).format("DD-MM-yyyy HH-mm")}
      </div>
    </div>
  ) : messageType === "IMAGE" ? (
    <>
      <div className="flex flex-col bg-white w-fit px-2 py-2 poppins rounded-r-2xl rounded-b-2xl m-3 mt-4 max-w-[40%] ">
        <div
          className="flex ml-auto my-2 mr-1 w-[50%]"
          onClick={() => {
            handleDownload(message, Date.now() + ".jpg");
          }}
        >
          <HiOutlineDownload size={"1.5rem"} />
        </div>
        <a href={message} download target="_blank">
          <img src={message} className=" h-[50%] w-[50%] rounded-lg" />
        </a>
      </div>
      <div className="flex text-xs py-2 mx-5">
        {moment(messageTime).format("DD-MM-yyyy HH-mm")}
      </div>
    </>
  ) : messageType === "VIDEO" ? (
    <>
      <div className="flex flex-col bg-white w-fit px-2 py-2 poppins rounded-r-2xl rounded-b-2xl m-3 mt-4 max-w-[40%] ">
        <div
          className="flex ml-auto my-2 mr-1"
          onClick={() => {
            handleDownload(message, Date.now() + ".mp4");
          }}
        >
          <HiOutlineDownload size={"1.5rem"} />
        </div>
        <video controls>
          <source src={message} />
        </video>
      </div>
      <div className="flex text-xs py-2 mx-5">
        {moment(messageTime).format("DD-MM-yyyy HH-mm")}
      </div>
    </>
  ) : (
    <div>
      <div className="flex flex-col bg-white w-fit  py-2 poppins rounded-r-2xl rounded-b-2xl m-3 mt-4 max-w-[40%] text-wrap ">
        <div
          className="flex ml-auto my-2 mr-1"
          onClick={() => {
            handleDownload(message.url, message.name);
          }}
        >
          <HiOutlineDownload size={"1.5rem"} />
        </div>
        <div className="p-5 flex flex-col justify-center items-center">
          <div>
            <BsFillFilePdfFill size={"3rem"} color={"red"} />
          </div>
          <div
            style={{ flexFlow: "column", width: "95%" }}
            className="my-2 break-words max-w[45%] truncate"
          >
            {message.name}
          </div>
        </div>
      </div>
      <div className="text-xs px-5 py-2">
        {moment(messageTime).format("DD-MM-yyyy HH-mm")}
      </div>
    </div>
  );
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ChatBoxSender = ({ message, messageTime, messageType, messageMedia }) => {
  return messageType === "text" ? (
    <div className="flex flex-col w-full items-end justify-end py-2">
      <div
        style={{ flexFlow: "column" }}
        className="flex flex-flow-col bg-white w-fit px-11 py-2 poppins rounded-l-2xl rounded-b-2xl m-2 max-w-[50%] break-words "
      >
        {/* {messageMedia?(
          
        ):(null)} */}
        {message}
      </div>
      <div className="text-xs px-5 py-2">
        {moment(messageTime).format("DD-MM-yyyy HH-mm")}
      </div>
    </div>
  ) : messageType === "IMAGE" ? (
    <div className="flex flex-col w-full items-end justify-end py-2 h-[50%]">
      <div className="bg-white p-2 rounded-l-md rounded-br-md mx-2">
        <div
          className="flex justify-start w-[50%] mb-2"
          onClick={() => {
            handleDownload("http://3.6.197.151:3057/" + message, message);
          }}
        >
          <HiOutlineDownload size={"1.5rem"} />
        </div>
        <a href={"http://3.6.197.151:3057/" + message} download>
          <img
            src={"http://3.6.197.151:3057/" + message}
            className="rounded-md"
          />
        </a>
      </div>
      <div className="text-xs px-5 py-2">
        {moment(messageTime).format("DD-MM-yyyy HH-mm")}
      </div>
    </div>
  ) : messageType === "VIDEO" ? (
    <div className="flex flex-col w-full items-end justify-end py-2">
      <div className="flex flex-col bg-white w-fit px-2 py-4 poppins rounded-l-2xl rounded-b-2xl  max-w-[50%] items-center">
        <div
          className="flex justify-start w-[100%] mb-2"
          onClick={() => {
            handleDownload("http://3.6.197.151:3057/" + message, message);
          }}
        >
          <HiOutlineDownload size={"1.5rem"} />
        </div>
        <video controls>
          <source src={"http://3.6.197.151:3057/" + message} />
        </video>
      </div>
    </div>
  ) : (messageType === "notice" ? (
    <div className="flex flex-col bg-slate-500 w-fit px-4 py-1 poppins text-white rounded-2xl rounded-b-2xl m-2 mx-40 max-w-[100%] items-center justify-center">
      {message}
    </div>
  ) : (

    <div className="flex flex-col w-full items-end justify-end py-2">
      <div className="flex flex-col bg-white w-fit px-11 py-4 poppins rounded-l-2xl rounded-b-2xl m-2 max-w-[50%] items-center">
        <div
          className="flex justify-start w-[140%] mb-2"
          onClick={() => {
            handleDownload("http://3.6.197.151:3057/" + message, message);
          }}
        >
          <HiOutlineDownload size={"1.5rem"} />
        </div>
        <div>
          <BsFillFilePdfFill size={"3rem"} color={"red"} />
        </div>
        <div
          style={{ flexFlow: "column", width: "95%" }}
          className="my-2 break-words max-w[45%]  "
        >
          {message}
        </div>
      </div>
      <div className="text-xs px-5 py-2">
        {moment(messageTime).format("DD-MM-yyyy HH-mm")}
      </div>
    </div>

  )







    // <div className="flex flex-col w-full items-end justify-end py-2">
    //   <div className="flex flex-col bg-white w-fit px-11 py-4 poppins rounded-l-2xl rounded-b-2xl m-2 max-w-[50%] items-center">
    //     <div
    //       className="flex justify-start w-[140%] mb-2"
    //       onClick={() => {
    //         handleDownload("http://3.6.197.151:3057/" + message, message);
    //       }}
    //     >
    //       <HiOutlineDownload size={"1.5rem"} />
    //     </div>
    //     <div>
    //       <BsFillFilePdfFill size={"3rem"} color={"red"} />
    //     </div>
    //     <div
    //       style={{flexFlow: "column", width: "95%"}}
    //       className="my-2 break-words max-w[45%]  "
    //     >
    //       {message}
    //     </div>
    //   </div>
    //   <div className="text-xs px-5">
    //     {moment(messageTime).format("DD-MM-yyyy HH-mm")}
    //   </div>
    // </div>
  );
};
