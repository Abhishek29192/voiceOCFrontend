import React from "react";
import { optionSortHeader } from "../../constants/DropDownContent";
import { useAppCommonDataProvider } from "../AppCommonDataProvider/AppCommonDataProvider";
import { SecondaryButton } from "../Button";
import { InputField, InputFieldWithoutCounter } from "../InputField";
import { SelectOptionButton } from "../SelectOptions";
import { Caption1, Paragraph1, Paragraph3 } from "../Typography";

const colourStyles = {
  control: (styles) => {
    return {
      ...styles,
      backgroundColor: "white",
      width: "7.6rem",
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

export const CreateTemplateHeader = () => {
  const { setCreateTemplateValues, createTemplateValues } =
    useAppCommonDataProvider();

  const { header } = createTemplateValues;

  return (
    <div className="w-full p-3 ">
      <Paragraph3 className="p-2">Header (Optional)</Paragraph3>
      <Caption1 className="p-2">
        Add a title or choose which type of media you'll use for this header.
      </Caption1>
      <Caption1 className="p-2">
        Your title can't include more than one variable.
      </Caption1>
      <div className="p-2">
        <SelectOptionButton
          options={optionSortHeader.filter((ele) => ele.value !== header)}
          className={colourStyles}
          placeholder="None"
          onChange={(e) =>
            setCreateTemplateValues({
              ...createTemplateValues,
              header: e.value,
            })
          }
        />
        {header === optionSortHeader[1].value ? (
          <InputField
            placeholder="Enter Text"
            className={"bg-slate-100 w-[98%] mt-4 text-[12px]"}
          />
        ) : null}

        {header === optionSortHeader[2].value ? (
          <div>
            <div className="mt-2 flex">
              <div className="flex poppins ml-1 ">
                <input type="radio" name="radioOption" />
                <Paragraph3 className="pl-2">Images</Paragraph3>
              </div>
              <div className="flex poppins ml-4">
                <input type="radio" name="radioOption" />
                <Paragraph3 className="pl-2">Video</Paragraph3>
              </div>
              <div className="flex poppins ml-4">
                <input type="radio" name="radioOption" />
                <Paragraph3 className="pl-2">Document</Paragraph3>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <InputFieldWithoutCounter
                placeholder="Enter Url..."
                className={"bg-slate-100 w-[65%]"}
                type={"text"}
              />
              <Paragraph1 className="items-center justify-center ml-5">
                or
              </Paragraph1>
              <div className="ml-5">
                <SecondaryButton text="Upload Media" className={colourStyles} />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
