import React from "react";
import Modal from "react-responsive-modal";
import { Base1Strong, Paragraph1 } from "../../components/Typography";
import { PrimaryButton } from "../Button";
import { FileUploadbutton, InputFieldWithoutCounter } from "../InputField";

export const AddContactList = ({
  isOpen,
  onClose,
  className,
  onChange,
  fileName,
  handleSubmitFile,
  setContactListName
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      showCloseIcon
      center
      classNames={{ modal: className }}
    >
      <div className="flex flex-col">
        <div className="items-center mr-52 rounded-lg h-full text-xl pb-3 ">
          <Base1Strong className="items-center">Upload File</Base1Strong>
        </div>
        <hr />
        <div className="p-2">
          <Paragraph1 className="text-sm py-2 text font-semibold poppins">
            Contact list Name
          </Paragraph1>
          <InputFieldWithoutCounter
            className={
              " bg-slate-100 w-[95%] border border-#5b3ddc-500 text-[12px] p-2 h-[2.4rem]"
            }
            type={"text"}
            placeholder={"File Name"}
            onChange={(e) => setContactListName(e.target.value, "888888")}
          />
        </div>

        <Paragraph1 className="text-sm p-2">Upload Excel File</Paragraph1>
        <div className="p-2 ">
          <FileUploadbutton
            onChange={onChange}
            fileName={fileName}
            accept={".xlsx, .xls "}
          />
        </div>
        <div className="justify-end flex">
          <PrimaryButton
            text="Submit"
            className="right-0"
            onClick={handleSubmitFile}
          />
        </div>
      </div>
    </Modal>
  );
};
