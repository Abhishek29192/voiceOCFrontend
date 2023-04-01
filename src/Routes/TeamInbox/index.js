import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useContactListOptions, usePostTeamInboxData, useSingleChatData, useTeamInboxDetails, useTemplateData } from "../../hooks/useQueryApi";
import { PrimaryButton, SecondaryButton } from "../../components/Button";
import { AiOutlineSearch } from "react-icons/ai"
import { SerachSection } from "./SerachSection";
import { NewMessage } from "./NewMessage";
import { FaWhatsapp } from "react-icons/fa"
import { TiMessages } from "react-icons/ti"
import { FaPen } from "react-icons/fa"
import { SlOptionsVertical } from "react-icons/sl"
import { Base2 } from "../../components/Typography";
import { InputFieldWithoutCounter } from "../../components/InputField";
import { useAppCommonDataProvider } from "../../components/AppCommonDataProvider/AppCommonDataProvider";
import moment from "moment/moment";
import { ChatContainer } from "../../components/Chat/ChatContainer";
import styles from "./TeamInbox.module.css";
import { CountDownTimer, MyTimer } from "../../components/Timer";


export const TeamInbox = () => {
  const [search, setSearch] = useState(false);
  const [newMessage, setNewMessage] = useState(false);
  const [showContactList, setShowContactList] = useState(false);
  const [templateData, setTemplateDate] = useState();
  const [tellMeButton, setTellMeButton] = useState(false);
  const [tellMeButtonID, setTellMeButtonID] = useState();
  const [name, setName] = useState("");
  const [selctedTemplate, setSelectedTemplate] = useState()
  const [contactDetails, setContactDetails] = useState([])
  const [singleChat, setSingleChat] = useState();
  const [initailChat, setInitialChat] = useState([]);
  const [contactName, setContactName] = useState([]);
  const { createTeamInboxDetails, setCreateTeamInboxDetails } = useAppCommonDataProvider();
  const { whatsappNumber } = createTeamInboxDetails;
  const { refetch } = useTemplateData();
  const { mutateAsync } = usePostTeamInboxData();
  const { mutateAsync: chatData } = useSingleChatData();
  const { refetch: contatcData } = useTeamInboxDetails();
  const { refetch: contactNumber } = useContactListOptions()


  const { contactDetailData } = createTeamInboxDetails;

  const getContactData = async () => {
    await contatcData().then((e) => {
      setContactDetails(e.data.data.contactList);
      chatData({
        chatId: e.data.data.contactList[0]._id,
      }).then((res) => { setInitialChat(res?.data?.chats); setName(res?.data?.name) }).catch((err) => console.log(err))
    }).catch((err) => console.log(err))
  }
  useEffect(() => {
    getContactData()
  }, [])


  useEffect(() => {
    refetch().then((res) => setTemplateDate(res?.data.data)).catch((error) => console.log(error))
    contactNumber().then((res) => setContactName(res?.data?.data?.contactarray, "contact Numbers")).catch((err) => console.log(err))
  }, [])


  const contactNameNumber = []
  contactName?.map((e) => {
    const optionContactNumber = {
      label: `${e.name} (${e.mobileNumber})`,
      value: `${e.name} (${e.mobileNumber})`
    }
    contactNameNumber.push(optionContactNumber)
    // console.log(optionContactNumber, "-+++++++++++++++++++++")
  })


  const data = {
    mobileNumber: whatsappNumber,
    userId: null,
    status: "true",
    customField: {
      templatedSelected: selctedTemplate,
      name: name,
    }
  }


  const handleSend = () => {
    mutateAsync(data).then((res) => {
      getContactData()
    }).catch((e) => console.log(e))
    setNewMessage(false);
    setSearch(false);
    setShowContactList(false);
  }


  const handleSingleChatData = (ele) => {
    setCreateTeamInboxDetails({ ...createTeamInboxDetails, contactDetailData: ele })
    chatData({
      chatId: ele._id,
    }).then((res) => { setSingleChat(res.data.chats) }).catch((err) => console.log(err))
  }




  const rowData = [{
    Name: "Abhishek kashyap",
    dashboard_url: "www.usdjghmkj.com",
    username: "abhiK",
    password: "AAAAAA"
  }]

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

  const time = new Date();
  time.setSeconds(time.getSeconds() + 600);



  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="flex">
        <div className={`w-[25%] border justify-center h-[90vh]  ${styles.slideUpwardFirst}`}>
          <div className="flex w-full justify-center items-center py-3">
            <PrimaryButton text={`New Message`} className="w-[60%] m-5 " onClick={() => { setNewMessage(!newMessage); setSearch(false); setShowContactList(false) }} />
            <div className="bg-slate-200 p-2 h-full rounded-md" onClick={() => { setSearch(!search); setNewMessage(false); setShowContactList(false) }}>
              <AiOutlineSearch size={"1.5rem"} className="" />
            </div>
          </div>
          {
            search && !newMessage && !showContactList && (
              <>
                <div className="p-2">
                  <SerachSection />
                </div>
              </>
            )
          }
          {
            newMessage && !search && !showContactList && (
              <div className="px-2">
                <NewMessage setNewMessage={setNewMessage} setShowContactList={setShowContactList} contactNameNumber={contactNameNumber} />
              </div>

            )
          }
          {!newMessage && !search && !showContactList && (
            <div className="border-t-[1px] h-[72vh] overflow-y-auto">
              {contactDetails && contactDetails?.map((ele, index) => {
                // console.log(ele, "gdfgg")
                return (
                  // <div className="border-b-[1px]" onClick={() => setCreateTeamInboxDetails({ ...createTeamInboxDetails, contactDetailData: e })}>
                  <div className="border-b-[1px]" onClick={() => handleSingleChatData(ele)}>
                    <div className="flex p-2 rounded-md items-center">
                      <div className="flex h-11 px-4 py-[0.70rem] ml-3  bg-slate-200 rounded-3xl items-center justify-center">
                        <div className="font-extrabold">{ele?.customerId?.customField?.name?.split("")[0]?.toUpperCase()}</div>
                      </div>
                      <div className="px-7 w-full">
                        <div className="font-semibold">{ele.customerId?.mobileNumber}</div>
                        <div className="text-slate-300 text-sm">{moment(ele.createdAt).format("DD/MM/YYYY  HH:mm")} PM</div>
                        <div className="py-2 text-slate-300 text-sm">Hi....</div>
                      </div>
                    </div>
                  </div>
                )

              })}

            </div>)
          }
          {
            !newMessage && !search && showContactList && (
              <div className="bg-white p-2 flex w-full ">
                <div className="bg-slate-200 rounded-lg w-full ">
                  <div className=" rounded p-3">
                    <div className="w-full py-2">
                      <div className=" flex items-center px-3 py-1 w-full">
                        <Base2 className="poppins text-base font-extrabold text-[#000000] items-center">Choose template</Base2>
                      </div>
                      <div className="p-2 w-full">
                        <InputFieldWithoutCounter placeholder={"Search template"} className="bg-white w-full" />
                      </div>
                    </div>
                    <div className=" p-2 w-full h-[66vh] overflow-y-scroll">
                      {
                        templateData?.map((e, index) => {
                          return (
                            <div className="bg-white rounded-lg px-3 my-2 h-[screen] flex flex-col" >
                              <div className="py-2">
                                <Base2 className="poppins text-sm font-extrabold text-[#000000] items-center" > {e.template_name}</Base2>
                              </div>
                              <div className="poppins text-sm my-2">{e.Body}</div>
                              <div className="py-2">
                                <SecondaryButton text={"tell me more"} className="h-11 px-7 " onClick={() => { setTellMeButton(!tellMeButton); setTellMeButtonID(index); setSelectedTemplate(e.template_name) }} />
                              </div>
                              {
                                tellMeButton && tellMeButtonID == index && (
                                  <>
                                    <div className="poppins mx-1 mt-2 font-semibold">Name</div>
                                    <div className="my-1 font-semibold">
                                      <InputFieldWithoutCounter placeholder={"name"} className="w-full bg-slate-200" onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className="flex justify-end my-2">
                                      <div>
                                        <SecondaryButton text={"Back"} onClick={() => {
                                          setTellMeButton(false)
                                          console.log(index, tellMeButton, tellMeButtonID, 'on click')
                                        }} />
                                      </div>
                                      <div className="mx-2">
                                        <PrimaryButton text={"Send"} onClick={handleSend} />
                                      </div>
                                    </div>
                                  </>
                                )
                              }
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
              </div>
            )
          }

        </div>
        <div className={`w-[50%] border bg-slate-100 overflow-x-hidden ${styles.slideUpwardMiddle}`}>
          <div className="h-[10vh] m-1 rounded border bg-white ">
            <div className="flex items-center h-full w-full  px-4 cursor-pointer justify-between">
              <div>
                <SlOptionsVertical size={"1.1rem"} />
              </div>
              {/* <div className="bg-red-400 p-[0.40rem] rounded-2xl border-[2px] float-right">
                <CountDownTimer time={86400} />
              </div> */}
            </div>
            <ChatContainer singleChat={singleChat} initialChat={initailChat} />
          </div>
        </div>
        <div className={`w-[25%] p-2 items-center ${styles.slideUpwardRight}`}>
          <div>
            <div className="flex py-5 px-1 border-b-[1px] items-center">
              <div className="flex h-11 px-4 py-[0.70rem] ml-2 bg-slate-200 rounded-3xl items-center justify-center">
                <div className="font-extrabold">{contactDetailData?.customerId
                  ?.customField
                  ?.name.split("")[0]?.toUpperCase() || name.split("")[0]?.toUpperCase()}</div>
              </div>
              <div className="flex px-2 w-full justify-between items-center">
                <div>
                  <div className="font-semibold">{contactDetailData?.customerId?.mobileNumber || initailChat[0]?.fullContactNumber}</div>
                  <div className="text-sm poppins">Available</div>
                </div>
                <div className="flex ">
                  <div className="flex bg-slate-200 rounded-md p-2">
                    <FaWhatsapp />
                  </div>
                  <div className="flex bg-slate-200 rounded-md p-2 ml-2">
                    <TiMessages />
                  </div>
                </div>
              </div>
            </div>
            <div className="py-4 px-1 border-b-[1px] items-center">
              <div className="poppins font-bold">Basic information</div>
              <div className="flex py-2">
                <div className="poppins text-sm font-semibold">Phone Number : </div>
                <div className="poppins text-sm">{contactDetailData?.customerId?.mobileNumber || initailChat[0]?.fullContactNumber}</div>
              </div>
            </div>
            <div className="flex flex-col border-b-[1px]">
              <div className="flex justify-between py-4 px-1  items-center">
                <div className="poppins font-bold text-[0.95rem]">Contact custom parameters</div>
                <div className="relative w-fit">
                  <PrimaryButton className="h-[35px]" />
                  <FaPen color="white" className="absolute top-2 left-3" />
                </div>
              </div>
              <div>

                <div className="flex flex-col justify-center pt-4">
                  <div className="flex justify-center px-2">
                    <div className="flex pl-2 py-1 border rounded-l-md w-40">Name</div>
                    <div className="border rounded-r-md w-full py-1 flex justify-center">{contactDetailData?.customerId
                      ?.customField
                      ?.name || name}</div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
