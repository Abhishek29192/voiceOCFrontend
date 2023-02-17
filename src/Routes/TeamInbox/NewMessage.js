import React from 'react'
import { PrimaryButton, SecondaryButton } from '../../components/Button'
import { InputFieldWithoutCounter } from '../../components/InputField'
import { SelectOptionButton } from '../../components/SelectOptions'
import { Base2 } from '../../components/Typography'
import { CiGlobe } from "react-icons/ci"
import { IoMdCall } from "react-icons/io"

export const NewMessage = () => {
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
    return (
        <div className="w-full h-[80vh] p-4">
            <div className="flex bg-slate-200 rounded-md py-3 px-6">
                <div className=" w-full">
                    <div className="flex">
                        <div className=" flex justify-center items-center w-full">
                            <Base2 className="poppins text-base font-extrabold text-[#666666] items-center">Choose contact</Base2>
                        </div>
                    </div>
                    <div className="flex justify-between py-4 items-center ">
                        <div className="flex relative bg-white p-1 rounded-md justify-center w-[20%] h-12 items-center">

                            <IoMdCall size={"2rem"} className="absolute left-[1px] top-3" />
                            <CiGlobe size={"2.5rem"} color={"grey"} className="" />
                        </div>
                        <InputFieldWithoutCounter placeholder={"Enter whatsapp number"} className="ml-5 h-12 w-[80%]" />
                    </div>
                    <div className="flex justify-center pt-2">
                        <Base2>Or</Base2>
                    </div>
                    <div className="flex justify-center pt-3">
                        <SelectOptionButton
                            // options={CallActionSubButton1}
                            className={colourStyles}
                        // selectedValue={CallActionSubButton1.filter(
                        //   (elem) => elem.value === details.typeOfAction
                        // )}
                        // onChange={handleChange}
                        />
                    </div>
                    <div className="flex justify-end mt-7">
                        <div>
                            <SecondaryButton text={"Close"} className={"border-transparent"} />
                        </div>
                        <div className="ml-4">
                            <PrimaryButton text={"Next"} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
