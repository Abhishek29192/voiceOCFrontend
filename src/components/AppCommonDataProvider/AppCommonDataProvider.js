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
  },
  createContactDetails: {
    excelSelected: "",
    brodcastSelectedRowData: [],
    templateSelected: "",
    fileName: "",
    createdAt: "",
    createdDate: "",
    basicInfo: [],
  },
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
    ctaButtons: [],
    ctaButtonLabels: [],
  });
  const [createContactDetails, setCreateContactDetails] = useState({
    excelSelected: "",
    templateSelected: "",
    brodcastSelectedRowData: [],
    fileName: "",
    createdAt: "",
    createdDate: "",
    basicInfo: [],
  });
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
      }}>
      {children}
    </AppCommonDataContext.Provider>
  );
};

export const useAppCommonDataProvider = () => useContext(AppCommonDataContext);
