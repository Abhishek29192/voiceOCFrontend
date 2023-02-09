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
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      showCloseIcon
      center
      classNames={{ modal: className }}>
      <div className="flex flex-col">
        <div className="items-center mr-52 rounded-lg h-full text-xl pb-3 ">
          <Base1Strong className="items-center">Upload File</Base1Strong>
        </div>
        <hr />
        <Paragraph1 className="text-sm p-2">Contact List Name</Paragraph1>
        <InputFieldWithoutCounter
          className={
            " bg-slate-100 w-[98%] border border-#5b3ddc-500 text-[12px] p-2 m-2 h-[2.4rem]"
          }
          placeholder="File Name..."
          type={"text"}
          // value={templateName}
          // onChange={(e) => {
          //   setCreateTemplateValues?.({
          //     ...createTemplateValues,
          //     templateName: e.target.value,
          //   });
          // }}
        />
        <Paragraph1 className="text-sm p-2">Document Type</Paragraph1>
        <div className="p-2">
          <FileUploadbutton onChange={onChange} fileName={fileName} />
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
