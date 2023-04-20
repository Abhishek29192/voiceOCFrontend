import React from "react";
import {InputFieldWithoutCounter} from "../../components/InputField";
import {SelectOptionButton} from "../../components/SelectOptions";

export const SerachSection = ({contactNameNumber}) => {
  // console.log(contactNameNumber, "fhgh")
  const colourStyles = {
    control: (styles) => {
      return {
        ...styles,
        backgroundColor: "white",
        width: "8rem",
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
    option: (styles, {data, isDisabled}) => {
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
    <>
      <div className="flex px-6">
        <div>
          <SelectOptionButton
            options={contactNameNumber}
            className={colourStyles}
            // selectedValue={CallActionSubButton1.filter(
            //   (elem) => elem.value === details.typeOfAction
            // )}
            // onChange={handleChange}
          />
        </div>
        <div>
          <InputFieldWithoutCounter
            placeholder={"Search by Phone Number"}
            className="ml-5 h-12 w-[88%] bg-slate-200"
          />
        </div>
      </div>
    </>
  );
};
