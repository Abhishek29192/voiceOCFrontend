import React, { useEffect, useState } from "react";
import {
  Base1Strong,
  Base2,
  Paragraph1,
  Paragraph3,
} from "../../components/Typography";
import { optionSort } from "../../constants/DropDownContent";
import { ApprovedButton, PrimaryButton } from "../../components/Button";
import { IoSearchOutline } from "react-icons/io5";
import { InputFieldWithoutCounter } from "../../components/InputField";
import { SelectOptionButton } from "../../components/SelectOptions";
import { FaFilter } from "react-icons/fa";
import { TfiImport, TfiExport } from "react-icons/tfi";
import { RxCopy } from "react-icons/rx";
import { RiDeleteBin5Line } from "react-icons/ri";
import { HiOutlineEye } from "react-icons/hi";
import Navbar from "../../components/Navbar";
import BroadcastOptions from "../../components/BroadcastOptions";
import BasicTable from "../../components/Table";
import CustomModal from "../../components/Modal";
import newTemplateBlue from "../../components/Images/newTemplateBlue.svg";
import templateOption from "../../components/Images/storedTemplate.svg";
import styles from "./TemplateMessage.module.css";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import { useTemplateData } from "../../hooks/useQueryApi";
import moment from "moment";
import { CreateTemplatePopup } from "../../components/CreateTemplatePopup";
import { useAppCommonDataProvider } from "../../components/AppCommonDataProvider/AppCommonDataProvider";

export const TemplateMessage = () => {
  const { isLoading, refetch } = useTemplateData();
  const [templateData, setTemplateData] = useState(null);
  const { setCreateTemplateValues, setSelectedRowData } =
    useAppCommonDataProvider();
  const [open, setOpen] = useState(false);
  const [createTemplate, setCreateNewTemplate] = useState(false);
  const [viewTemplate, setViewTemplate] = useState(false);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    refetch().then((res) => {
      if (res.isError === false) createData(res.data?.data);
      setTemplateData(res?.data.data);
    });
  }, []);

  // console.log(templateData, "template data");

  const handleNewTemplate = () => {
    setOpen(!open);
  };

  const handleCreateNewTemplate = () => {
    setCreateNewTemplate(!createTemplate);
    // setOpen(!open);
  };

  function createData(data) {
    const rows =
      data &&
      data?.map((entry, index) => ({
        templateName: entry?.template_name,
        category: entry?.Category,
        status: entry?.status ? (
          <ApprovedButton text={"Approved"} className="text-sm font-semibold" />
        ) : null,
        language: entry?.Langauge,
        lastUpdated: moment(`${entry.updatedAt}`).utc().format("YYYY-MM-DD"),
        action: (
          <div className="flex">
            <div
              className={`${styles.template_btn}`}
              onClick={() => {
                console.log(entry);
                setTimeout(() => {
                  setViewTemplate(true);
                }, 200);
                setCreateTemplateValues({
                  templateName: entry?.template_name,
                  category: entry?.Category,
                  language: entry?.Language,
                  header: entry?.headerOption,
                  body: entry?.Body,
                  footer: entry?.Footer,
                  optionalButtonValue: entry?.ButtonType,
                  ctaButtons: entry?.Buttons,
                  ctaButtonLabels: entry?.Buttons.map((e) => e.typeOfAction),
                  footer: entry?.Footer,
                });
                setSelectedRowData?.(entry);
              }}>
              <RxCopy size={"1.2rem"} />
            </div>
            <div className={`ml-4  ${styles.template_btn}`}>
              <HiOutlineEye size={"1.2rem"} />
            </div>
            <div className="ml-4">
              <RiDeleteBin5Line size={"1.2rem"} />
            </div>
          </div>
        ),
      }));
    setTableData(rows);
    return rows;
  }

  const headCells = [
    {
      id: "templateName",
      numeric: false,
      disablePadding: false,
      label: "Template Name",
    },
    {
      id: "category",
      numeric: true,
      disablePadding: false,
      label: "Category",
    },
    {
      id: "status",
      numeric: true,
      disablePadding: false,
      label: "Status",
    },
    {
      id: "language",
      numeric: true,
      disablePadding: false,
      label: "Language",
    },
    {
      id: "lastUpdated",
      numeric: true,
      disablePadding: false,
      label: "Last Updated",
    },
    {
      id: "action",
      numeric: true,
      disablePadding: false,
      label: "Action",
    },
  ];

  function EnhancedTableHead(props) {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          {/* <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            />
          </TableCell> */}
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "center" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}>
              <TableSortLabel
                active={orderBy === headCell.id}
                // sx={{ border: "1px solid red", alignItems: "left" }}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}>
                <b>{headCell.label}</b>
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  const colourStyles = {
    control: (styles) => {
      return {
        ...styles,
        backgroundColor: "white",
        width: "7.6rem",
        height: "2.7rem",
        boxShadow: "none",
        fontSize: "12px",
        fontFamily: "poppins",
        marginTop: "2px",
        // border: "1px solid #5536db",
        // "&:hover": {
        //   border: "1px solid #5536db",
        // },
      };
    },
    option: (styles, { data, isDisabled }) => {
      return {
        ...styles,
        backgroundColor: isDisabled ? "red" : "white",
        color: "#000",
        width: "7rem",
        fontSize: "12px",
        fontFamily: "poppins",
        cursor: isDisabled ? "not-allowed" : "pointer",
      };
    },
  };

  return (
    <>
      <div className="">
        <Navbar />
        <div className=" xl:flex ">
          {/* <div className=""> */}
          <BroadcastOptions />
          {/* </div> */}
          <div className={styles.Brodcast_section}>
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center">
                <Base2 className={styles.sort__text}>Sorted By :</Base2>
                <div className="h-12 ml-2 ">
                  <SelectOptionButton
                    className={colourStyles}
                    options={optionSort}
                  />
                </div>
                <div className={styles.input__container}>
                  <InputFieldWithoutCounter
                    type={'text'}
                    placeholder="Search ..."
                    className={"h-11"}
                  />
                  <IoSearchOutline
                    className="absolute top-[0.65rem] right-2"
                    size={"1.6rem"}
                  />
                </div>
                <button className={styles.filter__icon}>
                  <FaFilter
                    size={"1.2rem"}
                    color={"white"}
                    className={styles.filter}
                  />
                </button>
                <div className={styles.import_export_icon}>
                  <div className={styles.import_border}>
                    <TfiImport />
                  </div>
                  <div className="p-3">
                    <TfiExport />
                  </div>
                </div>
              </div>
              <PrimaryButton
                text="New Template Message"
                onClick={handleNewTemplate}
              />
            </div>
            <div className="mt-8">
              {isLoading ? (
                <h2 className="poppins justify-center items-center">
                  Loading...
                </h2>
              ) : (
                <BasicTable
                  tableContent="templateMessage"
                  // rows={createData(data?.data)}
                  rows={tableData}
                  EnhancedTableHead={EnhancedTableHead}
                />
              )}
            </div>
          </div>
        </div>

        {open && (
          <CustomModal
            open={open}
            onClose={() => setOpen(false)}
            showCloseIcon={true}>
            <div>
              <div>
                <Base1Strong className="mr-96">Create New Template</Base1Strong>
              </div>
              <div className="flex">
                <div
                  className={styles.template_section1}
                  // onClick={handleCreateNewTemplate}
                >
                  <img
                    src={newTemplateBlue}
                    className={styles.template__images}
                  />
                  <Paragraph1>Start From Scratch</Paragraph1>
                  <Paragraph3 className="pt-3 poppins pb-3">
                    Start from a blank template
                  </Paragraph3>
                </div>
                <div className={styles.template_section1}>
                  <img
                    src={templateOption}
                    className={styles.template__images}
                  />
                  <Paragraph1>Use A Template</Paragraph1>
                  <Paragraph3 className="pt-3 poppins">
                    Use one of our pre-defined templates and edit them
                  </Paragraph3>
                </div>
              </div>
            </div>
          </CustomModal>
        )}

        {/* {createTemplate && (
          <CustomModal
            open={createTemplate}
            onClose={() => setCreateNewTemplate(false)}
            showCloseIcon={true}
            classNames={{ modal: `${styles.customModal}` }}>
            <div className="items-center h-full pb-3 ">
              <Base1Strong className="items-center">
                Create template message
              </Base1Strong>
            </div>
            <div className="flex border">
              <div className="w-full">
                <div className="w-full flex p-3">
                  <div className=" w-full p-2">
                    <Paragraph3 className="pb-2 text-sm">
                      Template Name
                    </Paragraph3>
                    <InputField
                      className={
                        " bg-slate-100 w-full border border-#5b3ddc-500 text-[12px] p-2 h-[2.4rem]"
                      }
                      placeholder="Template Name"
                    />
                  </div>
                  <div className=" w-full p-2">
                    <Paragraph3 className="pb-2">Category</Paragraph3>
                    <SelectOptionBUtton
                      options={optionCategoary.filter(
                        (ele) => ele.value !== category
                      )}
                      className={colourStyles1}
                      placeholder="Category"
                      setCurrentlySelectedOption={setCategory}
                    />
                  </div>
                  <div className="w-full p-2">
                    <Paragraph3 className="pb-2">Language</Paragraph3>
                    <SelectOptionBUtton
                      options={optionLanguage.filter(
                        (ele) => ele.value !== language
                      )}
                      className={colourStyles1}
                      placeholder="Language"
                      setCurrentlySelectedOption={setLanguage}
                    />
                  </div>
                </div>
                <hr />
                <div className="w-full p-3">
                  <Paragraph3 className="p-2">Header (Optional)</Paragraph3>
                  <Caption1 className="p-2">
                    Add a title or choose which type of media you'll use for
                    this header.
                  </Caption1>
                  <Caption1 className="p-2">
                    Your title can't include more than one variable.
                  </Caption1>
                  <div className="p-2">
                    <SelectOptionBUtton
                      options={optionSortHeader.filter(
                        (ele) => ele.value !== headerOption
                      )}
                      className={colourStyles}
                      placeholder="None"
                      setCurrentlySelectedOption={setHeaderOption}
                    />
                    {headerOption === optionSortHeader[1].value ? (
                      <InputField
                        placeholder="Enter Text"
                        className={"bg-slate-100 w-[98%] mt-4 text-[12px]"}
                      />
                    ) : (
                      ""
                    )}
                    {headerOption === optionSortHeader[2].value ? (
                      <div>
                        <div className="mt-2 flex">
                          <div className="flex poppins ml-1 ">
                            <input type="radio" name="radioOption" />
                            <Paragraph3 className="pl-2">Images</Paragraph3>
                          </div>
                          <div className="flex poppins ml-4">
                            <input type="radio" name="radioOption" />
                            <Paragraph3 className="pl-2">Video</Paragraph3>
                          </div>
                          <div className="flex poppins ml-4">
                            <input type="radio" name="radioOption" />
                            <Paragraph3 className="pl-2">Document</Paragraph3>
                          </div>
                        </div>
                        <div className="flex items-center mt-4">
                          <InputField
                            placeholder="Enter Url..."
                            className={"bg-slate-100 w-[65%]"}
                          />
                          <Paragraph1 className="items-center justify-center ml-5">
                            or
                          </Paragraph1>
                          <div className="ml-5">
                            <SecondaryButton
                              text="Upload Media"
                              className={colourStyles}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <hr className="w-full" />
                <div className="p-3">
                  <Paragraph3 className="p-2">Body</Paragraph3>
                  <Caption1 className="p-2">
                    To add a custom variable, please add a variable in double
                    curly brackets without a space.
                  </Caption1>
                  <div className="p-2">
                    <SecondaryButton
                      text="Add Variables"
                      onClick={() => {
                        console.log("hfg");
                      }}
                    />
                  </div>
                  <div>
                    <InputTextArea
                      placeholder="Template Message..."
                      className={" h-24 m-2 p-2 text-[12px]"}
                    />
                  </div>
                  <hr />
                  <div>
                    <Paragraph3 className="p-2 pt-4">
                      Footer (Optional)
                    </Paragraph3>
                    <Caption1 className="p-2">
                      Add a short line of text to the bottom of your message
                      template.
                    </Caption1>
                    <InputField
                      placeholder="Enter text.."
                      className={
                        "bg-slate-100 w-[97%] p-4 m-2 text-[12px] mb-5 "
                      }
                      showCount={true}
                    />
                  </div>
                  <hr />
                  <div>
                    <Paragraph3 className="p-2 pt-4">
                      Buttons (Optional)
                    </Paragraph3>
                    <Caption1 className="p-2">
                      Create buttons that let customers respond to your message
                      or take action.
                    </Caption1>
                    <div className="p-2">
                      <SelectOptionBUtton
                        options={OptionButton.filter(
                          (btn) => btn.value !== currentlySelectedOption
                        )}
                        className={colourStyles}
                        placeholder="None"
                        setCurrentlySelectedOption={setCurrentlySelectedOption}
                      />
                      {currentlySelectedOption === OptionButton[0].value ? (
                        <div>
                          <div className="flex pt-9">
                            <div className="mt-2">
                              <SelectOptionBUtton
                                options={OptionButton}
                                className={colourStyles}
                                placeholder="None"
                              />
                            </div>
                            <div>
                              <InputField
                                placeholder="Button text.."
                                className={
                                  "bg-slate-100 w-[72%] h-[70%] p-2 mt-3 ml-24 text-[12px]"
                                }
                                showCount={false}
                              />
                            </div>
                          </div>
                          <div className="flex mt-5">
                            <div className="mt-2">
                              <SelectOptionBUtton
                                options={OptionButton}
                                className={colourStyles}
                                placeholder="None"
                              />
                            </div>
                            <div>
                              <InputField
                                placeholder="Enter text.."
                                className={
                                  "bg-slate-100 w-[72%] h-[70%] p-2 mt-3 ml-24 text-[12px]"
                                }
                                showCount={false}
                              />
                            </div>
                          </div>
                          <div className="float-right m-2">
                            <SecondaryButton text="Add Button" />
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      {currentlySelectedOption === OptionButton[1].value ? (
                        <div className="w-1/2">
                          <InputField
                            placeholder="Button text.."
                            className={"bg-slate-100 w-[94%] p-2 m-1 mt-2"}
                            showCount={true}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
             
            </div>
            <div className="float-right flex m-2">
              <div className="mr-4 ">
                <SecondaryButton
                  text="Save as draft"
                  className="h-full w-full"
                />
              </div>
              <div>
                <PrimaryButton text="Save and Submit" />
              </div>
            </div>
          </CustomModal>
        )}  */}

        {viewTemplate && (
          <CreateTemplatePopup
            isOpen={viewTemplate}
            onClose={() => setViewTemplate(false)}
            className={`${styles.customModal}`}
          />
        )}
      </div>
    </>
  );
};
