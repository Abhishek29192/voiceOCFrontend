import React, { useEffect, useState } from "react";
import Modal from "react-responsive-modal";
import ContactTable from "../../components/Table/contactTable";
import { Base2Strong } from "../../components/Typography";

export const ExcelPopUp = ({
  isOpen,
  onClose,
  className,
  onChange,
  fileName,
  handleSubmitFile,
  selectedContactExcel,
}) => {

  const rows = selectedContactExcel?.contactList?.map((e, index) => (
    {
      id: index,
      ...e
    }
  ));

  const headers = Object.keys(selectedContactExcel?.contactList[0])

  const columns = headers?.map((e, index) => (
    {
      field: e,
      renderHeader: (params) => (
        <p className="text-lg font-bold ml-5">{e}</p>
      ),
      width: 350,
      editable: true,
      align: "center",
      headerAlign: "center",
    }
  ))


  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      showCloseIcon
      center
      classNames={{ modal: className }}
    >
      <>
        <div className="flex justify-center">
          <Base2Strong className="flex text-3xl">Contact Details</Base2Strong>
        </div>
      </>
      <ContactTable
        tableContent="excelData"
        rows={rows}
        getRowId={(row) => row?.index}
        columns={columns}
        rowHeight={100}
      // checkboxSelection={"none"}
      // onSelectionModelChange={onSelectionModelChange}
      />
    </Modal>
  );
};
