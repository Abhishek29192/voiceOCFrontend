import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import {
  useAgentLists,
  useAllChatData,
  useContactListOptions,
  useNewMessageStatus,
  usePostAssignAgentData,
  usePostRemoveAssignAgent,
  usePostTeamInboxData,
  useSingleChatData,
  useTeamInboxContactList,
  useTeamInboxDetails,
  useTemplateData,
} from "../../hooks/useQueryApi";
import { PrimaryButton, SecondaryButton } from "../../components/Button";
import { AiOutlineSearch } from "react-icons/ai";
import { NewMessage } from "./NewMessage";
import { FaWhatsapp } from "react-icons/fa";
import { TiMessages, TiTick } from "react-icons/ti";
import { GoPrimitiveDot } from "react-icons/go";
import { FaPen } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";
import { Base2 } from "../../components/Typography";
import { FileUploadbutton, InputFieldWithoutCounter } from "../../components/InputField";
import { useAppCommonDataProvider } from "../../components/AppCommonDataProvider/AppCommonDataProvider";
import { ChatContainer } from "../../components/Chat/ChatContainer";
import styles from "./TeamInbox.module.css";
import moment from "moment/moment";
import { TimerCounter } from "../../components/Timer";
import { RxCross2 } from "react-icons/rx";
import { Drawer, Drawers } from "../../components/Drawer/Drawer";
import { Profile } from "./Profile";
import { BsStopwatchFill } from "react-icons/bs";
import { useClickOutside } from "../../hooks/useClickOutSide";
import { sortSearchByNameByNumber } from "../../constants/DropDownContent";
import { SelectOptionButton } from "../../components/SelectOptions";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const TeamInbox = () => {
  const [search, setSearch] = useState(false);
  const [newMessage, setNewMessage] = useState(false);
  const [showContactList, setShowContactList] = useState(false);
  const [templateData, setTemplateDate] = useState();
  const [templateSortData, setTemplateSortData] = useState();
  const [tellMeButton, setTellMeButton] = useState(false);
  const [tellMeButtonID, setTellMeButtonID] = useState();
  const [name, setName] = useState("");
  const [selectedMobileNumber, setSelectedMobileNumber] = useState();
  const [selctedTemplate, setSelectedTemplate] = useState();
  const [contactDetails, setContactDetails] = useState([]);
  const [singleChat, setSingleChat] = useState();
  const [contactName, setContactName] = useState([]);
  const [customVariable, setCustomVaraible] = useState([]);
  const [agentLists, setAgentLists] = useState([]);
  const [openSelectAgents, setOpenSelectAgents] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [allChatData, setAllChatData] = useState([]);
  const [allChatDataSort, setAllChatDataSort] = useState([]);
  const [isChatPromiseFullfilled, setIsChatPromiseFullfilled] =
    useState(undefined);
  const [selectedOptionNumber, setSelectedOptionNumber] = useState("");
  const [selectedContactIndex, setSelectedContactIndex] = useState("");
  const [previouseSelectedNumber, setPreviouseSelectedNumber] =
    useState(undefined);
  const [searchText, setSearchText] = useState("");
  const [searchTextBy, setSearchTextBy] = useState("")
  const [searchBy, setSearchBy] = useState("")
  const [mediaFile, setMediaFile] = useState(null)
  // const [agentDetail, setAgentDetail] = useState(null)
  // const [assignAgent, setAssignAgent] = useState(false)
  const [fileName, setFileName] = useState("");
  const ref = useClickOutside(() => setOpenSelectAgents(false));

  const {
    createTeamInboxDetails,
    setCreateTeamInboxDetails,
    setAllChat,
    userDetails: userData,
    allChat
  } = useAppCommonDataProvider();

  const { chatDataAll } = allChat;
  const userDetails =
    userData ?? JSON.parse(localStorage.getItem("userDetails"));

  const role =
    userData?.role ?? JSON.parse(localStorage.getItem("userDetails")).role;
  const currentUserId =
    userData?._id ?? JSON.parse(localStorage.getItem("userDetails"))._id;
  // const { setAllChat } = useAppCommonDataProvider()

  const { refetch } = useTemplateData();
  const { mutateAsync } = usePostTeamInboxData();
  const { mutateAsync: contatcData } = useTeamInboxContactList(userDetails);
  const { mutateAsync: selectedAgentData } = usePostAssignAgentData();
  const { mutateAsync: removeAgent } = usePostRemoveAssignAgent();
  const { refetch: contactNumber } = useContactListOptions();
  const { refetch: agentList } = useAgentLists();
  const { contactDetailData, whatsappNumber } = createTeamInboxDetails;
  const { mutateAsync: alldata } = useAllChatData();
  const { mutateAsync: newMessageStatus } = useNewMessageStatus();

  const getNewMessageStatus = async (ele) => {
    selectedMobileNumber === undefined
      ? await newMessageStatus({
        fullContactNumber: allChatData[0]?.mobileNumber,
        previousContactNumber: previouseSelectedNumber,
        chatId: allChatData[0]?.chatDetail?._id,
      }).catch((err) => console.log(err, "error"))
      : await newMessageStatus({
        fullContactNumber: ele?.mobileNumber,
        previousContactNumber: previouseSelectedNumber,
        chatId: ele?.chatDetail?._id,
      }).catch((err) => console.log(err, "error"));
  };

  const getAllData = async () => {
    setIsChatPromiseFullfilled(false);
    return await alldata({ agentId: currentUserId, role: role })
      .then((res) => {
        setAllChatData(res?.data?.contactList);
        setAllChatDataSort(res?.data?.contactList)
        setAllChat({ chatDataAll: res?.data?.contactList });
        setSelectedMobileNumber(res?.data?.contactList[0]?.mobileNumber);

        newMessageStatus({
          fullContactNumber: res?.data?.contactList[0]?.mobileNumber,
          previousContactNumber: previouseSelectedNumber,
          chatId: res?.data?.contactList[0]?.chatDetail?._id,
        });
        setIsChatPromiseFullfilled(true);
        return res.data.contactList;
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    contatcData()
      .then((res) => setContactDetails(res?.data?.contactList))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    agentList()
      .then((res) => setAgentLists(res?.data?.data?.agentList, "rsponse"))
      .catch((err) => console.log(err));

    getAllData();

    refetch()
      .then((res) => {
        setTemplateDate(res?.data.data);
        setTemplateSortData(res?.data.data);
      })
      .catch((error) => console.log(error));

    contactNumber()
      .then((res) =>
        setContactName(res?.data?.data?.contactarray, "contact Numbers")
      )
      .catch((err) => console.log(err));
  }, []);


  const colourStyles1 = {
    control: (styles) => {
      return {
        ...styles,
        backgroundColor: "white",
        width: "9rem",
        height: "2.7rem",
        boxShadow: "none",
        fontSize: "12px",
        fontFamily: "poppins",
      };
    },
    option: (styles, { data, isDisabled }) => {
      return {
        ...styles,
        backgroundColor: isDisabled ? "red" : "white",
        color: "#000",
        width: "9rem",
        fontSize: "12px",
        fontFamily: "poppins",
        cursor: isDisabled ? "not-allowed" : "pointer",
      };
    },
  };

  const contactNameNumber = [];

  contactName?.map((e) => {
    const optionContactNumber = {
      label: `(${e.mobileNumber})`,
      value: `(${e.mobileNumber})`,
    };
    contactNameNumber.push(optionContactNumber);
  });

  const handleCustomVariable = (e) => {
    const { name, value } = e.target;
    if (customVariable.length === 0) {
      setCustomVaraible([
        ...customVariable,
        {
          [name]: value,
        },
      ]);
    } else {
      const data = [...customVariable];
      const doesExist = data.find((e) => Object.keys(e).includes(name));
      const index = data.findIndex((e) => Object.keys(e).includes(name));

      if (doesExist === undefined) {
        data.push({
          [name]: value,
        });
      } else {
        data[index][name] = value;
      }
      setCustomVaraible(data);
    }
  };

  const sendDataInApi = (data) => {
    mutateAsync(data)
      .then((res) => {
        if (res?.data?.status) {
          setSelectedContactIndex(0);
          setCreateTeamInboxDetails({
            ...createTeamInboxDetails,
            contactDetailData: res?.data?.newChat[0],
          });
          setPreviouseSelectedNumber(selectedMobileNumber);
          setSelectedMobileNumber(res?.data?.newChat[0].mobileNumber);
          getAllData();
        } else {
          console.log(res?.data?.status);
        }
      })
      .catch((e) => console.log(e));

    setNewMessage(false);
    setSearch(false);
    setShowContactList(false);
    setMediaFile(null)
    setFileName("")
  }

  const handleSend = (e) => {
    let data
    console.log(e, "llllllllllllllllllllll")
    // if (e.customFields.length == customVariable.length) {
    if (e.Type === "MEDIA") {
      if (fileName.trim().length > 0) {
        data = new FormData();
        data.set("mobileNumber", whatsappNumber)
        data.set("status", "true")
        data.set("customValues", customVariable)
        data.set("customField", JSON.stringify({
          templatedSelected: selctedTemplate,
          name: name,
        }))
        data.append("media", mediaFile)
        sendDataInApi(data)
      } else {
        toast.error(`Upload file!!!`, {
          autoClose: 1500,
          closeOnClick: true,
          position: "top-right",
        });
      }
    } else {
      data = {
        mobileNumber: whatsappNumber,
        userId: null,
        status: "true",
        customField: JSON.stringify({
          templatedSelected: selctedTemplate,
          name: name,
        }),
        customValues: customVariable,
      };
      sendDataInApi(data)
    }
    // }
    // else {
    //   toast.error(`please fill all customfield before send !!!`, {
    //     autoClose: 1500,
    //     closeOnClick: true,
    //     position: "top-right",
    //   });
    // }
  };


  const handleSingleChatData = (ele, index) => {
    setSelectedContactIndex(index);
    setCreateTeamInboxDetails({
      ...createTeamInboxDetails,
      contactDetailData: ele,
    });

    setPreviouseSelectedNumber(selectedMobileNumber);
    setSelectedMobileNumber(ele?.mobileNumber);
    getNewMessageStatus(ele);
  };

  const handleAgent = () => {
    setOpenSelectAgents(!openSelectAgents);
  };

  const handleSearchInput = (e) => {
    setSearchText(e);
    if (e.length != 0) {
      let a = templateData.filter((t) =>
        t.template_name.toLowerCase().includes(e.toLowerCase())
      );
      setTemplateDate(a);
    } else {
      setTemplateDate(templateSortData);
    }
  };


  const handleSearchInputSortBy = (e) => {
    // setSearchTextBy(e)
    if (e.length != 0) {
      if (searchBy === "Number") {
        let a = allChatDataSort.filter((t) =>
          t.mobileNumber.includes(e)
        );
        setAllChatDataSort(a)
      }
      else {
        let b = allChatDataSort.filter((t) => {
          if (t.name) {
            return t.name.toLowerCase().includes(e.toLowerCase())
          }
        });
        setAllChatDataSort(b)
      }
    } else {
      setAllChatDataSort(allChatData)
    }
  }


  const handleAssignAgent = (e, ele) => {
    // setAgentDetail(ele)
    // setAssignAgent(true)
    const agentSelectedDetails = {
      chatId:
        contactDetailData.length !== 0
          ? contactDetailData?.chatDetail?._id
          : allChatData[0]?.chatDetail?._id,
      agentId: ele?._id,
      fullName: `${ele.firstName} ${ele.lastName}`,
    };

    selectedAgentData(agentSelectedDetails).then((res) => {
      const data = [...chatDataAll];
      data?.forEach((ele, index) => {
        if (ele?.chatDetail?._id === res?.data?.result?._id) {
          const details = res?.data?.result

          data[index].chatDetail = details
          // console.log(contactDetailData, "messageieieiigiegieigei")
          if (contactDetailData?.mobileNumber === selectedMobileNumber) {
            setCreateTeamInboxDetails({
              ...createTeamInboxDetails,
              contactDetailData: data[index],
            });
          }

          setAllChat({ chatDataAll: data });
        }
      })
    }).catch((err) => console.log(err));
    setOpenSelectAgents(false);
  };

  const handleRemoveAgent = () => {
    const removeAgentId = { chatId: contactDetailData?.chatDetail?._id };

    removeAgent(removeAgentId).then((res) => {
      const data = [...chatDataAll];

      data?.forEach((ele, index) => {
        if (ele?.chatDetail?._id === contactDetailData?.chatDetail?._id) {
          const details = ele?.chatDetail
          details.assignedAgentId = ""

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
    }).catch((err) => console.log(err));
    setOpenSelectAgents(false);
  };

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

  const handleFileChange = (e) => {

    setMediaFile(e.target.files[0])
    setFileName(e.target.files[0].name);
  }


  const time = new Date();
  time.setSeconds(time.getSeconds() + 600);

  return (
    <div>
      <div>
        <Navbar openProfile={openProfile} setOpenProfile={setOpenProfile} activeTab={localStorage.getItem("activeTab")} />
      </div>
      <div className="flex">
        <div
          className={`w-[25%] border justify-center h-[90vh]  ${styles.slideUpwardFirst}`}
        >
          <div className="flex w-[85%] h-[12vh] justify-center items-center pt-2">
            <PrimaryButton
              text={`New Message`}
              className="px-6 mx-6"
              onClick={() => {
                setNewMessage(!newMessage);
                setSearch(false);
                setShowContactList(false);
              }}
            />
            <div
              className="bg-slate-200 p-2 rounded-md"
              onClick={() => {
                setSearch(!search);
                setNewMessage(false);
                setShowContactList(false);
              }}
            >
              <AiOutlineSearch size={"1.5rem"} />
            </div>
          </div>

          {newMessage && !showContactList && (
            <div className="px-2">
              <NewMessage
                setNewMessage={setNewMessage}
                setShowContactList={setShowContactList}
                contactNameNumber={contactNameNumber}
                selectedOptionNumber={selectedOptionNumber}
                setSelectedOptionNumber={setSelectedOptionNumber}
              />
            </div>
          )}
          {!newMessage && !showContactList && (
            <>
              {
                search && (
                  <div className="flex px-6 justify-center items-center py-1">
                    <div>
                      <SelectOptionButton
                        options={sortSearchByNameByNumber}
                        className={colourStyles1}

                        onChange={(e) => setSearchBy(e.value)}
                      />
                    </div>
                    <div>
                      <InputFieldWithoutCounter
                        placeholder={"Search by Number"}
                        className="ml-5 h-11 w-[80%] bg-slate-200"
                        onChange={(e) => handleSearchInputSortBy(e.target.value)}
                      />
                    </div>

                  </div>
                )
              }
              <div className="border-t-[1px] h-[72vh] overflow-y-auto">
                {allChatDataSort &&
                  allChatDataSort
                    ?.sort(
                      (obj1, obj2) =>
                        new Date(
                          obj2.chat[obj2.chat.length - 1].createdAt
                        ).getTime() -
                        new Date(
                          obj1.chat[obj1.chat.length - 1].createdAt
                        ).getTime()
                    )
                    ?.map((ele, index) => {
                      return (
                        <div
                          className="border-b-[1px] w-full"
                          onClick={() => handleSingleChatData(ele, index)}
                        >
                          <div
                            className={`flex p-2 rounded-md items-center ${ele.mobileNumber == selectedMobileNumber
                              ? "bg-[#5536db] text-white"
                              : "bg-white"
                              }`}
                          >
                            <div
                              className={`flex h-11 px-4 py-[0.70rem] ml-3 text-black bg-slate-200 rounded-3xl items-center justify-center`}
                            >
                              <div className="font-extrabold">
                                {ele?.name?.split("")[0]?.toUpperCase() ||
                                  ele?.mobileNumber.split("")[0]}
                              </div>
                            </div>
                            <div className="px-7 w-[80%]">
                              <div className="flex justify-between">
                                <div className="font-bold">
                                  {ele?.name || ele?.mobileNumber}
                                </div>
                              </div>
                              <div className="flex justify-between items-center">
                                <div className="text-slate-300 text-sm">
                                  {moment(
                                    ele?.chat[ele?.chat?.length - 1]?.createdAt
                                  ).format("DD/MM/YYYY  HH:mm")}
                                </div>
                                <div>
                                  {ele?.chatDetail?.status == "active" ? (
                                    <div className="ml-2 px-4 py-2  bg-[#e9f6ee] text-[#5536db] font-bold rounded-full">
                                      open
                                    </div>
                                  ) : (
                                    <div className="ml-2 px-4 py-1  bg-red-200 text-red-500 font-bold rounded-full">
                                      close
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="py-2 text-slate-300 text-sm truncate overflow-clip w-full">
                                {typeof ele?.chat[ele?.chat?.length - 1]
                                  ?.message === "string"
                                  ? ele?.chat[ele?.chat?.length - 1]?.message
                                  : ele?.chat[ele?.chat?.length - 1]?.message
                                    ?.name}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
              </div>
            </>
          )}
          {!newMessage && showContactList && (
            <div className="bg-white p-2 flex w-full h-[80vh]">
              <div className="bg-slate-200 rounded-lg w-full ">
                <div className=" rounded p-3">
                  <div className="w-full py-2">
                    <div className=" flex items-center px-3 py-1 w-full">
                      <Base2 className="poppins text-base font-extrabold text-[#000000] items-center">
                        Choose template
                      </Base2>
                    </div>
                    <div className="p-2 w-full">
                      <InputFieldWithoutCounter
                        placeholder={"Search template"}
                        className="bg-white w-full"
                        onChange={(e) => handleSearchInput(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className=" p-2 w-full h-[57vh] overflow-y-scroll">
                    {templateData?.map((e, index) => {
                      return (
                        <div className="bg-white rounded-lg px-3 my-2 h-[screen] flex flex-col">
                          <div className="py-2">
                            <Base2 className="poppins text-sm font-extrabold text-[#000000] items-center">
                              {e.template_name}
                            </Base2>
                          </div>
                          <div className="poppins text-sm my-2">{e.Body}</div>
                          <div>
                            {
                              (e.Type === "MEDIA") ? (
                                <div className=" w-[100%] h-full pb-2">
                                  <FileUploadbutton
                                    id={index}
                                    accept={e.MediaType === "image" ? "image/*" : (e.MediaType === "document" ? ".pdf,.doc,.docx" : ".mp4")}
                                    className={"h-9"}
                                    onChange={(e) => {
                                      handleFileChange(e);
                                    }}
                                  // fileName={fileName ? fileName : "Select a file"}
                                  />
                                  <ToastContainer theme="light" />
                                  {/* <FileUploadbutton
                                    accept={"image/*,.doc, .docx,.mp4,.pdf"}
                                    className={"h-9"}
                                    onChange={(e) => {
                                      handleFileChange(e);
                                    }}
                                  // fileName={fileName ? fileName : "Select a file"}
                                  /> */}
                                </div>
                              ) : null
                            }
                          </div>
                          <div className="py-2">
                            <SecondaryButton
                              text={"tell me more"}
                              className="h-11 px-7 "
                              onClick={() => {
                                setTellMeButton(!tellMeButton);
                                setTellMeButtonID(index);
                                setSelectedTemplate(e.template_name);
                              }}
                            />
                          </div>

                          {tellMeButton && tellMeButtonID == index && (
                            <>
                              {e?.customFields?.map((e, index) => {
                                return (
                                  <div>
                                    <div className="poppins mx-1 mt-2 font-semibold">
                                      Custom Fields : {index + 1}
                                    </div>
                                    <div className="my-1 font-semibold">
                                      <InputFieldWithoutCounter
                                        placeholder={"Custom Fields"}
                                        name={`customField${index}`}
                                        className="w-full bg-slate-200"
                                        onChange={(e) =>
                                          handleCustomVariable(e)
                                        }
                                      />
                                    </div>
                                  </div>
                                );
                              })}

                              <div className="flex justify-end my-2">
                                <div>
                                  <SecondaryButton
                                    text={"Back"}
                                    onClick={() => {
                                      setTellMeButton(false);
                                    }}
                                  />
                                </div>
                                <div className="mx-2">
                                  <PrimaryButton
                                    text={"Send"}
                                    onClick={() => handleSend(e)}
                                  />
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div
          className={`w-[50%] border bg-slate-100 overflow-x-hidden h-[90vh] relative ${styles.slideUpwardMiddle}`}
        >
          <div className="h-[10vh] m-1 rounded border bg-white">
            <div
              className={`flex items-center h-full w-full  px-4 cursor-pointer  ${role === "admin" ? "justify-between" : "justify-end"
                }`
              }
            >
              {role === "admin" ? (
                <div>
                  <SlOptionsVertical size={"1.1rem"} onClick={handleAgent} />
                </div>
              ) : null}
              <div className="bg-[#eb3b3b] text-white p-2 rounded-full flex items-center">
                <BsStopwatchFill size={"1.4rem"} />
                <div className="pl-2">
                  <TimerCounter
                    selectedMobileNumber={selectedMobileNumber}
                    startTimer={
                      contactDetailData?.length !== 0
                        ? contactDetailData?.chatDetail?.lastMessageTime
                        : allChatData[0]?.chatDetail?.lastMessageTime
                    }
                  />
                </div>
              </div>
            </div>

            <ChatContainer
              singleChat={singleChat}
              selectedMobileNumber={selectedMobileNumber}
              allChatData={allChatData}
              contactDetailData={contactDetailData}
              isChatPromiseFullfilled={isChatPromiseFullfilled}
              customVariable={customVariable}
            />
          </div>

          {openSelectAgents && role === "admin" && (
            <div className="z-555 flex flex-col bg-white w-fit p-4 py-4 rounded-2xl h-auto relative" ref={ref}>
              {agentLists?.map((ele) => {
                return (
                  <div className=" flex mx-2 my-3 cursor-pointer border-b-2 pb-2 items-center justify-between">
                    {contactDetailData?.chatDetail?.assignedAgentId && contactDetailData?.chatDetail?.assignedAgentId == ele?._id && (
                      <div className="mx-2 bg-green-700 rounded-full animate-pulse">
                        <GoPrimitiveDot color="green" size={"0.9rem"} />
                      </div>
                    )
                    }
                    <div className="w-15">{ele.firstName + ele.lastName}</div>

                    <div className="flex items-center mx-3 max-w-xs">
                      <div
                        className="mx-2 bg-[#5536db] p-1 rounded-full"
                        onClick={(e) => handleAssignAgent(e, ele)}
                      >
                        <TiTick size={"1.4rem"} color={"white"} />
                      </div>
                      <div
                        className="mx-2 mr-4 bg-[#5536db] p-1 rounded-full"
                        onClick={(e, ele) => handleRemoveAgent(e, ele)}
                      >
                        <RxCross2 size={"1.4rem"} color={"white"} />
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className={`w-[25%] p-2 items-center ${styles.slideUpwardRight}`}>
          <div>
            <div className="flex py-5 px-1 border-b-[1px] items-center">
              <div className="flex h-11 px-4 py-[0.70rem] ml-2 bg-slate-200 rounded-3xl items-center justify-center">
                <div className="font-extrabold">
                  {contactDetailData?.name?.split("")[0]?.toUpperCase() ||
                    allChatData[0]?.name?.split("")[0]?.toUpperCase() ||
                    contactDetailData?.mobileNumber?.split("")[0]}
                </div>
              </div>
              <div className="flex px-2 w-full justify-between items-center">
                <div>
                  <div className="font-semibold">
                    {contactDetailData?.mobileNumber || selectedMobileNumber}
                  </div>
                  <div className="text-sm poppins">Available</div>
                </div>
                {/* <div className="flex ">
                  <div className="flex bg-slate-200 rounded-md p-2">
                    <FaWhatsapp />
                  </div>
                  <div className="flex bg-slate-200 rounded-md p-2 ml-2">
                    <TiMessages />
                  </div>
                </div> */}
              </div>
            </div>
            <div className="py-4 px-1 border-b-[1px] items-center">
              <div className="poppins font-bold">Basic information</div>
              <div className="flex py-2">
                <div className="poppins text-sm font-semibold">
                  Phone Number :
                </div>
                <div className="poppins text-sm">
                  {contactDetailData?.mobileNumber || selectedMobileNumber}
                </div>
              </div>
            </div>
            <div className="flex flex-col border-b-[1px]">
              <div className="flex justify-between py-4 px-1  items-center">
                <div className="poppins font-bold text-[0.95rem]">
                  Contact custom parameters
                </div>
                {/* <div className="relative w-fit">
                  <PrimaryButton className="h-[35px]" />
                  <FaPen color="white" className="absolute top-2 left-3" />
                </div> */}
              </div>
              <div>
                <div className="flex flex-col justify-center pt-4">
                  <div className="flex justify-center px-2">
                    <div className="flex pl-2 py-1 border rounded-l-md w-40">
                      Name
                    </div>
                    <div className="border rounded-r-md w-full py-1 flex justify-center">
                      {/* {contactDetailData?.name || allChatData[0]?.name} */}
                      {contactDetailData?.length === 0
                        ? allChatData[0]?.name
                        : contactDetailData?.name}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openProfile && (
        <Drawers
          isOpen={openProfile}
          toggleDrawer={!openProfile}
          direction="right"
        >
          <Profile setOpenProfile={setOpenProfile} />
        </Drawers>
      )}
    </div>
  );
};
