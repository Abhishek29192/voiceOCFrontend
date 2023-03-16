import moment from 'moment/moment'
import React from 'react'

export const ChatBoxReciver = ({ message }) => {
    return (
        <div className="flex bg-white w-fit px-11 py-2 poppins rounded-r-2xl rounded-b-2xl m-3 mt-4 max-w-[50%]">{message}</div>
    )
}


export const ChatBoxSender = ({ message, messageTime }) => {
    return (
        <div className="flex flex-col w-full items-end justify-end py-2">
            <div className="flex bg-white w-fit px-11 py-2 poppins rounded-l-2xl rounded-b-2xl m-2 max-w-[50%]">{message}</div>
            <div className='text-xs px-5'>{moment(messageTime).format("HH-mm")}</div>
        </div>
    )
}
