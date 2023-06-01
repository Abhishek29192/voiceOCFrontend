import React, { useEffect, useState } from "react";
import { PrimaryButton, SecondaryButton } from "../../components/Button";
import { InputFieldWithoutCounter } from "../../components/InputField";
import { SelectOptionButton } from "../../components/SelectOptions";
import { Base2 } from "../../components/Typography";
import { CiGlobe } from "react-icons/ci";
import { IoMdCall } from "react-icons/io";
import { useAppCommonDataProvider } from "../../components/AppCommonDataProvider/AppCommonDataProvider";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import styles from "./newMessage.module.css";
import { ToastContainer, toast } from "react-toastify";
import { Tooltip } from 'react-tooltip'
// import Tooltip from "@atlaskit/tooltip";
import { components } from "react-select";
import "react-toastify/dist/ReactToastify.css";


export const NewMessage = ({
  setNewMessage,
  setShowContactList,
  contactNameNumber,
  selectedOptionNumber,
  setSelectedOptionNumber
}) => {

  const { createTeamInboxDetails, setCreateTeamInboxDetails } = useAppCommonDataProvider();
  const { contactDetailData, whatsappNumber } = createTeamInboxDetails;
  console.log(contactDetailData?.chatDetail?.lastMessageTime, "timeeeeeeeeeee")

  const [number, setNumber] = useState();
  const [numberDropDown, setNumberDropDown] = useState();

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
    option: (styles, { data, isDisabled }) => {
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

  const showToast = () => {
    toast.error(`Enter Valid Mobile Number`, {
      autoClose: 1500,
      closeOnClick: true,
      position: "top-right",
    });
  };

  const handleNumberOnlyInput = e => {
    if (e.nativeEvent.code === "KeyE" && e.nativeEvent.code === "Minus") {
      e.preventDefault();
    }
  };

  const Input = props => {
    console.log(props, "inpiwjhm")
    if (props.isHidden) {
      return <components.Input {...props} />;
    }

    return (
      <div>
        <Tooltip content={"Custom Input"}>
          <components.Input {...props} type="number" />
        </Tooltip>
      </div>
    );
  };

  const handleInputChange = (value, action) => {
    console.log(value);
    console.log(action);
  };

  const handleNumber = (num) => {
    setNumber(num);
    setCreateTeamInboxDetails({ ...createTeamInboxDetails, whatsappNumber: num });
  };

  const handleDropDownNumber = (selectedOptionNumber) => {
    setNumberDropDown(selectedOptionNumber.value.slice(1, -1))
    setCreateTeamInboxDetails({ ...createTeamInboxDetails, whatsappNumber: selectedOptionNumber.value.slice(1, -1) });
  }

  const handleDemo = () => {
    // let validation = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    let validation = /[0-9]{1,2}[0-9]{10}/;
    if (whatsappNumber.match(validation)) {
      setNewMessage(false);
      setShowContactList(true);
    } else {
      showToast()
      // alert("Enter valid number");
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
                buttonClass={styles.btn}
              />
            </div>
          </div>
          <div className="flex justify-center py-2">
            <Base2>Or</Base2>
          </div>
          <div className="flex w-full ">
            <SelectOptionButton
              options={contactNameNumber}
              className={colourStyles}
              onKeyDown={(e) => handleNumberOnlyInput(e.target.value)}
              components={Input}
              onInputChange={(e) => handleInputChange(e)}
              // selectedValue={contactNameNumber.filter(
              //   (elem) => elem.value === details.typeOfAction
              // )}
              // onChange={handleDropDownNumber}
              autofocus={true}
              isSearchable={false}
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
                // disabled={!number || !selectedOptionNumber}
                // onClick={() => { setNewMessage(false); setShowContactList(true); }}
                onClick={() => handleDemo()}
              />
              <ToastContainer theme="light" />
              {/* <PrimaryButton text={"Next"} disabled={!number} onClick={handleNextButton()} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
