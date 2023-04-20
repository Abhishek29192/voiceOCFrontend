import React, {useEffect, useRef, useState} from "react";
import socketIOClient from "socket.io-client";
import {useChatScroll} from "../../hooks/UseChatScroll";
import {useAppCommonDataProvider} from "../AppCommonDataProvider/AppCommonDataProvider";
import {ChatBoxReciver, ChatBoxSender} from "./ChatBox";
import {InputChatField} from "./InputChatField";

export const ChatContainer = ({
  selectedMobileNumber,
  isChatPromiseFullfilled,
}) => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const {createTeamInboxDetails, allChat, setAllChat} =
    useAppCommonDataProvider();
  const {contactDetailData} = createTeamInboxDetails;
  const {chatDataAll} = allChat;
  const [chats, setChats] = useState([]);
  // const [contactNumbers, setContactNumbers] = useState([]);
  const [image, setImage] = useState("");
  const [typeOfMessage, setTypeOfMessage] = useState("text");
  const [messageStatus, setMessageStatus] = useState(false);

  let socketio = socketIOClient("http://3.6.197.151:3057");
  const ref = useChatScroll(chats);

  // console.log(chatDataAll, "outside")

  useEffect(() => {
    if (isChatPromiseFullfilled === true) {
      socketio.on("chat_client", (senderChats) => {
        const data = [...chatDataAll];
        chatDataAll?.forEach((chat, index) => {
          if (chat.mobileNumber === senderChats?.fullContactNumber) {
            let chats = [...chat.chat];
            chats.push({
              ...senderChats,
            });

            const uc = [];
            const unique = chats.filter((e) => {
              const isduplicate = uc.includes(e._id);
              if (!isduplicate) {
                uc.push(e._id);
                return true;
              }
              return false;
            });
            data[index].chat = unique;
            setAllChat({chatDataAll: data});
          } else {
            const currentChat = chatDataAll.find(
              (e) => e.mobileNumber === selectedMobileNumber
            );
            let chats = [...currentChat.chat];
            const uc = [];
            const unique = chats.filter((e) => {
              const isduplicate = uc.includes(e._id);
              if (!isduplicate) {
                uc.push(e._id);
                return true;
              }
              return false;
            });
            data[index].chat = unique;
            setAllChat({chatDataAll: data});
          }
        });
        // }
      });
      socketio.on("disconnect_socket", (disconnect) => {
        console.log(disconnect, "disconnect");
      });
      socketio.on("firstMessage", (firstMessage) => {
        setMessageStatus(firstMessage);
        // console.log(firstMessage, "ststus     ---")
      });
    }
  }, [isChatPromiseFullfilled, chatDataAll]);

  useEffect(() => {
    setChats(contactDetailData.chat);
  }, [contactDetailData.chat]);

  useEffect(() => {
    setChats(chatDataAll[0]?.chat);
  }, [chatDataAll[0]?.chat]);

  function sendChatToSocket(chat) {
    if (typeof chat === "object") {
      socketio.emit("chat", [
        {
          messageType: typeOfMessage,
          message: chat,
          fileName: chat.name,
          mobileNumber:
            contactDetailData?.mobileNumber ||
            chatDataAll[0]?.chat[0]?.fullContactNumber,
          chatId:
            contactDetailData?.chatDetail?._id ||
            chatDataAll[0]?.chatDetail?._id,
        },
      ]);
    } else {
      socketio.emit("chat", [
        {
          messageType: typeOfMessage,
          message: chat,
          mobileNumber:
            contactDetailData?.mobileNumber ||
            chatDataAll[0]?.chat[0]?.fullContactNumber,
          chatId:
            contactDetailData?.chatDetail?._id ||
            chatDataAll[0]?.chatDetail?._id,
        },
      ]);
    }
  }

  function SenderChat({chat, messageTime, chatType}) {
    return (
      <ChatBoxSender
        message={chat}
        messageTime={messageTime}
        messageType={chatType}
      />
    );
  }

  function RecieverChat({chat, messageTime, chatType}) {
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
        {selectedMobileNumber == "undefined" ||
        selectedMobileNumber == undefined
          ? chatDataAll[0]?.chat.length &&
            chatDataAll[0]?.chat.map((chat, index) =>
              chat.messageFrom === "agent" ? (
                <SenderChat
                  chat={chat.message}
                  messageTime={chat.createdAt}
                  chatType={chat.type}
                  key={index}
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
          : chatDataAll?.map((e, index) => {
              if (e.mobileNumber == selectedMobileNumber) {
                return e?.chat?.map((ele, index) =>
                  ele?.messageFrom === "agent" ? (
                    <SenderChat
                      chat={ele?.message}
                      messageTime={ele?.createdAt}
                      chatType={ele?.type}
                      key={index.toString()}
                    />
                  ) : (
                    <RecieverChat
                      chat={ele?.message}
                      messageTime={ele?.createdAt}
                      chatType={ele?.type}
                      key={index.toString()}
                    />
                  )
                );
              }
            })}
      </div>

      <InputChatField
        placeholder="send message..."
        sendChatToSocket={sendChatToSocket}
        onKeyPress={sendChatToSocket}
        setImage={setImage}
        setTypeOfMessage={setTypeOfMessage}
        messageStatus={messageStatus}
      />
    </div>
  );
};
