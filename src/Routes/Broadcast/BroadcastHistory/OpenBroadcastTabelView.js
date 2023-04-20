import React, {useEffect, useState} from "react";
import moment from "moment";
import Modal from "react-responsive-modal";
import {
  ApprovedButton,
  PrimaryButton,
  SecondaryButton,
} from "../../../components/Button";
import {Base1Strong, Paragraph3} from "../../../components/Typography";
import {
  useBroadcastHistoryTabelData,
  useContactDataToClient,
  usePostBordcastData,
  usePostBroadcastDataWithDateTime,
} from "../../../hooks/useQueryApi";
import ContactTable from "../../../components/Table/contactTable";
import {useAppCommonDataProvider} from "../../../components/AppCommonDataProvider/AppCommonDataProvider";
import {DatePickers} from "../../../components/datePicker";
import {TimePickers} from "../../../components/TimePicker/TimePicker";

export const OpenBroadcastTabelView = ({
  isOpen,
  onClose,
  className,
  classes,
  setBroadcastHistoryTabelData,
}) => {
  const [selectedTabelRow, setSelectedTabelRow] = useState("");
  const [tableData, setTableData] = useState([]);
  const {refetch} = useContactDataToClient();
  const [data, setData] = useState([]);
  const [openDateTimeField, setOpenDateTimeField] = useState(false);
  const [timePicked, setTimePicked] = useState(moment.utc().format("HH:mm"));
  const [datePicked, setDatePicked] = useState(
    moment.utc().format("DD-MM-YYYY")
  );

  const {setCreateContactDetails, createContactDetails} =
    useAppCommonDataProvider();
  const {refetch: getBroadcastStatus} = useBroadcastHistoryTabelData();

  const {brodcastSelectedRowData, broadcastName, fileName, excelSelected} =
    createContactDetails;

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const newBroadcastDetails = {
    broadCastName: broadcastName,
    templateName: fileName,
    excelSheetName: excelSelected,
    contactList: brodcastSelectedRowData,
    time: timePicked,
    date: datePicked,
    UserId: "one",
    timezone: timezone,
  };

  const {mutateAsync} = usePostBordcastData();
  const {mutateAsync: scheduleBroadcast} = usePostBroadcastDataWithDateTime();

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
        id: ele.ContactList._id,
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

  const handleSubmitModal = async (e) => {
    if (!openDateTimeField) {
      await mutateAsync(newBroadcastDetails);
      getBroadcastStatus()
        .then((res) => {
          setBroadcastHistoryTabelData(res?.data?.data);
          console.log(res?.data?.data, "dataaa");
        })
        .catch((err) => console.log(err));
    } else {
      scheduleBroadcast(newBroadcastDetails);
    }
    onClose();
  };

  const handleBackButton = (e) => {
    onClose(true);
  };

  const bg = {
    overlay: {
      backgroundColor: "rgba(0,0,0,0)",
    },
    modal: {
      height: "770px",
    },
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      showCloseIcon
      center
      styles={bg}
      classNames={{modal: `${className} ${classes}`}}
    >
      <div>
        <div className="items-center h-full pb-3 ">
          <Base1Strong className="items-center">New BroadCast</Base1Strong>
        </div>
        <hr />
        <div className="flex mt-4 items-center">
          <ContactTable
            tableContent="broadcastData" // rows={createData(data?.data)}
            rows={tableData}
            columns={columns}
            rowHeight={140}
            onSelectionModelChange={onSelectionModelChange}
            checkboxSelection
          />
        </div>
        <div className="mt-4">
          <Paragraph3 className="items-center font-extrabold poppins">
            When to call
          </Paragraph3>
          <div className="flex m-3">
            <input
              type="radio"
              name="radioOption"
              onClick={() => setOpenDateTimeField(false)}
            />
            <Paragraph3 className="items-center font-normal poppins pl-4">
              Send it now
            </Paragraph3>
          </div>
          <div className="flex m-3">
            <input
              type="radio"
              name="radioOption"
              onClick={() => setOpenDateTimeField(true)}
            />
            <Paragraph3 className="items-center font-normal poppins pl-4">
              Schedule for a specific time
            </Paragraph3>
          </div>
          {openDateTimeField && (
            <div className="flex">
              <div className="flex flex-col w-1/3">
                <Paragraph3 className="items-center font-normal poppins pl-4">
                  Date
                </Paragraph3>
                <div className="  m-2 ">
                  <DatePickers date={setDatePicked} />
                </div>
              </div>
              <div className="flex flex-col w-1/3">
                <Paragraph3 className="items-center font-normal poppins pl-4">
                  Time
                </Paragraph3>
                <div className="m-2 ">
                  <TimePickers time={setTimePicked} />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="float-right flex m-2 mt-[1rem] mb-4">
          <div className="mr-2 w-32">
            <SecondaryButton
              text="Back"
              className={"h-full p-6 w-32"}
              onClick={(e) => handleBackButton(e)}
            />
          </div>
          <div className="w-32 border">
            <PrimaryButton
              text="Next"
              className="p-6 w-full"
              onClick={(e) => handleSubmitModal(e)}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
