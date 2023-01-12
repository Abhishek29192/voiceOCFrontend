import React, { useState } from "react";
import {
  Base1Strong,
  Base2,
  Caption1,
  Caption2,
  Paragraph1,
  Paragraph3,
} from "../../components/Typography";
import {
  oprtionSortHeader,
  OptionButton,
  optionLanguage,
  optionSort,
  optionSort1,
} from "../../constants/DropDownContent";
import { PrimaryButton, SecondaryButton } from "../../components/Button";
import { IoSearchOutline } from "react-icons/io5";
import { InputField, InputTextArea } from "../../components/InputField";
import { SelectOptionBUtton } from "../../components/SelectOptions";
import { FaFilter } from "react-icons/fa";
import { TfiImport, TfiExport } from "react-icons/tfi";
import Navbar from "../../components/Navbar";
import BroadcastOptions from "../../components/BroadcastOptions";
import BasicTable from "../../components/Table";
import CustomModal from "../../components/Modal";
import newTemplateBlue from "../../components/Images/newTemplateBlue.svg";
import templateOption from "../../components/Images/storedTemplate.svg";
import "./TemplateMessage.css";

export const TemplateMessage = () => {
  const [open, setOpen] = useState(false);
  const [createTemplate, setCreateNewTemplate] = useState(false);
  const [currentlySelectedOption, setCurrentlySelectedOption] = useState("");
  console.log(OptionButton[0].value, "ugj");

  const handleNewTemplate = () => {
    setOpen(!open);
  };

  const handleCreateNewTemplate = () => {
    setCreateNewTemplate(!createTemplate);
    setOpen(!open);
  };

  const colourStyles = {
    control: (styles) => {
      return {
        ...styles,
        backgroundColor: "white",
        width: "7rem",
        height: "2.8rem",
        boxShadow: "none",
        border: "1px solid #5536db",
        "&:hover": {
          border: "1px solid #5536db",
        },
      };
    },
    option: (styles, { data, isDisabled }) => {
      return {
        ...styles,
        backgroundColor: isDisabled ? "red" : "white",
        color: "#000",
        width: "10rem",
        fontFamily: "poppins",
        cursor: isDisabled ? "not-allowed" : "pointer",
      };
    },
  };

  const colourStyles1 = {
    control: (styles) => {
      return {
        ...styles,
        backgroundColor: "white",
        width: "13rem",
        height: "2.2rem",
        boxShadow: "none",
        border: "1px solid #5536db",
        "&:hover": {
          border: "1px solid #5536db",
        },
      };
    },
    option: (styles, { data, isDisabled }) => {
      return {
        ...styles,
        backgroundColor: isDisabled ? "red" : "white",
        color: "#000",
        width: "12rem",
        fontFamily: "poppins",
        cursor: isDisabled ? "not-allowed" : "pointer",
      };
    },
  };

  // const onFocus = ({ focused, isDisabled }) => {
  //   console.log(focused.label, "svjsshdjh");
  //   // const msg = `You are currently focused on option ${focused.label}${
  //   //   isDisabled ? ", disabled" : ""
  //   // }`;
  //   // setAriaFocusMessage(msg);
  //   // return msg;
  // };

  return (
    <>
      <div className="h-screen">
        <Navbar />
        <div className=" xl:flex h-full">
          {/* <div className=""> */}
          <BroadcastOptions />
          {/* </div> */}
          <div className="Brodcast_section justify-between p-5 h-5/6 ">
            <div className="flex">
              <div className="flex items-center">
                {/* TEXT AND DROPDOWN------------ */}
                <div className="h-12 flex w-1/3 ">
                  <Base2 className="poppins sort__text">Sorted By :</Base2>
                  <div className="h-12 ml-3">
                    <SelectOptionBUtton
                      className={colourStyles}
                      options={optionSort}
                    />
                  </div>
                </div>
                {/* iNPUT FIELD ------------------*/}
                <div className="relative input__container">
                  <InputField placeholder="Search ..." className={"h-11"} />
                  <IoSearchOutline
                    className="absolute top-2 -right-11"
                    size={"1.6rem"}
                  />
                </div>
                {/* fILTER BUTTON -----------------*/}
                <button className="filter__icon h-11">
                  <FaFilter className="filter" size={"1.2rem"} />
                </button>
                {/* IMPORT EXPORT BUTTON ------------*/}
                <div className="import_export_icon h-11 ">
                  <div className="pr-3 import_border">
                    <TfiImport />
                  </div>
                  <div className="p-3">
                    <TfiExport />
                  </div>
                </div>
              </div>

              {/* NEW TEMPLATE BUTTON --------------*/}
              <div className="h-12 pl-32">
                <PrimaryButton
                  text="New Template Message"
                  className="primary__btn"
                  onClick={handleNewTemplate}
                />
              </div>
            </div>

            <div className="mt-24">
              <BasicTable />
            </div>
          </div>
        </div>

        {open && (
          <CustomModal
            open={open}
            onClose={() => setOpen(false)}
            showCloseIcon={true}
          >
            <div>
              <div>
                <Base1Strong className="mr-96">Create New Template</Base1Strong>
              </div>
              <div className="flex">
                <div
                  className="template_section1"
                  onClick={handleCreateNewTemplate}
                >
                  <img src={newTemplateBlue} className="template__images" />
                  <Paragraph1>Start From Scratch</Paragraph1>
                  <Paragraph3 className="pt-3 poppins pb-3">
                    Start from a blank template
                  </Paragraph3>
                </div>
                <div className="template_section1">
                  <img src={templateOption} className="template__images" />
                  <Paragraph1>Use A Template</Paragraph1>
                  <Paragraph3 className="pt-3 poppins">
                    Use one of our pre-defined templates and edit them
                  </Paragraph3>
                </div>
              </div>
            </div>
          </CustomModal>
        )}

        {createTemplate && (
          <CustomModal
            open={createTemplate}
            onClose={() => setCreateNewTemplate(false)}
            showCloseIcon={true}
            classNames={{ modal: "customModal" }}
          >
            <div className="items-center h-full pb-3">
              <Base1Strong className=" items-center">
                Create template message
              </Base1Strong>
            </div>
            <div className="flex border">
              <div className="w-full">
                <div className="w-full flex">
                  <div className=" w-full p-2">
                    <Paragraph3 className="pb-2">Template Name</Paragraph3>
                    <InputField
                      className={
                        " bg-slate-100 w-full border border-#5b3ddc-500 h-[2.3rem]"
                      }
                      placeholder="Template Name"
                    />
                  </div>
                  <div className=" w-full p-2">
                    <Paragraph3 className="pb-2">Category</Paragraph3>
                    <SelectOptionBUtton
                      options={optionSort1}
                      className={colourStyles1}
                      placeholder="Category"
                    />
                  </div>
                  <div className="w-full p-2">
                    <Paragraph3 className="pb-2">Language</Paragraph3>
                    <SelectOptionBUtton
                      options={optionLanguage}
                      className={colourStyles1}
                      placeholder="Language"
                    />
                  </div>
                </div>
                <hr />
                <div className="w-full">
                  <Paragraph3 className="p-2">Header (Optional)</Paragraph3>
                  <Caption1 className="p-2">
                    Add a title or choose which type of media you'll use for
                    this header.
                  </Caption1>
                  <Caption1 className="p-2">
                    Your title can't include more than one variable.
                  </Caption1>
                  <div className="p-2">
                    <SelectOptionBUtton
                      options={oprtionSortHeader}
                      className={colourStyles}
                      placeholder="None"
                    />
                  </div>
                </div>
                <hr />
                <div>
                  <Paragraph3 className="p-2">Body</Paragraph3>
                  <Caption1 className="p-2">
                    To add a custom variable, please add a variable in double
                    curly brackets without a space.
                  </Caption1>
                  <div className="p-2">
                    <SecondaryButton
                      text="Add Variables"
                      onClick={() => {
                        console.log("hfg");
                      }}
                    />
                  </div>
                  <div>
                    <InputTextArea
                      placeholder="Template Message..."
                      className={" h-24 m-2 p-2"}
                    />
                  </div>
                  <hr />
                  <div>
                    <Paragraph3 className="p-2">Footer (Optional)</Paragraph3>
                    <Caption1 className="p-2">
                      Add a short line of text to the bottom of your message
                      template.
                    </Caption1>
                    <InputField
                      placeholder="Enter text.."
                      className={"bg-slate-100 w-[97%] p-2 m-2"}
                      showCount={true}
                    />
                  </div>
                  <hr />
                  <div>
                    <Paragraph3 className="p-2">Buttons (Optional)</Paragraph3>
                    <Caption1 className="p-2">
                      Create buttons that let customers respond to your message
                      or take action.
                    </Caption1>
                    <div className="p-2">
                      <SelectOptionBUtton
                        options={OptionButton}
                        className={colourStyles}
                        placeholder="None"
                        setCurrentlySelectedOption={setCurrentlySelectedOption}
                      />
                      {currentlySelectedOption === OptionButton[0].value ? (
                        <div>
                          <div className="flex mt-5">
                            <div className="mt-2">
                              <SelectOptionBUtton
                                options={OptionButton}
                                className={colourStyles}
                                placeholder="None"
                              />
                            </div>
                            <div>
                              <InputField
                                placeholder="Button text.."
                                className={"bg-slate-100 w-[75%] p-2 m-1 ml-24"}
                                showCount={true}
                              />
                            </div>
                          </div>
                          <div className="flex mt-5">
                            <div className="mt-2">
                              <SelectOptionBUtton
                                options={OptionButton}
                                className={colourStyles}
                                placeholder="None"
                              />
                            </div>
                            <div>
                              <InputField
                                placeholder="Enter text.."
                                className={"bg-slate-100 w-[75%] p-2 m-1 ml-24"}
                                showCount={true}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-2/5 flex p-2 templateViewBackground">
                <div className="flex m-2 bold poppins">Preview</div>
              </div>
            </div>
            <div className="float-right flex m-2">
              <div className="mr-4 ">
                <SecondaryButton
                  text="Save as draft"
                  className="h-full w-full"
                />
              </div>
              <div>
                <PrimaryButton text="Save and Submit" />
              </div>
            </div>
          </CustomModal>
        )}
      </div>
    </>
  );
};
