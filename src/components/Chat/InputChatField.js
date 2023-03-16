import React, { useEffect, useState } from 'react'
import { PrimaryButton } from '../Button'
import { InputFieldWithoutCounter } from '../InputField'
import { GrAttachment } from "react-icons/gr"

export const InputChatField = ({ placeholder, sendChatToSocket }) => {
    const [message, setMessage] = useState("")
    const handleEnter = (e) => {
        if (e.keyCode === 13) {
            sendChatToSocket(message);
            setMessage('')
        }
    }

    return (
        <form onKeyDown={(e) => handleEnter(e)}>
            <div className="w-full border bg-white p-4 flex items-center rounded justify-between">
                <div className=" w-fit relative">
                    <InputFieldWithoutCounter placeholder={placeholder} onChange={(e) => setMessage(e.target.value)} value={message} className="bg-slate-200 w-[38vw] h-[7vh]" />
                    <div className='absolute top-3 right-3'><GrAttachment size={"1.3rem"} /></div>
                </div>
                <div>
                    <PrimaryButton text={"Send"} type={"submit"} className="px-7" disabled={!message} onClick={() => { sendChatToSocket(message); setMessage('') }} />
                </div>
            </div>
        </form>
    )
}


