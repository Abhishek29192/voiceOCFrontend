import React from "react";
import Modal from "react-responsive-modal";
import ContactTable from "../../components/Table/contactTable";
import {Base2Strong} from "../../components/Typography";

export const ExcelPopUp = ({
  isOpen,
  onClose,
  className,
  onChange,
  fileName,
  handleSubmitFile,
  selectedContactExcel,
}) => {
  const rows = selectedContactExcel?.map((e, index) => ({
    id: index,
    mobileNumber: e["PHONE"],
    name: e["%VAR1"],
  }));

  const columns = [
    {
      field: "name",
      // headerName: 'Last name',
      renderHeader: (params) => (
        <p className="text-lg font-bold ml-5">Contact Name</p>
      ),
      width: 350,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "mobileNumber",
      renderHeader: (params) => (
        <p className="text-lg font-bold">Mobile Number</p>
      ),
      width: 350,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
  ];

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      showCloseIcon
      center
      classNames={{modal: className}}
    >
      <>
        <div className="flex justify-center">
          <Base2Strong className="flex text-3xl">Contcat Details</Base2Strong>
        </div>
      </>
      <ContactTable
        tableContent="excelData"
        rows={rows}
        getRowId={(row) => row.index}
        columns={columns}
        rowHeight={100}
        // checkboxSelection={"none"}
        // onSelectionModelChange={onSelectionModelChange}
      />
    </Modal>
  );
};
