import React, { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { useChatScroll } from "../../hooks/UseChatScroll";
import { useAppCommonDataProvider } from "../AppCommonDataProvider/AppCommonDataProvider";
import { ChatBoxReciver, ChatBoxSender } from "./ChatBox";
import { InputChatField } from "./InputChatField";
import { useAllChatData } from "../../hooks/useQueryApi";
import { NewTemplate } from "../../Routes/TeamInbox/NewTemplate";

export const ChatContainer = ({
  selectedMobileNumber,
  isChatPromiseFullfilled,
  customVariable,
}) => {

  const { mutateAsync: alldata } = useAllChatData();

  const { createTeamInboxDetails, allChat, setAllChat, userDetails: userData, setCreateTeamInboxDetails, } =
    useAppCommonDataProvider();

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const role =
    userData?.role ?? JSON.parse(localStorage.getItem("userDetails")).role;
  const currentUserId =
    userData?._id ?? JSON.parse(localStorage.getItem("userDetails"))._id;

  const { contactDetailData } = createTeamInboxDetails;
  const { chatDataAll } = allChat;
  const [chats, setChats] = useState([]);
  const [image, setImage] = useState("");
  const [typeOfMessage, setTypeOfMessage] = useState("text");
  const [messageStatus, setMessageStatus] = useState(true);
  const [newIncomingMessage, setNewIncomingMessage] = useState()
  const [newMessageTemplate, setNewMessageTemplate] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [value, setValue] = useState("");
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [selectedSuggestionText, setSelectedSuggestionText] = useState("")

  let socketio = socketIOClient("http://3.6.197.151:3057");
  const ref = useChatScroll(chats);


  const handleClick = (e) => {
    setSuggestions([]);
    setValue(e.target.innerText);
    setSelectedSuggestionText(e.target.innerText)
    setSuggestionsActive(false);
  };


  useEffect(() => {

    function handleChatClient(senderChats) {
      const data = [...chatDataAll];
      chatDataAll?.forEach((chat, index) => {
        if (chat.mobileNumber === senderChats?.fullContactNumber) {
          const chats = [...chat.chat];
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
          data[index].chatDetail.lastMessageTime = Date.now();
          setAllChat({ chatDataAll: data });
        }
      });
    }

    if (isChatPromiseFullfilled === true) {
      socketio.on('chat_client', handleChatClient);
    }

    return () => {
      socketio.off('chat_client', handleChatClient);
    };
  }, [isChatPromiseFullfilled]);



  useEffect(() => {
    function handleFirstMessageStatus(status) {
      const data = [...chatDataAll];

      data?.forEach((ele, index) => {
        if (ele?.mobileNumber === status.mobileNumber) {
          const details = ele.chatDetail
          details.status = status.status

          data[index].chatDetail = details

          if (contactDetailData?.mobileNumber === selectedMobileNumber) {
            setCreateTeamInboxDetails({
              ...createTeamInboxDetails,
              contactDetailData: data[index],
            });
          }

          setAllChat({ chatDataAll: data });
        }
      })
    }

    socketio.on('firstMessage', handleFirstMessageStatus);

    return () => {
      socketio.off('firstMessage', handleFirstMessageStatus);
    }
  }, [isChatPromiseFullfilled])



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
      <div className="h-[62vh] overflow-y-auto realative" ref={ref}>

        <div className={`${suggestions.length > 0 ? "border bottom-[6.8rem] absolute w-[95%] bg-white rounded-xl px-4 py-3 z-50 cursor-pointer shadow-md" : ""}`}>
          {suggestions.map((suggestion, index) => {
            return (
              <div>
                <div
                  className={`${index === suggestionIndex ? "active" : ""}  border-b-[1px] py-2`}
                  key={index}
                  onClick={handleClick}
                >
                  {suggestion}
                </div>

              </div>
            );
          })}
        </div>

        {
          newMessageTemplate && (
            <NewTemplate setNewMessageTemplate={setNewMessageTemplate} selectedMobileNumber={selectedMobileNumber} />
          )
        }
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
        customVariable={customVariable}
        setNewMessageTemplate={setNewMessageTemplate}
        newMessageTemplate={newMessageTemplate}
        setSuggestions={setSuggestions}
        suggestions={suggestions}
        setSuggestionIndex={setSuggestionIndex}
        suggestionIndex={suggestionIndex}
        value={value}
        setValue={setValue}
        setSuggestionsActive={setSuggestionsActive}
        suggestionsActive={suggestionsActive}
        setSelectedSuggestionText={setSelectedSuggestionText}
        selectedSuggestionText={selectedSuggestionText}
      />
    </div>
  );
};
