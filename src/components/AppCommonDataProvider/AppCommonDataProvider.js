import React, { createContext, useContext, useState } from "react";

export const AppCommonDataContext = createContext({
  createTemplateValues: {
    templateName: "",
    category: "",
    currentlySelectdOption: "",
    language: "",
    header: "",
    body: "",
    footer: "",
    optionalButtonValue: "",
    ctaButtons: [],
    ctaButtonLabels: [],
    mediaType: "",
  },
  createContactDetails: {
    excelSelected: "",
    brodcastSelectedRowData: [],
    broadcastName: "",
    fileName: "",
    createdAt: "",
    createdDate: "",
    basicInfo: [],
  },
  // createNewBroadcast: {
  //   broadcastName: "",
  //   uploadesmedia: "",
  //   selectedContactData: {},
  //   broadcastTime: "",
  //   broadcastDate: "",
  // },
  createSampleData: {
    contentOne: "",
    contentTwo: "",
    headerText: "",
    mediaUpload: "",
  },
  // setCreateNewBroadcast: null,
  setCreateSampleData: null,
  setCreateContactDetails: null,
  setCreateTemplateValues: null,
  selectedRowData: null,
  setSelectedRowData: null,
  selectedContactRowData: null,
  setSelectedContactRowData: null,
});

export const AppCommonDataProvider = ({ children }) => {
  const [createTemplateValues, setCreateTemplateValues] = useState({
    templateName: "",
    category: "",
    currentlySelectdOption: "",
    language: "",
    header: "",
    body: "",
    footer: "",
    optionalButtonValue: "",
    mediaType: "",
    ctaButtons: [],
    ctaButtonLabels: [],
  });
  const [createContactDetails, setCreateContactDetails] = useState({
    excelSelected: "",
    broadcastName: "",
    brodcastSelectedRowData: [],
    fileName: "",
    createdAt: "",
    createdDate: "",
    basicInfo: [],
    broadcastTime: "",
    broadcastDate: "",
  });
  const [createSampleData, setCreateSampleData] = useState({
    contentOne: "",
    contentTwo: "",
    headerText: "",
    mediaUpload: [],
  })
  // const [createNewBroadcast, setCreateNewBroadcast] = useState({
  //   broadcastName: "",
  //   uploadesmedia: "",
  //   selectedContactData: {},

  // })
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [selectedContactRowData, setSelectedContactRowData] = useState(null);
  return (
    <AppCommonDataContext.Provider
      value={{
        createTemplateValues,
        setCreateTemplateValues,
        createContactDetails,
        setCreateContactDetails,
        selectedRowData,
        setSelectedRowData,
        selectedContactRowData,
        setSelectedContactRowData,
        createSampleData,
        setCreateSampleData,
        // createNewBroadcast,
        // setCreateNewBroadcast,
      }}>
      {children}
    </AppCommonDataContext.Provider>
  );
};

export const useAppCommonDataProvider = () => useContext(AppCommonDataContext);
