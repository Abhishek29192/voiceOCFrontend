import React, { useEffect, useState } from "react";
import Modal from "react-responsive-modal";
import { useAppCommonDataProvider } from "../../../components/AppCommonDataProvider/AppCommonDataProvider";
import { PrimaryButton } from "../../../components/Button";
import { InputFieldWithoutCounter } from "../../../components/InputField";
import { SelectOptionButton } from "../../../components/SelectOptions";
import { Base1Strong, Paragraph3 } from "../../../components/Typography";
import { useTemplateData } from "../../../hooks/useQueryApi";
import { UploadMediaFileInBroadcast } from "./UploadMediaFileInBroadcast";
import { OpenBroadcastTabelView } from "./OpenBroadcastTabelView";
import styles from "./BroadcastHistory.module.css";
import { VideoPlayer } from "../../../components/VideoPlayer";
import vid from "../../../components/Videos/vid.mp4";
import documentIMG from "../../../components/Images/docuentIMG.jpeg"
import sampleIMG from "../../../components/Images/sampleIMG.jpeg"


//
export const NewBroadCast = ({ isOpen, onClose, className, ...props }) => {
  const {
    selectedContactRowData,
    setSelectedContactRowData,
    setCreateContactDetails,
    createContactDetails,
  } = useAppCommonDataProvider();

  // setNewBroadcastPopup1 = { setNewBroadcastPopup1 }
  // console.log(props.setNewBroadcastPopup1, "+++++++")
  const [contactData, setContactData] = useState([]);
  const [templateData, setTemplateDate] = useState([]);
  const [openMediaUpload, setOpenMediaUpload] = useState(false);
  const [openBroadcastTable, setOpenBroadcastTable] = useState(false);
  const [broadcastName, setBroadcastName] = useState("");
  const { refetch } = useTemplateData();

  // console.log(selectedContactRowData, "selected row data")

  useEffect(() => {
    refetch().then((res) => {
      if (res.isError === false) {
        setTemplateDate(res?.data?.data);
        setContactData(res?.data.data);
      }
    });
  }, []);

  const templateName1 = templateData?.map((ele) => {
    return {
      label: ele.template_name,
      value: ele.template_name,
    };
  });

  const colourStyles1 = {
    control: (styles) => {
      return {
        ...styles,
        backgroundColor: "white",
        width: "97%",
        height: "2rem",
        boxShadow: "none",
        fontSize: "12px",
        fontFamily: "poppins",
      };
    },
    option: (styles, { data, isDisabled }) => {
      return {
        ...styles,
        backgroundColor: isDisabled ? "red" : "white",
        color: "#000",
        width: "97%",
        // height: "5rem",
        fontSize: "12px",
        fontFamily: "poppins",
        cursor: isDisabled ? "not-allowed" : "pointer",
      };
    },
  };

  const handleNextButton = () => {
    if (selectedContactRowData?.Type === "MEDIA") {
      setOpenMediaUpload(true);
    } else {
      setOpenBroadcastTable(true);
    }
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={onClose}
        showCloseIcon
        center
        classNames={{ modal: className }}
      >
        <div className="items-center pb-3 ">
          <Base1Strong className="items-center mr-38">
            New BroadCast
          </Base1Strong>
        </div>
        <hr />
        <div>
          <div className="flex mt-2">
            <div className=" w-2/3 pt-2">
              <div>
                <Paragraph3 className="text-md mb-3">Broadcast Name</Paragraph3>
                <InputFieldWithoutCounter
                  className={
                    " bg-slate-100 w-[97%] border border-#5b3ddc-500 text-[12px] p-2 h-[2.4rem]"
                  }
                  type={"text"}
                  placeholder="Broadcast Name"
                  onChange={(e) => {
                    setBroadcastName(e.target.value);
                    setCreateContactDetails?.({
                      ...createContactDetails,
                      broadcastName: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="pt-5">
                <Paragraph3 className="text-md mb-3">
                  Select template message
                </Paragraph3>
                <SelectOptionButton
                  options={templateName1.filter((ele) => ele.value)}
                  className={colourStyles1}
                  placeholder="Template Message"
                  selectedValue={contactData.filter((ele, index) => {
                    if (ele?.template_name === createContactDetails.fileName) {
                      setSelectedContactRowData(ele);
                      return ele.label;
                    }
                  })}
                  onChange={(e) => {
                    setCreateContactDetails?.({
                      ...createContactDetails,
                      fileName: e.value,
                    });
                  }}
                />
                <div className="flex w-full mt-[15rem] justify-end">
                  <PrimaryButton
                    text="Next"
                    className={"w-32 mr-4"}
                    onClick={handleNextButton}
                    disabled={
                      !createContactDetails.fileName || !broadcastName
                        ? true
                        : false
                    }
                  />
                </div>
              </div>
            </div>
            <div className="w-1/3 flex flex-col rounded-lg templateViewBackground">
              <div className="flex m-2 bold poppins">Preview</div>
              <div className="items-center w-full flex justify-center">
                <div className="flex flex-col bg-white w-[90%]  rounded-md p-2 pt-4 pb-7 ">
                  <div className="">
                    {
                      selectedContactRowData?.Type === "MEDIA" && (
                        selectedContactRowData?.MediaType === "image" ? (
                          <div>
                            <img src={sampleIMG} />
                          </div>
                        ) : (selectedContactRowData?.MediaType === "video" ? (
                          <VideoPlayer videoUrl={vid} />
                        ) : (
                          <div className="">
                            <object title="document" className="border rounded-lg mb-4 flex justify-center items-center">
                              {/* <HiOutlineDocumentDuplicate size={"1.8rem"} /> */}
                              <img src={documentIMG} className="h-[50%]" />
                            </object>
                          </div>
                        )

                        )
                      )
                    }
                  </div>
                  <div className="font-bold">
                    {selectedContactRowData?.Header}
                  </div>
                  <div className="text-xs flex-wrap">
                    {selectedContactRowData?.Body}
                  </div>
                  <div>{selectedContactRowData?.Footer}</div>
                  <div>{selectedContactRowData?.ButtonType}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal >
      {openMediaUpload && (
        <UploadMediaFileInBroadcast
          isOpen={openMediaUpload}
          onClose={() => {
            setOpenMediaUpload(false);
            onClose();
          }}
          // onClose={() => setOpenMediaUpload(false)}
          className={`${styles.customModal}`}
          classes={"height:'80vh'"}
          setNewBroadcastPopup1={props.setNewBroadcastPopup1}
          setOpenMediaUpload={setOpenMediaUpload}

        />
      )
      }
      {
        openBroadcastTable && (
          <OpenBroadcastTabelView
            isOpen={openBroadcastTable}
            onClose={() => {
              setOpenBroadcastTable(false);
              onClose();
            }}
            // onCloseUploadPopUp={() => setOpenMediaUpload(false)}
            className={`${styles.customModal}`}
            classes={"height:'80vh'"}
            setNewBroadcastPopup1={props.setNewBroadcastPopup1}
            setOpenMediaUpload={setOpenMediaUpload}
            {...props}
          />
        )
      }
    </>
  );
};
