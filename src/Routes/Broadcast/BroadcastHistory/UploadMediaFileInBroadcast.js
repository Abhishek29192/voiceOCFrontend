import React, { useState } from "react";
import Modal from "react-responsive-modal";
import { useAppCommonDataProvider } from "../../../components/AppCommonDataProvider/AppCommonDataProvider";
import { PrimaryButton, SecondaryButton } from "../../../components/Button";
import { FileUploadbutton } from "../../../components/InputField";
import { Base1Strong, Paragraph3 } from "../../../components/Typography";
import { OpenBroadcastTabelView } from "./OpenBroadcastTabelView";
import styles from "./BroadcastHistory.module.css";

export const UploadMediaFileInBroadcast = ({
  isOpen,
  onClose,
  className,
  classes,
  setNewBroadcastPopup1,
  setOpenMediaUpload,
}) => {
  const { setCreateContactDetails, createContactDetails } =
    useAppCommonDataProvider();
  const [fileName, setFileName] = useState(null);
  const [openBroadcastTabelView, setOpenBroadcastTabelView] = useState(false);

  const handleFileChange = (e) => {
    setCreateContactDetails({
      ...createContactDetails,
      imageSelected: e.target.files[0],
    });
    setFileName(e.target.files[0].name);
  };

  const bg = {
    overlay: {
      backgroundColor: "rgba(0,0,0,0)",
    },
  };




  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      showCloseIcon
      center
      styles={bg}
      classNames={{ modal: `${className} ${classes}` }}
    >
      <div>
        <div className="items-center h-full pb-3 ">
          <Base1Strong className="items-center mr-48">
            New BroadCast
          </Base1Strong>
        </div>
        <hr />
        <div>
          <Paragraph3 className="text-base m-2 mb-3 mt-7 poppins">
            Use custom media header
          </Paragraph3>
        </div>
        <div className="p-2 mt-10">
          <FileUploadbutton
            accept={"image/*,.doc, .docx,.mp4,.pdf"}
            onChange={(e) => {
              handleFileChange(e);
            }}
            fileName={fileName ? fileName : "Select a file"}
          />
        </div>
        <div className="float-right flex m-2 mb-2 mt-[18rem]">
          <div className="mr-2 w-32">
            <SecondaryButton
              text="Back"
              className={"h-full p-6 w-32"}
              onClick={() => { onClose(); setNewBroadcastPopup1(true) }}
            />
          </div>
          <div className="w-32 border">
            <PrimaryButton
              disabled={!fileName}
              text="Next"
              className="p-6 w-full"
              onClick={() => setOpenBroadcastTabelView(true)}
            />
          </div>
        </div>
      </div>
      {openBroadcastTabelView && (
        <OpenBroadcastTabelView
          isOpen={openBroadcastTabelView}
          onClose={() => {
            setOpenBroadcastTabelView(false);
            onClose();
          }}
          className={`${styles.customModal}`}
          classes={"max-height: 138vh"}
          setOpenMediaUpload={setOpenMediaUpload}
          setNewBroadcastPopup1={setNewBroadcastPopup1}
        />
      )}
    </Modal>
  );
};
