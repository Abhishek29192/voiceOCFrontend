import React, { useState } from "react";
import {
  Base1Strong,
  Base2,
  Caption1,
  Paragraph1,
  Paragraph3,
} from "../../components/Typography";
import {
  optionSortHeader,
  OptionButton,
  optionCategoary,
  optionLanguage,
  optionSort,
} from "../../constants/DropDownContent";
import { PrimaryButton, SecondaryButton } from "../../components/Button";
import { IoSearchOutline } from "react-icons/io5";
import { InputField, InputTextArea } from "../../components/InputField";
import { SelectOptionBUtton } from "../../components/SelectOptions";
import { FaFilter } from "react-icons/fa";
import { TfiImport, TfiExport } from "react-icons/tfi";
import Navbar from "../../components/Navbar";
import BroadcastOptions from "../../components/BroadcastOptions";
import BasicTable from "../../components/Table";
import CustomModal from "../../components/Modal";
import newTemplateBlue from "../../components/Images/newTemplateBlue.svg";
import templateOption from "../../components/Images/storedTemplate.svg";
import styles from "./TemplateMessage.module.css";
// import { TemplateData } from "../../hook/Query";
// //////////////////////////////////
// import PropTypes from "prop-types";
// import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Paper from "@mui/material/Paper";
// import Checkbox from "@mui/material/Checkbox";
// import IconButton from "@mui/material/IconButton";
// import Tooltip from "@mui/material/Tooltip";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Switch from "@mui/material/Switch";
// import DeleteIcon from "@mui/icons-material/Delete";
// import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { fetchTempalteMessageData } from "../../api";

////////////////////////////////

export const TemplateMessage = () => {
  const [open, setOpen] = useState(false);
  const [createTemplate, setCreateNewTemplate] = useState(false);
  const [currentlySelectedOption, setCurrentlySelectedOption] = useState("");
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("");
  const [headerOption, setHeaderOption] = useState("");

  const handleNewTemplate = () => {
    setOpen(!open);
  };

  const handleCreateNewTemplate = () => {
    setCreateNewTemplate(!createTemplate);
    setOpen(!open);
  };

  const result = fetchTempalteMessageData();
  console.log(result.data, "fggjgmb");

  ////////////////////////////////////////////////////

  function createData(
    templateName,
    category,
    status,
    language,
    lastUpdated,
    action
  ) {
    return {
      templateName,
      category,
      status,
      language,
      lastUpdated,
      action,
    };
  }

  const rows = [
    createData("Cupcake", 2, 3.7, 67, 4.3),
    createData("Donut", 452, 25.0, 51, 4.9),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
    createData("Honeycomb", 408, 3.2, 87, 6.5),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Jelly Bean", 375, 0.0, 94, 0.0),
    createData("KitKat", 518, 26.0, 65, 7.0),
    createData("Lollipop", 392, 0.2, 98, 0.0),
    createData("Marshmallow", 318, 0, 81, 2.0),
    createData("Nougat", 360, 19.0, 9, 37.0),
    createData("Oreo", 437, 18.0, 63, 4.0),
  ];

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

  // EnhancedTableHead.propTypes = {
  //   numSelected: PropTypes.number.isRequired,
  //   onRequestSort: PropTypes.func.isRequired,
  //   onSelectAllClick: PropTypes.func.isRequired,
  //   order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  //   orderBy: PropTypes.string.isRequired,
  //   rowCount: PropTypes.number.isRequired,
  // };

  // function EnhancedTableToolbar(props) {
  //   const { numSelected } = props;

  //   return (
  //     <Toolbar
  //       sx={{
  //         pl: { sm: 2 },
  //         pr: { xs: 1, sm: 1 },
  //         ...(numSelected > 0 && {
  //           bgcolor: (theme) =>
  //             alpha(
  //               theme.palette.primary.main,
  //               theme.palette.action.activatedOpacity
  //             ),
  //         }),
  //       }}>
  //       {numSelected > 0 ? (
  //         <Typography
  //           sx={{ flex: "1 1 100%" }}
  //           color="inherit"
  //           variant="subtitle1"
  //           component="div">
  //           {numSelected} selected
  //         </Typography>
  //       ) : (
  //         <Typography
  //           sx={{ flex: "1 1 100%" }}
  //           variant="h6"
  //           id="tableTitle"
  //           component="div">
  //           Nutrition
  //         </Typography>
  //       )}

  //       {numSelected > 0 ? (
  //         <Tooltip title="Delete">
  //           <IconButton>
  //             <DeleteIcon />
  //           </IconButton>
  //         </Tooltip>
  //       ) : (
  //         <Tooltip title="Filter list">
  //           <IconButton>
  //             <FilterListIcon />
  //           </IconButton>
  //         </Tooltip>
  //       )}
  //     </Toolbar>
  //   );
  // }

  // EnhancedTableToolbar.propTypes = {
  //   numSelected: PropTypes.number.isRequired,
  // };

  //////////////////////////////////////////////////////////////////
  // const { data } = TemplateData();
  // console.log(data, "gfbdv");
  // console.log(data.data, "gfdgfhnhmb");
  // const result = data.data.map((e) => {
  //   console.log(e);
  // });

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

  const colourStyles1 = {
    control: (styles) => {
      return {
        ...styles,
        backgroundColor: "white",
        width: "13rem",
        height: "2.2rem",
        boxShadow: "none",
        fontSize: "12px",
        fontFamily: "poppins",
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
        width: "12rem",
        fontSize: "12px",
        fontFamily: "poppins",
        cursor: isDisabled ? "not-allowed" : "pointer",
      };
    },
  };

  return (
    <>
      <div className="h-screen">
        <Navbar />
        <div className=" xl:flex h-full">
          {/* <div className=""> */}
          <BroadcastOptions />
          {/* </div> */}
          <div className={styles.Brodcast_section}>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center">
                <Base2 className={styles.sort__text}>Sorted By :</Base2>
                <div className="h-12 ml-2 ">
                  <SelectOptionBUtton
                    className={colourStyles}
                    options={optionSort}
                  />
                </div>
                <div className={styles.input__container}>
                  <InputField placeholder="Search ..." className={"h-11"} />
                  <IoSearchOutline
                    className="absolute top-3 right-0"
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
            <div className="mt-20">
              <BasicTable rows={rows} EnhancedTableHead={EnhancedTableHead} />
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
                  onClick={handleCreateNewTemplate}>
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

        {createTemplate && (
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
              <div className="w-2/5 flex p-2 templateViewBackground">
                <div className="flex m-2 bold poppins">Preview</div>
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
        )}
      </div>
    </>
  );
};
