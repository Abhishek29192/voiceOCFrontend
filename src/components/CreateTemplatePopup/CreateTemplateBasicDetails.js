import React from "react";
import {
  optionCategoary,
  optionLanguage,
} from "../../constants/DropDownContent";
import { useAppCommonDataProvider } from "../AppCommonDataProvider/AppCommonDataProvider";
import { InputField, InputFieldWithoutCounter } from "../InputField";
import { SelectOptionButton } from "../SelectOptions";
import { Paragraph3 } from "../Typography";

const colourStyles1 = {
  control: (styles) => {
    return {
      ...styles,
      backgroundColor: "white",
      width: "13rem",
      height: "2.2rem",
      boxShadow: "none",
      fontSize: "12px",
      fontFamily: "poppins",
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
      width: "12rem",
      fontSize: "12px",
      fontFamily: "poppins",
      cursor: isDisabled ? "not-allowed" : "pointer",
    };
  },
};

export const CreateTemplateBasicDetails = () => {
  const { setCreateTemplateValues, createTemplateValues, selectedRowData } =
    useAppCommonDataProvider();

  const { templateName, category, language } = createTemplateValues;
  return (
    <>
      <div className="w-full flex p-3">
        <div className=" w-full p-2">
          <Paragraph3 className="pb-2 text-sm">Template Name</Paragraph3>
          <InputFieldWithoutCounter
            className={
              " bg-slate-100 w-[98%] border border-#5b3ddc-500 text-[12px] p-2 h-[2.4rem]"
            }
            placeholder="Template Name"
            type={"text"}
            value={templateName}
            onChange={(e) => {
              setCreateTemplateValues?.({
                ...createTemplateValues,
                templateName: e.target.value,
              });
            }}
          />
        </div>
        <div className=" w-full p-2">
          <Paragraph3 className="pb-2">Category</Paragraph3>
          <SelectOptionButton
            options={optionCategoary.filter((ele) => ele.value !== category)}
            className={colourStyles1}
            placeholder="Category"
            selectedValue={optionCategoary.filter((ele) => {
              if (ele.value === selectedRowData.Category) return ele.label;
            })}
            onChange={(e) => {
              setCreateTemplateValues?.({
                ...createTemplateValues,
                category: e.value,
              });
            }}
          />
        </div>
        <div className="w-full p-2">
          <Paragraph3 className="pb-2">Language</Paragraph3>
          <SelectOptionButton
            options={optionLanguage.filter((ele) => ele.value !== language)}
            className={colourStyles1}
            placeholder="Language"
            selectedValue={optionLanguage.filter((ele) => {
              if (ele.value === selectedRowData.Langauge) return ele.label;
            })}
            onChange={(e) => {
              setCreateTemplateValues?.({
                ...createTemplateValues,
                language: e.value,
              });
            }}
          />
        </div>
      </div>
    </>
  );
};
