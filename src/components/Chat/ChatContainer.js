import React, { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { useChatScroll, UseChatScroll } from "../../hooks/UseChatScroll";
import { useTeamInboxContactList } from "../../hooks/useQueryApi";
import { useAppCommonDataProvider } from "../AppCommonDataProvider/AppCommonDataProvider";
import {
    ChatBoxImageReciver,
    ChatBoxImageSender,
    ChatBoxReciver,
    ChatBoxSender,
} from "./ChatBox";
import { InputChatField } from "./InputChatField";

export const ChatContainer = ({
    singleChat,
    initialChat,
    selectedMobileNumber,
}) => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const { mutateAsync: contactNumber } = useTeamInboxContactList(userDetails);
    const { createTeamInboxDetails, setCreateTeamInboxDetails } =
        useAppCommonDataProvider();
    const { contactDetailData } = createTeamInboxDetails;
    const [chats, setChats] = useState([]);
    const [contactNumbers, setContactNumbers] = useState([]);
    const [image, setImage] = useState("");
    const [typeOfMessage, setTypeOfMessage] = useState("text");
    const [messageStatus, setMessageStatus] = useState(false);
    const [chatsData, setChatsData] = useState({})
    let socketio = socketIOClient("http://3.6.197.151:3057");
    const ref = useChatScroll(chats);

    useEffect(() => {
        // contactNumber()
        //     .then((res) => {
        //         const numbersList = [];

        //         const numbers = res?.data?.contactList.map(e => ({ mobileNumber: e?.customerId?.mobileNumber }))
        //         console.log(numbers, 'number list')
        //         setContactNumbers(numbers);
        //     })
        //     .catch((err) => console.log(err));
    }, []);
    useEffect(() => {
        let numbersList
        contactNumber()
            .then((res) => {
                // const numbersList = [];

                const numbers = res?.data?.contactList.map(e => ({ mobileNumber: e?.customerId?.mobileNumber }))
                console.log(numbers, 'number list')
                // setContactNumbers(numbers);
                numbersList = numbers
            })
            .catch((err) => console.log(err));

        socketio.on("chat_client", (senderChats) => {
            let tempData = chatsData
            // console.log(senderChats, "Sender Chats");
            // console.log(numbersList, 'sdfsfsf hhhh hh h h h h h')
            tempData = numbersList.map(number => {
                if (number.mobileNumber == senderChats[0]?.fullContactNumber) {

                    return {
                        mobileNumber: number.mobileNumber,
                        chats: senderChats
                    }
                } else return number
            })
            setChatsData(tempData)
            // if (senderChats[0]?.fullContactNumber == selectedMobileNumber ){

            // }
            // if (selectedMobileNumber !== undefined) {
            // if (senderChats[0]?.fullContactNumber === selectedMobileNumber) {
            // console.log(senderChats[0]?.fullContactNumber, "sender chat contact")
            // console.log(selectedMobileNumber, "selected number")
            setChats([...senderChats]);
            // } else {
            //     console.log("Abhishek")
            // }
            // }
        });
        socketio.on("disconnect_socket", (disconnect) => {
            console.log(disconnect, "disconnect");
        });
        socketio.on("firstMessage", (firstMessage) => {
            setMessageStatus(firstMessage);
        });
    }, []);

    // console.log(chats, "original chat ");

    useEffect(() => {
        setChats(singleChat);
    }, [singleChat]);

    // console.log(singleChat, "single chattttt")

    useEffect(() => {
        setChats(initialChat);
        console.log(initialChat, "initial chat")
    }, [initialChat]);


    function sendChatToSocket(chat) {
        if (typeof chat === "object") {
            socketio.emit("chat", [
                {
                    messageType: typeOfMessage,
                    message: chat,
                    fileName: chat.name,
                    mobileNumber:
                        contactDetailData?.customerId?.mobileNumber ||
                        initialChat[0].fullContactNumber,
                    chatId: contactDetailData?._id || initialChat[0].chatId,
                },
            ]);
        } else {
            socketio.emit("chat", [
                {
                    messageType: typeOfMessage,
                    message: chat,
                    mobileNumber:
                        contactDetailData?.customerId?.mobileNumber ||
                        initialChat[0].fullContactNumber,
                    chatId: contactDetailData?._id || initialChat[0].chatId,
                },
            ]);
        }
    }

    function SenderChat({ chat, messageTime, chatType }) {
        return (
            <ChatBoxSender
                message={chat}
                messageTime={messageTime}
                messageType={chatType}
            />
        );
    }

    function RecieverChat({ chat, messageTime, chatType }) {
        return (
            <ChatBoxReciver
                message={chat}
                messageTime={messageTime}
                messageType={chatType}
            />
        );
    }

    return (
        <div>
            <div className="h-[62vh] overflow-y-auto" ref={ref}>
                {selectedMobileNumber === "undefined"
                    ? initialChat?.length > 0 &&
                    initialChat?.map((chat, index) =>
                        chat.messageFrom === "agent" ? (
                            <SenderChat
                                chat={chat.message}
                                messageTime={chat.createdAt}
                                chatType={chat.type}
                                key={index.toString()}
                            />
                        ) : (
                            <RecieverChat
                                chat={chat.message}
                                messageTime={chat.createdAt}
                                chatType={chat.type}
                                key={index.toString()}
                            />
                        )
                    )
                    : chatsData.chats?.length > 0 &&
                    chatsData.chats?.map((chat, index) =>
                        chat.messageFrom === "agent" ? (
                            <SenderChat
                                chat={chat.message}
                                messageTime={chat.createdAt}
                                chatType={chat.type}
                                key={index.toString()}
                            />
                        ) : (
                            <RecieverChat
                                chat={chat.message}
                                messageTime={chat.createdAt}
                                chatType={chat.type}
                                key={index.toString()}
                            />
                        )
                    )}
                {/* {initialChat?.length > 0 && initialChat?.map((chat, index) => chat.messageFrom === "agent" ? <SenderChat chat={chat.message} messageTime={chat.createdAt} chatType={chat.type} key={index.toString()} /> : <RecieverChat chat={chat.message} messageTime={chat.createdAt} chatType={chat.type} key={index.toString()} />)}
                {chats?.length > 0 && chats?.map((chat, index) => chat.messageFrom === "agent" ? <SenderChat chat={chat.message} messageTime={chat.createdAt} chatType={chat.type} key={index.toString()} /> : <RecieverChat chat={chat.message} messageTime={chat.createdAt} chatType={chat.type} key={index.toString()} />)} */}
            </div>

            {/* <InputChatField placeholder="send message..." openFileUpload={openFileUpload} setOpenFileUpload={setOpenFileUpload} setOpenEmoji={setOpenEmoji} sendChatToSocket={sendChatToSocket} onKeyPress={sendChatToSocket} /> */}
            <InputChatField
                placeholder="send message..."
                sendChatToSocket={sendChatToSocket}
                onKeyPress={sendChatToSocket}
                setImage={setImage}
                setTypeOfMessage={setTypeOfMessage}
                messageStatus={messageStatus}
                initialChat={initialChat}
            />
        </div>
    );
};
