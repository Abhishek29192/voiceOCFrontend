import React, { useEffect, useState } from "react";
import Modal from "react-responsive-modal";
import { useAppCommonDataProvider } from "../../../components/AppCommonDataProvider/AppCommonDataProvider";
import { PrimaryButton } from "../../../components/Button";
import { InputFieldWithoutCounter } from "../../../components/InputField";
import { SelectOptionButton } from "../../../components/SelectOptions";
import { Base1Strong, Paragraph3 } from "../../../components/Typography";
import { useTemplateData } from "../../../hooks/useQueryApi";
import { UploadMediaFileInBroadcast } from "./UploadMediaFileInBroadcast";
import styles from "./BroadcastHistory.module.css";
import { OpenBroadcastTabelView } from "./OpenBroadcasttabelView";

export const NewBroadCast = ({ isOpen, onClose, className }) => {
  const {
    selectedContactRowData,
    setSelectedContactRowData,
    createTemplateValues,
    setCreateContactDetails,
    createContactDetails,
  } = useAppCommonDataProvider();

  const { fileName, templateSelected } = createContactDetails;
  const [contactData, setContactData] = useState([]);
  const [templateData, setTemplateDate] = useState([]);
  const [openMediaUpload, setOpenMediaUpload] = useState(false);
  const [openBroadcastTable, setOpenBroadcastTable] = useState(false);
  const { isLoading, refetch } = useTemplateData();

  useEffect(() => {
    refetch().then((res) => {
      if (res.isError === false) {
        setTemplateDate(res?.data?.data);
        setContactData(res?.data.data);
      }
    });
  }, []);

  const templateName1 = templateData?.map((ele) => {
    return {
      label: ele.template_name,
      value: ele.template_name,
    };
  });

  const [selectedTempName, setSelectedTempName] = useState(true);

  const { templateName } = createTemplateValues;

  const colourStyles1 = {
    control: (styles) => {
      return {
        ...styles,
        backgroundColor: "white",
        width: "31rem",
        height: "2rem",
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
        // height: "5rem",
        fontSize: "12px",
        fontFamily: "poppins",
        cursor: isDisabled ? "not-allowed" : "pointer",
      };
    },
  };

  const handleNextButton = () => {
    if (selectedContactRowData?.Type === "MEDIA") {
      setOpenMediaUpload(true);
    } else {
      setOpenBroadcastTable(true);
    }
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={onClose}
        showCloseIcon
        center
        classNames={{ modal: className }}>
        <div className="items-center h-full pb-3 ">
          <Base1Strong className="items-center mr-38">
            New BroadCast
          </Base1Strong>
        </div>
        <hr />
        <div className="h-['80%vh']">
          <div className="flex mt-2">
            <div className=" w-2/3 pt-2">
              <div className="pt-5">
                <Paragraph3 className="text-md mb-3">Broadcast Name</Paragraph3>
                <InputFieldWithoutCounter
                  className={
                    " bg-slate-100 w-[98%] border border-#5b3ddc-500 text-[12px] p-2 h-[2.4rem]"
                  }
                  type={"text"}
                  placeholder="Untitled_010220231822"
                  // value={templateName}
                  onChange={(e) => {
                    setCreateContactDetails?.({
                      ...createContactDetails,
                      templateSelected: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="pt-5">
                <Paragraph3 className="text-md mb-3">
                  Select template message
                </Paragraph3>
                <SelectOptionButton
                  options={templateName1.filter((ele) => ele.value)}
                  className={colourStyles1}
                  placeholder="Template Message"
                  selectedValue={contactData.filter((ele, index) => {
                    if (ele?.template_name === createContactDetails.fileName) {
                      // console.log(ele, "hhhhhh");
                      // setSelectedTempName(ele.template_name);
                      setSelectedContactRowData(ele);
                      return ele.label;
                    }
                  })}
                  onChange={(e) => {
                    setSelectedTempName(false);
                    setCreateContactDetails?.({
                      ...createContactDetails,
                      fileName: e.value,
                    });
                  }}
                />
                <div className="flex w-full mt-72 justify-end">
                  <PrimaryButton
                    text="Next"
                    className={"w-32 mr-4"}
                    onClick={handleNextButton}
                    disabled={selectedTempName ? true : false}
                  />
                </div>
              </div>
            </div>
            <div className="w-1/3 flex rounded-lg templateViewBackground">
              <div className="flex m-2 bold poppins">Preview</div>
            </div>
          </div>
        </div>
      </Modal>
      {openMediaUpload && (
        <UploadMediaFileInBroadcast
          // mediaType={selectedContactRowData.Type}
          isOpen={openMediaUpload}
          onClose={() => setOpenMediaUpload(false)}
          className={`${styles.customModal}`}
          classes={"h-[610px]"}
        />
      )}
      {openBroadcastTable && (
        <OpenBroadcastTabelView
          isOpen={openBroadcastTable}
          onClose={() => setOpenBroadcastTable(false)}
          className={`${styles.customModal}`}
          classes={"h-[610px]"}
        />
      )}
    </>
  );
};
