import React, { createContext, useContext, useState } from "react";

export const AppCommonDataContext = createContext({
  userDetails: null,
  setUserDetails: null,

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

  createTeamInboxDetails: {
    whatsappNumber: "",
    contactDetailData: [],
    contactDetailDataName: "",
    // chatId: id,
  },

  createSampleData: {
    contentOne: "",
    contentTwo: "",
    headerText: "",
    mediaUpload: "",
  },

  allChat: {
    chatDataAll: [],
  },

  setAllChat: null,
  setCreateTeamInboxDetails: null,
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
  });
  const [allChat, setAllChat] = useState({
    chatDataAll: [],
  });
  const [createTeamInboxDetails, setCreateTeamInboxDetails] = useState({
    whatsappNumber: "",
    contactDetailData: [],
    contactDetailDataName: "",
  });

  const [selectedRowData, setSelectedRowData] = useState(null);
  const [selectedContactRowData, setSelectedContactRowData] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  return (
    <AppCommonDataContext.Provider
      value={{
        createTeamInboxDetails,
        setCreateTeamInboxDetails,
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
        allChat,
        setAllChat,
        userDetails,
        setUserDetails,
      }}
    >
      {children}
    </AppCommonDataContext.Provider>
  );
};

export const useAppCommonDataProvider = () => useContext(AppCommonDataContext);
