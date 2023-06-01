import React, { useEffect, useState } from "react";
import moment from "moment";
import Modal from "react-responsive-modal";
import {
  ApprovedButton,
  PrimaryButton,
  SecondaryButton,
} from "../../../components/Button";
import { Base1Strong, Paragraph3 } from "../../../components/Typography";
import {
  useBroadcastHistoryTabelData,
  useContactDataToClient,
  usePostBordcastData,
  usePostBroadcastDataWithDateTime,
} from "../../../hooks/useQueryApi";
import ContactTable from "../../../components/Table/contactTable";
import { useAppCommonDataProvider } from "../../../components/AppCommonDataProvider/AppCommonDataProvider";
import { DatePickers } from "../../../components/datePicker";
import { TimePickers } from "../../../components/TimePicker/TimePicker";
import { OpenAttributePopUp } from "./OpenAttributePopUp";
import styles from "./BroadcastHistory.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const OpenBroadcastTabelView = ({
  isOpen,
  onClose,
  className,
  classes,
  setBroadcastHistoryTabelData,
  setNewBroadcastPopup1,
}) => {

  const [selectionModel, setSelectionModel] = useState();
  const [selectedTabelRow, setSelectedTabelRow] = useState("");
  const [tableData, setTableData] = useState([]);
  const { refetch } = useContactDataToClient();
  const [data, setData] = useState([]);
  const [chooseAttributes, setChooseAttributes] = useState(false);
  const [openDateTimeField, setOpenDateTimeField] = useState(false);
  const [showToastFlag, setShowToastFlag] = useState(false);
  const [timePicked, setTimePicked] = useState(moment.utc().format("HH:mm"));
  const [datePicked, setDatePicked] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const { setCreateContactDetails, createContactDetails, attributesData, selectedContactRowData } =
    useAppCommonDataProvider();
  const { refetch: getBroadcastStatus } = useBroadcastHistoryTabelData();

  const { brodcastSelectedRowData, broadcastName, fileName, imageSelected } =
    createContactDetails;

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const { mutateAsync } = usePostBordcastData();
  const { mutateAsync: scheduleBroadcast } = usePostBroadcastDataWithDateTime();


  const formdata = new FormData()
  formdata.append("file", imageSelected)
  formdata.set("templateName", fileName)
  formdata.set("broadCastName", broadcastName)
  formdata.set("contactList", JSON.stringify(brodcastSelectedRowData))
  formdata.set("time", timePicked)
  formdata.set("date", datePicked)
  formdata.set("UserId", "one")
  formdata.set("timezone", timezone)
  formdata.set("customAttribute", JSON.stringify(attributesData))

  const newBroadcastDetails = {
    broadCastName: broadcastName,
    templateName: fileName,
    // image: imageSelected,
    contactList: JSON.stringify(brodcastSelectedRowData),
    time: timePicked,
    date: datePicked,
    UserId: "one",
    timezone: timezone,
    customAttribute: JSON.stringify(attributesData),
  };

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
    setSelectionModel(ids)
    const selectedRowData = tableData.filter((row) => {
      return row.id == ids[0];
    });
    setSelectedTabelRow(selectedRowData);
    setCreateContactDetails({
      ...createContactDetails,
      brodcastSelectedRowData: selectedRowData,
    });
    if (ids.length > 0) setChooseAttributes(!chooseAttributes)
  };

  const showToast = (ele) => {
    console.log(ele, "/////////")
    if (ele === "fail") {
      toast.error(`Date,time or contact list selection is empty`, {
        autoClose: 1500,
        closeOnClick: true,
        position: "top-right",
      });
    } else {
      toast.success(" Broadcast successful!!! ", {
        autoClose: 1500,
        closeOnClick: true,
        position: "top-right",
      });
    }
  }


  const handleSubmitModal = async (e) => {
    if ((showToastFlag === "false" || showToastFlag === false) || brodcastSelectedRowData.length === 0) {
      console.log("6835")
      showToast("fail")
    } else {
      if (!openDateTimeField) {
        await mutateAsync((imageSelected) ? formdata : newBroadcastDetails);
        getBroadcastStatus()
          .then((res) => {
            setBroadcastHistoryTabelData(res?.data?.data);
          })
          .catch((err) => console.log(err));
        showToast("success")
        setCreateContactDetails({
          ...createContactDetails,
          brodcastSelectedRowData: [],
        });
        setTimeout(() => {
          onClose();
        }, 1000);
      } else {
        scheduleBroadcast(newBroadcastDetails);
        showToast("success")
        setCreateContactDetails({
          ...createContactDetails,
          brodcastSelectedRowData: [],
        });
        setTimeout(() => {
          onClose();
        }, 1000);
      }
    }
  };

  const handleBackButton = () => {
    onClose(true);
    setNewBroadcastPopup1(true)
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
    <>
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
              disableMultipleRowSelection={true}
              selectionModel={selectionModel}
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
                onClick={() => { setOpenDateTimeField(false); setShowToastFlag(true) }}
              />
              <Paragraph3 className="items-center font-normal poppins pl-4">
                Send it now
              </Paragraph3>
            </div>
            <div className="flex m-3">
              <input
                type="radio"
                name="radioOption"
                onClick={() => { setOpenDateTimeField(true); setShowToastFlag(true) }}
              />
              <Paragraph3 className="items-center font-normal poppins pl-4" >
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
                    <DatePickers minDate={Date.now()} date={datePicked} setDatePicked={setDatePicked} label={"schedule date"} />
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
                onClick={handleBackButton}
              />
            </div>
            <div className="w-32 border">
              <PrimaryButton
                text="Broadcast"
                className="p-6 w-full"
                // disabled={!showToastFlag}
                onClick={(e) => handleSubmitModal(e)}
              />
              <ToastContainer theme="light" />
            </div>
          </div>
        </div>
      </Modal>
      {
        chooseAttributes && (

          <OpenAttributePopUp
            isOpen={chooseAttributes}
            onClose={() => setChooseAttributes(false)}
            className={`${styles.customModalAttribute}`}
            selectedTabelRow={selectedTabelRow}
            rowSelection={'single'}
            checkboxSelection
          />
        )
      }

    </>

  );
};
