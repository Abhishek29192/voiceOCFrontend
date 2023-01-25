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
  setCreateTemplateValues: null,
  selectedRowData: null,
  setSelectedRowData: null,
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
  const [selectedRowData, setSelectedRowData] = useState(null);
  return (
    <AppCommonDataContext.Provider
      value={{
        createTemplateValues,
        setCreateTemplateValues,
        selectedRowData,
        setSelectedRowData,
      }}>
      {children}
    </AppCommonDataContext.Provider>
  );
};

export const useAppCommonDataProvider = () => useContext(AppCommonDataContext);
