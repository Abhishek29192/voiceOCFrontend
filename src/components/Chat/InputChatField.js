import React, { useEffect, useState } from "react";
import { PrimaryButton } from "../Button";
import { InputFieldWithoutCounter } from "../InputField";
import { GrAttachment } from "react-icons/gr";
import { BsEmojiSmile } from "react-icons/bs";
import Picker from "emoji-picker-react";
import { IoImageOutline } from "react-icons/io5";
import { BsFileEarmarkPlus } from "react-icons/bs";
import { TbVideo } from "react-icons/tb";
import { Base2, Heading3Strong } from "../Typography";
import { useFetchNewMessageTemplate, useUploadVideo } from "../../hooks/useQueryApi";
import { useAppCommonDataProvider } from "../AppCommonDataProvider/AppCommonDataProvider";
import { autoCompleteData } from "../../constants/DropDownContent";

export const InputChatField = ({
  // customVariable,
  placeholder,
  sendChatToSocket,
  setImage,
  setTypeOfMessage,
  messageStatus,
  setNewMessageTemplate,
  newMessageTemplate,
  selectedMobileNumber,
  setSuggestions,
  suggestions,
  suggestionIndex,
  setSuggestionIndex,
  setValue,
  setSuggestionsActive,
  selectedSuggestionText
}) => {

  const [message, setMessage] = useState("");
  const [openEmoji, setOpenEmoji] = useState(false);
  const [openFileUpload, setOpenFileUpload] = useState(false);
  const [autoSuggestions, setAutoSuggestions] = useState(false);


  const { createTeamInboxDetails, allChat } = useAppCommonDataProvider();
  const { contactDetailData } = createTeamInboxDetails;
  const { chatDataAll } = allChat;
  const { mutateAsync } = useUploadVideo();



  useEffect(() => {
    setMessage(selectedSuggestionText)
  }, [selectedSuggestionText])


  const onEmojiClick = (event, emojiObject) => {
    setMessage((prevInput) => prevInput + event.emoji);
    setOpenEmoji(false);
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13 && message.trim()) {
      sendChatToSocket(message.trim());
      setMessage("");
    }
  };

  const handleImage = (e) => {
    console.log(e, "image");
    setImage(e.target.files[0]);
    setMessage(e.target.files[0]);
    setOpenFileUpload(false);
    setTypeOfMessage(e.target.files[0].type);
    setOpenFileUpload(false);
  };

  const handleFile = (e) => {
    setMessage(e.target.files[0]);
    setOpenFileUpload(false);
    setTypeOfMessage(e.target.files[0].type);
    setOpenFileUpload(false);
  };

  const handleVideo = (e) => {
    const data = new FormData();
    data.append("video", e.target.files[0]);
    data.set(
      "mobileNumber",
      contactDetailData?.mobileNumber ||
      chatDataAll[0]?.mobileNumber
    );
    data.set(
      "chatId",
      contactDetailData?.chatDetail?._id || chatDataAll[0]?.chatDetail?._id
    );
    setOpenFileUpload(false);
    mutateAsync(data)
      .then((e) => console.log(e))
      .catch((err) => console.log(err));
  };


  const handleChange = (e) => {
    setMessage(e.target.value);
    setAutoSuggestions(true)
    const query = e.target.value.toLowerCase();
    setValue(query);
    if (query.length > 1) {
      const filterSuggestions = autoCompleteData.filter(
        (suggestion) => {
          return suggestion.toLowerCase().indexOf(query) > -1
        }
      );
      setSuggestions(filterSuggestions);
      setSuggestionsActive(true);
    } else {
      setSuggestionsActive(false);
    }
  };



  const handleKeyDown = (e) => {
    // UP ARROW
    if (e.keyCode === 38) {
      if (suggestionIndex === 0) {
        return;
      }
      setSuggestionIndex(suggestionIndex - 1);
    }
    // DOWN ARROW
    else if (e.keyCode === 40) {
      if (suggestionIndex - 1 === suggestions.length) {
        return;
      }
      setSuggestionIndex(suggestionIndex + 1);
    }
    // ENTER
    else if (e.keyCode === 13) {
      console.log("Enter---------")
      sendChatToSocket(message.trim());
      setMessage("");
      setValue(suggestions[suggestionIndex]);
      setSuggestionIndex(0);
      setSuggestionsActive(false);
    }
  };





  return (
    <form onKeyDown={(e) => handleKeyDown(e)} className="relative">
      <div className="flex absolute bottom-0 right-0">
        {openEmoji && (
          <div className="flex">
            <Picker
              size={1}
              width="322"
              height={500}
              emojiStyle="google"
              onEmojiClick={onEmojiClick}
            />
          </div>
        )}
      </div>

      {openFileUpload && (
        <div className=" flex flex-col absolute bottom-[85px] right-24 h-[250px] w-[100px] border bg-white rounded-xl  items-center justify-center">
          <div className="border h-fit w-fit p-2 bg-slate-200 rounded-md">
            {/* <input type="file" id="image-upload" hidden onChange={(e) => setImage(e.target.files[0])} /> */}
            <input
              type="file"
              id="image-upload"
              hidden
              accept=".jpg,.jpeg,.png"
              onChange={(e) => handleImage(e)}
            />
            <label for="image-upload" className="p-0 border-none">
              <IoImageOutline size={"1.8rem"} color={"black"} />
            </label>
          </div>
          <div className="border h-fit w-fit p-2 my-7 bg-slate-200 rounded-md">
            <input
              type="file"
              id="file-upload"
              hidden
              accept=".pdf"
              onChange={(e) => handleFile(e)}
            />
            <label for="file-upload" className="p-0 border-none">
              <BsFileEarmarkPlus size={"1.8rem"} color={"black"} />
            </label>
          </div>
          <div className="border h-fit w-fit p-2 bg-slate-200 rounded-md">
            <input
              type="file"
              id="video-upload"
              hidden
              accept="video/*"
              onChange={(e) => handleVideo(e)}
            />
            <label for="video-upload" className="p-0 border-none">
              <TbVideo size={"1.8rem"} color={"black"} />
            </label>
          </div>
        </div>
      )}


      {(contactDetailData.length == 0 ? chatDataAll[0]?.chatDetail.status : contactDetailData.chatDetail.status) === "active" ? (
        <div>
          {/* {suggestionsActive && <Suggestions />} */}
          <div className="w-full border bg-white p-4  flex items-center rounded relative bottom-[-5px] -z-1  justify-between">
            <div className=" w-fit relative">
              <InputFieldWithoutCounter
                placeholder={placeholder}
                // onChange={(e) => { setMessage(e.target.value); setAutoSuggestions(true) }}
                onChange={(e) => { handleChange(e) }}
                // onKeyDown={(e) => handleKeyDown(e)}
                value={typeof message !== "string" ? message.name : message}
                className="bg-slate-200 w-[38vw] h-[45px]"
              />
              <div
                className="absolute top-3 right-11"
                onClick={() => {
                  setOpenEmoji(!openEmoji);
                  setOpenFileUpload(false);
                }}
              >
                <BsEmojiSmile size={"1.3rem"} />
              </div>
              <div
                className="absolute top-3 right-3"
                onClick={() => {
                  setOpenFileUpload(!openFileUpload);
                  setOpenEmoji(false);
                }}
              >
                <GrAttachment size={"1.3rem"} />
              </div>
            </div>
            {/* <AutoComplete props={props} /> */}
            <div>
              <PrimaryButton
                text={"Send"}
                type={"submit"}
                className="px-7"
                disabled={!message}
                onClick={() => {
                  sendChatToSocket(message);
                  setMessage("");
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white mt-2 rounded-md h-[75px] w-full flex items-center justify-between">
          <div>
            <Base2 className="justify-center px-4 text-2xl">
              Chat is been Expired
            </Base2>
            <Base2 className="justify-center px-4">
              You cannot send message in a closed conversation
            </Base2>
          </div>
          <div className="mx-3">
            <PrimaryButton
              text={"New Message"}
              type={"button"}
              onClick={() => setNewMessageTemplate(!newMessageTemplate)}
            />
          </div>
        </div>
      )
      }
    </form >
  );
};
