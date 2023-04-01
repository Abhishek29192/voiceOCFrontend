import React, { useEffect, useState } from 'react'
import { PrimaryButton } from '../Button'
import { InputFieldWithoutCounter } from '../InputField'
import { GrAttachment } from "react-icons/gr"
import { BsEmojiSmile } from "react-icons/bs"
import Picker from 'emoji-picker-react';
import { IoImageOutline } from "react-icons/io5"
import { BsFileEarmarkPlus } from "react-icons/bs"
import { TbVideo } from "react-icons/tb"
import { Base2, Heading3Strong } from '../Typography'
import { useUploadVideo } from '../../hooks/useQueryApi'
import { useAppCommonDataProvider } from '../AppCommonDataProvider/AppCommonDataProvider'


export const InputChatField = ({ placeholder, sendChatToSocket, setImage, setTypeOfMessage, messageStatus }) => {
    console.log(messageStatus, "trdgfgfbvjhmgjhgjynhgbkmyh")
    const [message, setMessage] = useState("")
    const [openEmoji, setOpenEmoji] = useState(false)
    const [openFileUpload, setOpenFileUpload] = useState(false)
    const { createTeamInboxDetails, setCreateTeamInboxDetails } = useAppCommonDataProvider();
    const { contactDetailData } = createTeamInboxDetails;
    const { mutateAsync } = useUploadVideo()


    const onEmojiClick = (event, emojiObject) => {
        setMessage((prevInput) => prevInput + event.emoji);
        setOpenEmoji(false)
    };

    const handleEnter = (e) => {
        if (e.keyCode === 13 && message.trim()) {
            sendChatToSocket(message.trim());
            setMessage('')
        }
    }

    const handleImage = (e) => {
        console.log(e, "image")
        setImage(e.target.files[0]);
        setMessage(e.target.files[0])
        setOpenFileUpload(false);
        setTypeOfMessage(e.target.files[0].type)
        setOpenFileUpload(false)
    }

    const handleFile = (e) => {
        setMessage(e.target.files[0])
        setOpenFileUpload(false);
        setTypeOfMessage(e.target.files[0].type)
    }

    const handleVideo = (e) => {
        console.log("dsfghj")
        const data = new FormData()
        data.append("video", e.target.files[0])
        data.set("mobileNumber", contactDetailData?.customerId?.mobileNumber)
        data.set("chatId", contactDetailData?._id)
        setOpenFileUpload(false);

        // const videoData = {
        //     data: data,
        //     mobileNumber: contactDetailData?.customerId?.mobileNumber,
        //     chatId: contactDetailData?._id,
        // }
        mutateAsync(data).then((e) => console.log(e)).catch((err) => console.log(err))
    }



    return (
        <form onKeyDown={(e) => handleEnter(e)} className='relative z-[111]'>
            <div className='flex absolute bottom-0 right-0'>
                {openEmoji && (
                    <div className='flex'>
                        <Picker size={1} width='322' height={500} emojiStyle='google' onEmojiClick={onEmojiClick} />
                    </div>
                )}
            </div>

            {openFileUpload && (
                <div className=' flex flex-col absolute bottom-[85px] right-24 h-[250px] w-[100px] border bg-white rounded-xl  items-center justify-center'>
                    <div className='border h-fit w-fit p-2 bg-slate-200 rounded-md' >
                        {/* <input type="file" id="image-upload" hidden onChange={(e) => setImage(e.target.files[0])} /> */}
                        <input type="file" id="image-upload" hidden accept='.jpg,.jpeg,.png' onChange={(e) => handleImage(e)} />
                        <label for="image-upload" className='p-0 border-none' >
                            <IoImageOutline size={"1.8rem"} color={"black"} /></label>
                    </div>
                    <div className='border h-fit w-fit p-2 my-7 bg-slate-200 rounded-md' >
                        <input type="file" id="file-upload" hidden accept='.pdf' onChange={(e) => handleFile(e)} />
                        <label for="file-upload" className='p-0 border-none' >
                            <BsFileEarmarkPlus size={"1.8rem"} color={"black"} /></label>
                    </div>
                    <div className='border h-fit w-fit p-2 bg-slate-200 rounded-md' >
                        <input type="file" id="video-upload" hidden accept='video/*' onChange={(e) => handleVideo(e)} />
                        <label for="video-upload" className='p-0 border-none' >
                            <TbVideo size={"1.8rem"} color={"black"} /></label>
                    </div>
                </div>
            )}
            {/* </div> */}
            {
                messageStatus ? (

                    <div className="w-full border bg-white p-4  flex items-center rounded relative z-[222] justify-between">
                        <div className=" w-fit relative">
                            <InputFieldWithoutCounter placeholder={placeholder} onChange={(e) => setMessage(e.target.value)} value={typeof message !== "string" ? message.name : message} className="bg-slate-200 w-[38vw] h-[7vh]" />
                            <div className='absolute top-3 right-11' onClick={() => { setOpenEmoji(!openEmoji); setOpenFileUpload(false) }}><BsEmojiSmile size={"1.3rem"} /></div>
                            <div className='absolute top-3 right-3' onClick={() => { setOpenFileUpload(!openFileUpload); setOpenEmoji(false) }}><GrAttachment size={"1.3rem"} /></div>
                        </div>
                        <div className=''>
                            <PrimaryButton text={"Send"} type={"submit"} className="px-7" disabled={!message} onClick={() => { sendChatToSocket(message); setMessage('') }} />
                        </div>
                    </div>
                ) : (
                    <div className='bg-white mt-2 rounded-md h-[75px] w-full flex items-center justify-between'>
                        <div>
                            <Base2 className='justify-center px-4 text-2xl'>Chat is been Expired</Base2>
                            <Base2 className='justify-center px-4'>You cannot send message in a closed conversation</Base2>
                        </div>
                        <div className='mx-3'>
                            <PrimaryButton text={"New Message"} />
                        </div>

                    </div>
                )

            }
        </form>
    )
}


