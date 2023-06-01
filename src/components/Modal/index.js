import React from "react";
import {Modal} from "react-responsive-modal";
import "react-responsive-modal/styles.css";

const CustomModal = ({children, classNames, open, onClose, showCloseIcon}) => {
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        center={true}
        // closeIcon={Cancel}
        showCloseIcon={showCloseIcon}
        classNames={classNames}
      >
        {children}
      </Modal>
    </>
  );
};

export default CustomModal;
