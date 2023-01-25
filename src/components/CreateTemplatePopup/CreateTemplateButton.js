import React from "react";
import {
  CallActionSubButton1,
  CallActionSubButton2,
  CallPhoneAction,
  OptionButton,
  VisitWebsiteAction,
} from "../../constants/DropDownContent";
import { useAppCommonDataProvider } from "../AppCommonDataProvider/AppCommonDataProvider";
import { InputField } from "../InputField";
import { SelectOptionButton } from "../SelectOptions";
import { Caption1, Paragraph3 } from "../Typography";

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

export const CreateTemplateButton = () => {
  const { setCreateTemplateValues, createTemplateValues, selectedRowData } =
    useAppCommonDataProvider();
  console.log(selectedRowData, "selected row Data");
  const { optionalButtonValue, ctaButtons } = createTemplateValues;

  const CallPhone = ({ details }) => {
    const { phoneNumber, buttonText, typeOfAction } = details;

    const handleChange = (e) => {
      if (e.value === typeOfAction) return;
      const newData = [...ctaButtons];
      const indexOfCurrentItem = ctaButtons.findIndex(
        (x) => x._id === details._id
      );
      const newIndexDataForWebsite = {
        typeOfAction: VisitWebsiteAction,
        buttonText: "",
        urlType: "",
        websiteUrl: "",
        _id: details._id,
      };

      const newIndexDataForPhone = {
        typeOfAction: CallPhoneAction,
        phoneNumber: "",
        buttonText: "",
        websiteUrl: "",
        _id: details._id,
      };
      newData[indexOfCurrentItem] =
        e.value === VisitWebsiteAction
          ? newIndexDataForWebsite
          : newIndexDataForPhone;
      setCreateTemplateValues?.({
        ...createTemplateValues,
        ctaButtons: newData,
      });
    };

    return (
      <div className="mt-4 flex  items-center">
        <SelectOptionButton
          options={CallActionSubButton1}
          className={colourStyles}
          selectedValue={CallActionSubButton1.filter(
            (elem) => elem.value === details.typeOfAction
          )}
          onChange={handleChange}
        />
        <div className="items-center flex mb-2 mt-3 ">
          <div>
            <InputField
              placeholder="Button text..."
              value={buttonText}
              className={
                "bg-slate-100 w-[72%] h-[100%] p-2 ml-14 text-[12px] pb-5"
              }
              charCountInput={buttonText.length}
              maxLength={20}
            />
          </div>
          <div>
            <InputField
              placeholder="Button text..."
              value={phoneNumber}
              className={
                "bg-slate-100 w-[72%] h-[100%] p-3 mt-1 ml-14 text-[12px] pb-5"
              }
              charCountInput={phoneNumber.length}
              maxLength={20}
            />
          </div>
        </div>
      </div>
    );
  };

  const VisitWebsite = ({ details }) => {
    const { typeOfAction, buttonText, urlType } = details;

    const handleChange = (e) => {
      if (e.value === typeOfAction) return;
      const newData = [...ctaButtons];
      const indexOfCurrentItem = ctaButtons.findIndex(
        (x) => x._id === details._id
      );
      const newIndexDataForWebsite = {
        typeOfAction: VisitWebsiteAction,
        buttonText: "",
        urlType: "",
        websiteUrl: "",
        _id: details._id,
      };

      const newIndexDataForPhone = {
        typeOfAction: CallPhoneAction,
        phoneNumber: "",
        buttonText: "",
        websiteUrl: "",
        _id: details._id,
      };
      newData[indexOfCurrentItem] =
        e.value === VisitWebsiteAction
          ? newIndexDataForWebsite
          : newIndexDataForPhone;
      setCreateTemplateValues?.({
        ...createTemplateValues,
        ctaButtons: newData,
      });
    };

    const handleWebsiteTypeChange = (e) => {
      if (e.value === urlType) return;
      const newData = [...ctaButtons];
      const indexOfCurrentItem = ctaButtons.findIndex(
        (x) => x._id === details._id
      );
      details.urlType = e.value;
      const newDetails = { ...details };
      newData[indexOfCurrentItem] = newDetails;
      setCreateTemplateValues?.({
        ...createTemplateValues,
        ctaButtons: newData,
      });
    };

    return (
      <div className="mt-4 ">
        <div className="flex items-center pb-3">
          <SelectOptionButton
            options={CallActionSubButton1}
            className={colourStyles}
            selectedValue={CallActionSubButton1.filter(
              (elem) => elem.value === typeOfAction
            )}
            onChange={handleChange}
          />
          <div>
            <InputField
              placeholder="Button text..."
              value={buttonText}
              className={
                "bg-slate-100 w-[72%] h-[100%] p-3  ml-14 text-[12px] pb-5"
              }
              charCountInput={buttonText.length}
              maxLength={20}
              // disableOption={disable}
            />
          </div>
        </div>

        <div className="flex items-center mt-2">
          <SelectOptionButton
            options={CallActionSubButton2}
            className={colourStyles}
            selectedValue={CallActionSubButton2.filter(
              (elem) => elem.value === urlType
            )}
            onChange={handleWebsiteTypeChange}
          />
          <div>
            <InputField
              placeholder="Button text..."
              value={urlType}
              className={
                "bg-slate-100 w-[72%] h-[85%] p-3 mt-1 ml-14 text-[12px] pb-5"
              }
              charCountInput={buttonText.length}
              maxLength={20}
            />
          </div>
        </div>
      </div>
    );
  };

  const CTASection = () => {
    return (
      <div>
        {ctaButtons !== undefined &&
          ctaButtons.length > 0 &&
          ctaButtons.map((button, index) => {
            const { typeOfAction } = button;
            if (typeOfAction === CallPhoneAction)
              return <CallPhone details={button} key={index.toString()} />;

            if (typeOfAction === VisitWebsiteAction)
              return <VisitWebsite details={button} key={index.toString()} />;
          })}
      </div>
    );
  };

  const QRSection = () => {
    return (
      <div>
        <div>wshghk,hn</div>
      </div>
    );
  };

  return (
    <div>
      <Paragraph3 className="p-2 pt-4">Buttons (Optional)</Paragraph3>
      <Caption1 className="p-2">
        Create upto 2 buttons that let customers respond to your message or take
        action.
      </Caption1>
      <div className="p-2">
        <SelectOptionButton
          options={OptionButton.filter(
            (btn) => btn.value !== optionalButtonValue
          )}
          selectedValue={OptionButton.filter((ele) => {
            if (ele.value === selectedRowData.ButtonType) return ele.label;
          })}
          onChange={(e) =>
            setCreateTemplateValues({
              ...createTemplateValues,
              optionalButtonValue: e.value,
            })
          }
          className={colourStyles}
          placeholder="None"
        />

        {optionalButtonValue === "Call To Action" ? (
          <CTASection />
        ) : (
          <QRSection />
        )}

        {/* {optionalButtonValue === "Call To Action"
          ? buttons.map((e) => {
              if (e.typeOfAction === "Call Phone Number") {
                return (
                  <div className="mt-5">
                    <div className="w-full flex">
                      <SelectOptionButton
                        options={CallActionSubButton1}
                        className={colourStyles}
                        placeholder="None"
                        selectedValue={CallActionSubButton1.filter((ele) => {
                          if (
                            ele.value ===
                            selectedRowData.Buttons[1].typeOfAction
                          )
                            return ele.label;
                        })}
                        onChange={(e) => {
                          setCreateTemplateValues({
                            ...createTemplateValues,
                            typeOfAction: e.value,
                          });
                        }}
                      />
                      <div>
                        <InputField
                          placeholder="Button text..."
                          value={selectedRowData.Buttons[1].buttonText}
                          className={
                            "bg-slate-100 w-[72%] h-[85%] p-3 mt-1 ml-14 text-[12px] pb-5"
                          }
                          showCount={false}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex mt-4 mb-3">
                        <div className="mt-2">
                          <SelectOptionButton
                            options={CallActionSubButton2}
                            className={colourStyles}
                            placeholder="None"
                            // selectedValue={CallActionSubButton2.filter(
                            //   (ele) => {
                            //     if (
                            //       ele.value ===
                            //       selectedRowData.Buttons[0].urlType
                            //     )
                            //       return ele.label;
                            //   }
                            // )}
                            // onChange={(e) => {
                            //   setStaticDynamicButton({
                            //     value: e.value,
                            //   });
                            // }}
                          />
                        </div>
                        <div>
                          <InputField
                            placeholder="http://www.xyz.com"
                            // value={selectedRowData.Buttons[0]?.websiteUrl}
                            className={
                              "bg-slate-100 w-[72%] h-[75%] p-3 mt-3 ml-14 text-[12px]"
                            }
                            showCount={false}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="w-full flex mt-6 mb-5">
                    <SelectOptionButton
                      options={CallActionSubButton1}
                      className={colourStyles}
                      placeholder="None"
                      selectedValue={CallActionSubButton1.filter((ele) => {
                        if (
                          ele.value === selectedRowData.Buttons[0].typeOfAction
                        )
                          return ele.label;
                      })}
                      // onChange={(e) => {
                      //   setCurrntlySelectedSubButton({
                      //     value: e.value,
                      //   });
                      // }}
                    />
                    <div>
                      <InputField
                        placeholder="Button text..."
                        // value={currntlySelectedSubButton?.value}
                        className={
                          "bg-slate-100 w-[72%] h-[85%] p-3 mt-1 ml-14 text-[12px] pb-5"
                        }
                        showCount={false}
                      />
                    </div>
                    <div>
                      <InputField
                        placeholder="Button text..."
                        // value={currntlySelectedSubButton?.value}
                        className={
                          "bg-slate-100 w-[72%] h-[85%] p-3 mt-1 ml-14 text-[12px] pb-5"
                        }
                        showCount={false}
                      />
                    </div>
                  </div>
                );
              }
            })
          : null} */}

        {/* Buttons Sections---------------------------------------------------- */}
        {/* {optionalButtonValue?.value === OptionButton[0].value ? (
          <div className="flex">
            <div className="w-[85%]">
              <div className="flex pt-5">
                <div className="mt-2">
                  <div className="w-full flex">
                    <SelectOptionButton
                      options={CallActionSubButton1}
                      className={colourStyles}
                      placeholder="None"
                      selectedValue={CallActionSubButton1.filter((ele) => {
                        if (
                          ele.value === selectedRowData.Buttons[0].typeOfAction
                        )
                          return ele.label;
                      })}
                      onChange={(e) => {
                        setCurrntlySelectedSubButton({
                          value: e.value,
                        });
                      }}
                    />
                    <div>
                      <InputField
                        placeholder="Button text..."
                        value={currntlySelectedSubButton?.value}
                        className={
                          "bg-slate-100 w-[72%] h-[85%] p-3 mt-1 ml-14 text-[12px] pb-5"
                        }
                        showCount={false}
                      />
                    </div>
                  </div>

                  {currntlySelectedSubButton?.value ===
                  CallActionSubButton1[0].value ? (
                    <div className="-top-[2.5rem] h-full ml-96 relative">
                      <InputField
                        placeholder="Phone Number with Contry Code"
                        value={selectedRowData.Buttons[0]?.phoneNumber}
                        className={"bg-slate-100 w-[100%] h-[50%] text-[12px]"}
                        showCount={false}
                      />
                    </div>
                  ) : (
                    <>
                      <div>
                        <div className="flex mt-5">
                          <div className="mt-2">
                            <SelectOptionButton
                              options={CallActionSubButton2}
                              className={colourStyles}
                              placeholder="None"
                              selectedValue={CallActionSubButton2.filter(
                                (ele) => {
                                  if (
                                    ele.value ===
                                    selectedRowData.Buttons[0].urlType
                                  )
                                    return ele.label;
                                }
                              )}
                              onChange={(e) => {
                                setStaticDynamicButton({
                                  value: e.value,
                                });
                              }}
                            />
                          </div>
                          <div>
                            <InputField
                              placeholder="http://www.xyz.com"
                              value={selectedRowData.Buttons[0]?.websiteUrl}
                              className={
                                "bg-slate-100 w-[72%] h-[75%] p-3 mt-3 ml-14 text-[12px]"
                              }
                              showCount={false}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="float-right -mt-8">
              <SecondaryButton text="Add Button" />
            </div>
          </div>
        ) : null} */}
        {/* {currentlySelectedOption?.value === OptionButton[1].value ? (
          <div className="w-1/2">
            <InputField
              placeholder="Button text.."
              className={"bg-slate-100 w-80%] p-2  mt-7"}
            />
          </div>
        ) : null} */}
      </div>
    </div>
  );
};
