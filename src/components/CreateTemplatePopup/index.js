import React from "react";
import Modal from "react-responsive-modal";
import { Base1Strong } from "../Typography";
import { CreateTemplateBasicDetails } from "./CreateTemplateBasicDetails";
import { CreateTemplateButton } from "./CreateTemplateButton";
import { CreateTemplateHeader } from "./CreateTemplateHeader";
import { SampleContent } from "./SampleContent";
import { TemplateFooter } from "./TemplateFooter";
import { TemplateMessageBody } from "./TemplateMessageBody";

export const CreateTemplatePopup = ({ isOpen, onClose, className }) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      showCloseIcon
      classNames={{ modal: className }}>
      <div>
        <div className="items-center h-full w-full pb-3 ">
          <Base1Strong className="items-center">
            Create template message
          </Base1Strong>
        </div>
        <div className="flex w-full">
          <div className="flex border w-2/3">
            <div className="w-full">
              <CreateTemplateBasicDetails />
              <hr />
              <CreateTemplateHeader />
              <hr />
              <TemplateMessageBody />
              <hr />
              <TemplateFooter />
              <hr />
              <CreateTemplateButton />
              <hr />
              <SampleContent />
            </div>
          </div>
          <div className="w-1/3 flex p-2 templateViewBackground">
            <div className="flex m-2 bold poppins">Preview</div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
