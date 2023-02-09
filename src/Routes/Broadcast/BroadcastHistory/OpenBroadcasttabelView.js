import React, { useEffect, useState } from "react";
import moment from "moment";
import Modal from "react-responsive-modal";
import {
  ApprovedButton,
  PrimaryButton,
  SecondaryButton,
} from "../../../components/Button";
import { Base1Strong } from "../../../components/Typography";
import {
  useContactDataToClient,
  usePostBordcastData,
} from "../../../hooks/useQueryApi";
import ContactTable from "../../../components/Table/contactTable";
import { useAppCommonDataProvider } from "../../../components/AppCommonDataProvider/AppCommonDataProvider";

export const OpenBroadcastTabelView = ({
  isOpen,
  onClose,
  className,
  classes,
}) => {
  const [selectedTabelRow, setSelectedTabelRow] = React.useState("");
  const [tableData, setTableData] = useState([]);
  const { isLoading, refetch } = useContactDataToClient();
  const [data, setData] = useState([]);

  const { setCreateContactDetails, createContactDetails } =
    useAppCommonDataProvider();

  // const { brodcastSelectedRowData } = createContactDetails;
  // console.log(brodcastSelectedRowData, "------------");

  useEffect(() => {
    refetch().then((res) => {
      if (res.isError === false) {
        setData(res.data.data.contactList);
      }
    });
  }, []);

  useEffect(() => {
    if (data) {
      const rows = data.map((ele, index) => ({
        id: index,
        basicInfo: ele?.ContactList.fileName,
        customAttributes: ele?.ContactList.customAttributes,
        createdDate: moment(`${ele?.ContactList.createdAt}`)
          .utc()
          .format("YYYY-MM-DD"),
      }));
      setTableData(rows);
    }
  }, [data]);

  const columns = [
    {
      field: "basicInfo",
      headerName: "Basic Info",
      width: 150,
    },
    {
      field: "customAttributes",
      headerName: "Custom Attribute",
      width: 400,
      renderCell: (params) => {
        return (
          <div className="flex flex-wrap">
            {params.row.customAttributes.map((name) => {
              return (
                <ApprovedButton
                  text={`${name}`}
                  className="flex text-[0.6rem]  m-2 font-semibold border flex-wrap"
                />
              );
            })}
          </div>
        );
      },
    },
    {
      field: "createdDate",
      headerName: "Created Date",
      width: 100,
    },
  ];

  const onSelectionModelChange = (ids) => {
    const selectedRowData = tableData.filter((row) => {
      return row.id == ids[0];
    });
    setSelectedTabelRow(selectedRowData);
    setCreateContactDetails({
      ...createContactDetails,
      brodcastSelectedRowData: selectedRowData,
    });
  };

  const handleSubmitModal = () => {
    console.log("clicked");
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      showCloseIcon
      center
      classNames={{ modal: `${className} ${classes}` }}>
      <div>
        <div className="items-center h-full pb-3 ">
          <Base1Strong className="items-center">New BroadCast</Base1Strong>
        </div>
        <hr />
        <div className="flex mt-8 items-center">
          <ContactTable
            tableContent="broadcastData" // rows={createData(data?.data)}
            rows={tableData}
            columns={columns}
            rowHeight={140}
            onSelectionModelChange={onSelectionModelChange}
          />
        </div>
        <div className="float-right flex m-2 mt-[2rem]">
          <div className="mr-2 w-32">
            <SecondaryButton
              text="Back"
              className={"h-full p-6 w-32"}
              onClick={onClose}
            />
          </div>
          <div className="w-32 border">
            <PrimaryButton
              text="Next"
              className="p-6 w-full"
              onClick={handleSubmitModal}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
