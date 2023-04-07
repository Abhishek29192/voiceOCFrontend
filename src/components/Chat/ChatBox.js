import React from 'react'
import moment from 'moment/moment'
import { BsFillFilePdfFill } from "react-icons/bs"

export const ChatBoxReciver = ({ message, messageType, messageTime }) => {
    return (
        (messageType === "text") ?
            (<div>
                <div style={{ flexFlow: "column" }} className="flex flex-wrap bg-white w-fit px-11 py-2 poppins rounded-r-2xl rounded-b-2xl m-3 mt-4 max-w-[50%] break-words ">{message}</div>
                <div className='text-xs px-5'>{moment(messageTime).format("DD-MM-yyyy HH-mm")}</div>
            </div>) : ((messageType === "IMAGE") ? (
                <>
                    <div className="flex flex-col bg-white w-fit px-2 py-2 poppins rounded-r-2xl rounded-b-2xl m-3 mt-4 max-w-[40%] ">
                        <a href={message} download target="_blank">
                            <img src={message} className="h-[50%] rounded-lg" />
                        </a>
                    </div>
                    <div className='flex text-xs my-1 mx-5'>{moment(messageTime).format("DD-MM-yyyy HH-mm")}</div>
                </>
            ) : (messageType === "VIDEO" ? (
                <>
                    <div className="flex flex-col bg-white w-fit px-2 py-2 poppins rounded-r-2xl rounded-b-2xl m-3 mt-4 max-w-[40%] ">
                        <video controls>
                            <source src={message} />
                        </video>
                    </div>
                    <div className='flex text-xs my-1 mx-5'>{moment(messageTime).format("DD-MM-yyyy HH-mm")}</div>
                </>
            ) : (
                <div>
                    <div className="flex flex-col bg-white w-fit  py-2 poppins rounded-r-2xl rounded-b-2xl m-3 mt-4 max-w-[40%] ">

                        {/* <div className="flex flex-col bg-white w-fit py-4 poppins rounded-l-2xl rounded-b-2xl m-2 max-w-[50%] justify-center items-center"> */}
                        <div className='p-5 flex flex-col justify-center items-center'>
                            <div><BsFillFilePdfFill size={"3rem"} color={"red"} /></div>
                            <div style={{ flexFlow: "column" }} className='my-2 break-words max-w[45%] '>{message.name}</div>
                        </div>
                        {/* </div> */}
                    </div>
                    <div className='text-xs px-5'>{moment(messageTime).format("DD-MM-yyyy HH-mm")}</div>
                </div>
            )))
    )
}


export const ChatBoxSender = ({ message, messageTime, messageType }) => {
    return (
        (messageType === "text") ?
            (<div className="flex flex-col w-full items-end justify-end py-2">
                <div style={{ flexFlow: "column" }} className="flex flex-flow-col bg-white w-fit px-11 py-2 poppins rounded-l-2xl rounded-b-2xl m-2 max-w-[50%] break-words ">{message}</div>
                <div className='text-xs px-5'>{moment(messageTime).format("DD-MM-yyyy HH-mm")}</div>
            </div>) : ((messageType === "IMAGE") ? (
                <div className="flex flex-col w-full items-end justify-end py-2 h-[50%]">
                    <div className='bg-white p-2 rounded-l-md rounded-br-md mx-2'>
                        <a href={'http://3.6.197.151:3057/' + message} download>
                            <img src={'http://3.6.197.151:3057/' + message} className="rounded-md" />
                        </a>
                    </div>
                    <div className='text-xs px-5'>{moment(messageTime).format("DD-MM-yyyy HH-mm")}</div>
                </div>
            ) : (messageType === "VIDEO" ? (
                <div className="flex flex-col w-full items-end justify-end py-2">
                    <div className="flex flex-col bg-white w-fit px-11 py-4 poppins rounded-l-2xl rounded-b-2xl  max-w-[50%] items-center">
                        <video controls>
                            <source src={'http://3.6.197.151:3057/' + message} />
                        </video>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col w-full items-end justify-end py-2">
                    <div className="flex flex-col bg-white w-fit px-11 py-4 poppins rounded-l-2xl rounded-b-2xl m-2 max-w-[50%] items-center">
                        <div><BsFillFilePdfFill size={"3rem"} color={"red"} /></div>
                        <div style={{ flexFlow: "column" }} className='my-2 break-words max-w[45%] '>{message}</div>
                    </div>
                    <div className='text-xs px-5'>{moment(messageTime).format("DD-MM-yyyy HH-mm")}</div>
                </div>
            )))
    )
}


