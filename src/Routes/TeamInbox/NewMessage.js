import React, {useEffect, useState} from "react";
import {PrimaryButton, SecondaryButton} from "../../components/Button";
import {InputFieldWithoutCounter} from "../../components/InputField";
import {SelectOptionButton} from "../../components/SelectOptions";
import {Base2} from "../../components/Typography";
import {CiGlobe} from "react-icons/ci";
import {IoMdCall} from "react-icons/io";
import {useAppCommonDataProvider} from "../../components/AppCommonDataProvider/AppCommonDataProvider";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import styles from "./newMessage.module.css";

export const NewMessage = ({
  setNewMessage,
  setShowContactList,
  contactNameNumber,
}) => {
  const {createTeamInboxDetails, setCreateTeamInboxDetails} =
    useAppCommonDataProvider();
  const {whatsappNumber} = createTeamInboxDetails;
  const [number, setNumber] = useState();
  // const [phone, setPhone] = useState("");

  const colourStyles = {
    control: (styles) => {
      return {
        ...styles,
        backgroundColor: "white",
        width: "100%",
        height: "48px",
        boxShadow: "none",
        fontSize: "12px",
        fontFamily: "poppins",
        marginTop: "2px",
        border: "none",
        "&:hover": {
          border: "none",
          cursor: "pointer",
        },
      };
    },
    option: (styles, {data, isDisabled}) => {
      return {
        ...styles,
        backgroundColor: isDisabled ? "red" : "white",
        color: "#000",
        width: "100%",
        fontSize: "12px",
        fontFamily: "poppins",
        cursor: isDisabled ? "not-allowed" : "pointer",
      };
    },
  };

  const handleNumber = (num) => {
    setNumber(num);
    setCreateTeamInboxDetails({...createTeamInboxDetails, whatsappNumber: num});
  };

  const handleDemo = () => {
    // let validation = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    let validation = /[0-9]{1,2}[0-9]{10}/;
    if (number.match(validation)) {
      setNewMessage(false);
      setShowContactList(true);
    } else {
      alert("Enter valid number");
    }
  };
  return (
    <div className="w-full h-[80vh] p-4">
      <div className="flex bg-slate-200 rounded-md py-3 px-6">
        <div className=" w-full">
          <div className="flex">
            <div className=" flex justify-center items-center w-full">
              <Base2 className="poppins text-base font-extrabold text-[#666666] items-center">
                Choose contact
              </Base2>
            </div>
          </div>
          <div className="flex gap-3 w-full py-4 items-center ">
            <div className="flex relative bg-white p-1 rounded-md justify-center w-[20%] h-12 items-center">
              <IoMdCall size={"2rem"} className="absolute left-[1px] top-3" />
              <CiGlobe size={"2.5rem"} color={"grey"} />
            </div>
            <div className="w-fit">
              <PhoneInput
                country={"in"}
                enableSearch={true}
                value={number}
                inputClass={styles.pInputClass}
                onChange={(number) => handleNumber(number)}
                // setCreateTeamInboxDetails({...createTeamInboxDetails, whatsappNumber: e.target.value }
                buttonClass={styles.btn}
              />
            </div>
            {/* <InputFieldWithoutCounter type='tel' placeholder={"Enter whatsapp number"} className="ml-5 h-12 w-[80%]" onChange={(e) => { setCreateTeamInboxDetails({ ...createTeamInboxDetails, whatsappNumber: e.target.value }); setNumber(e.target.value) }} /> */}
          </div>
          <div className="flex justify-center pt-2">
            <Base2>Or</Base2>
          </div>
          <div className="flex w-full ">
            <SelectOptionButton
              options={contactNameNumber}
              // className={`${colourStyles}`}
              className={colourStyles}

              // selectedValue={CallActionSubButton1.filter(
              //   (elem) => elem.value === details.typeOfAction
              // )}
              // onChange={handleChange}
            />
          </div>
          <div className="flex justify-end mt-7">
            <div>
              <SecondaryButton
                text={"Close"}
                className={"border-transparent"}
                onClick={() => setNewMessage(false)}
              />
            </div>
            <div className="ml-4">
              <PrimaryButton
                text={"Next"}
                disabled={!number}
                // onClick={() => { setNewMessage(false); setShowContactList(true); }}
                onClick={() => handleDemo()}
              />
              {/* <PrimaryButton text={"Next"} disabled={!number} onClick={handleNextButton()} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
