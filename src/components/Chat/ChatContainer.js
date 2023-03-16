import { message } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import socketIOClient from "socket.io-client";
import { useChatScroll, UseChatScroll } from '../../hooks/UseChatScroll';
import { useAppCommonDataProvider } from '../AppCommonDataProvider/AppCommonDataProvider';
import { ChatBoxReciver, ChatBoxSender } from './ChatBox';
import { InputChatField } from './InputChatField';

export const ChatContainer = ({ singleChat, initialChat }) => {
    console.log(initialChat, "fshngbvdsj")
    const { createTeamInboxDetails, setCreateTeamInboxDetails } = useAppCommonDataProvider();
    const { contactDetailData } = createTeamInboxDetails;
    let socketio = socketIOClient("http://localhost:8000")
    const [chats, setChats] = useState([])
    // const [user, setUser] = useState(localStorage.getItem("user"))
    const [term, setTerm] = useState("")

    const ref = useChatScroll(chats)

    useEffect(() => {
        socketio.on('chat_client', senderChats => {
            console.log(senderChats, "last message")
            setChats([...senderChats])
        })
    }, [])

    ////--------------Apend object into single chat---------------////
    useEffect(() => {
        setChats(singleChat)
    }, [singleChat])

    function sendChatToSocket(chat) {
        socketio.emit("chat", [{
            message: chat,
            mobileNumber: contactDetailData?.customerId?.mobileNumber,
            chatId: contactDetailData?._id,
        }])
    }


    function ChatMessageList({ chat, messageTime }) {
        return <ChatBoxSender message={chat} messageTime={messageTime} />
    }

    // function RecieverChat({chat,messageTime}{
    //     return <ChatBoxReciver message={chat} messageTime={messageTime} />
    // })


    return (
        <div className='' >
            <div className='h-[62vh] overflow-y-auto' ref={ref} >
                {/* {singleChat?.length > 0 && singleChat?.map((e) => console.log(e.message))} */}
                {chats?.length > 0 && chats?.map((chat, index) => <ChatMessageList chat={chat.message} messageTime={chat.createdAt} key={index.toString()} />)}
            </div>
            {/* <InputChatField placeholder="send message..." onClick={(e) => { console.log(e, "hgnh") }} onChange={(e) => e.target.value} /> */}
            <InputChatField placeholder="send message..." sendChatToSocket={sendChatToSocket} onKeyPress={sendChatToSocket} />
        </div>
    )
}

