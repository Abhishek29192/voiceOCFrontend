import React, { useEffect, useRef, useState } from 'react'
import socketIOClient from "socket.io-client";
import { useChatScroll, UseChatScroll } from '../../hooks/UseChatScroll';
import { useAppCommonDataProvider } from '../AppCommonDataProvider/AppCommonDataProvider';
import { ChatBoxImageReciver, ChatBoxImageSender, ChatBoxReciver, ChatBoxSender } from './ChatBox';
import { InputChatField } from './InputChatField';

export const ChatContainer = ({ singleChat, initialChat, selectedMobileNumber }) => {
    // console.log(selectedMobileNumber, "selected number")
    const { createTeamInboxDetails, setCreateTeamInboxDetails } = useAppCommonDataProvider();
    const { contactDetailData } = createTeamInboxDetails;
    const [chats, setChats] = useState(initialChat)
    // const [user, setUser] = useState(localStorage.getItem("user"))
    const [image, setImage] = useState("")
    const [term, setTerm] = useState("")
    const [typeOfMessage, setTypeOfMessage] = useState("text");
    const [messageStatus, setMessageStatus] = useState(false)

    let socketio = socketIOClient("http://3.6.197.151:3057")
    // let socketio = socketIOClient("http://127.0.0.1:8000")

    // console.log(contactDetailData?.customerId?.mobileNumber, "contact  detailsssssss")

    const ref = useChatScroll(chats);

    useEffect(() => {
        socketio.on('chat_client', senderChats => {
            console.log(senderChats, "sender   chat")
            // if (senderChats[0].fullContactNumber == singleChat[0].fullContactNumber) {
            setChats([...senderChats])
            // } else {
            //     console.log("contact number")
            // }
        })
        socketio.on('disconnect_socket', disconnect => {
            console.log(disconnect, "disconnect")
        })
        socketio.on("firstMessage", firstMessage => {
            setMessageStatus(firstMessage)

        })
    }, [])

    console.log(chats, "chaatssss")

    useEffect(() => {
        console.log("single chatttt")
        setChats(singleChat)
    }, [singleChat])


    useEffect(() => {
        console.log("initial chat ++++++++++")
        setChats(initialChat)
    }, [initialChat])


    function sendChatToSocket(chat) {
        console.log(chat, typeof chat, "videosssssssssssssss")
        if (typeof chat === "object") {
            socketio.emit("chat", [{
                messageType: typeOfMessage,
                message: chat,
                fileName: chat.name,
                mobileNumber: contactDetailData?.customerId?.mobileNumber || initialChat[0].fullContactNumber,
                chatId: contactDetailData?._id || initialChat[0].chatId,
            }])
        } else {
            socketio.emit("chat", [{
                messageType: typeOfMessage,
                message: chat,
                mobileNumber: contactDetailData?.customerId?.mobileNumber || initialChat[0].fullContactNumber,
                chatId: contactDetailData?._id || initialChat[0].chatId,
            }])
        }
    }


    function SenderChat({ chat, messageTime, chatType }) {
        return <ChatBoxSender message={chat} messageTime={messageTime} messageType={chatType} />
    }

    function RecieverChat({ chat, messageTime, chatType }) {
        return <ChatBoxReciver message={chat} messageTime={messageTime} messageType={chatType} />
    }

    return (
        <div>
            <div className='h-[62vh] overflow-y-auto' ref={ref} >

                {/* {chats?.length > 0 && chats?.map((chat, index) => chat.messageFrom === "agent" ? <SenderChat chat={chat.message} messageType={chat.type} messageTime={chat.createdAt} key={index.toString()} /> : <RecieverChat chat={chat.message} messageType={chat.type} messageTime={chat.createdAt} key={index.toString()} />)} */}

                {chats?.length > 0 && chats?.map((chat, index) => chat.messageFrom === "agent" ? <SenderChat chat={chat.message} messageTime={chat.createdAt} chatType={chat.type} key={index.toString()} /> : <RecieverChat chat={chat.message} messageTime={chat.createdAt} chatType={chat.type} key={index.toString()} />)}
            </div>

            {/* <InputChatField placeholder="send message..." openFileUpload={openFileUpload} setOpenFileUpload={setOpenFileUpload} setOpenEmoji={setOpenEmoji} sendChatToSocket={sendChatToSocket} onKeyPress={sendChatToSocket} /> */}
            <InputChatField placeholder="send message..." sendChatToSocket={sendChatToSocket} onKeyPress={sendChatToSocket} setImage={setImage} setTypeOfMessage={setTypeOfMessage} messageStatus={messageStatus} initialChat={initialChat} />
        </div>
    )
}

