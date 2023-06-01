import axios from "axios";
import cookie from "react-cookies";
import {
  fetcemplateData,
  fetchContacts,
  sendBroadcastDetails,
  fetctokenUrl,
  signUpUrl,
  sendBroadcastDetailsWithDateTime,
  fetchScheduleBroadcast,
  sendTeamInboxData,
  fetchSingleChatdataUrl,
  fetchBroadcastHistoryDataUrl,
  fetchBroadcastHistoryStatusUrl,
  contactOptionsUrl,
  sendVideoUrl,
  exportExcel,
  getContactList,
  agentListUrl,
  selectedAgentUrl,
  removeAgentUrl,
  logoutUrl,
  allChatDataUrl,
  newMessageUrl,
  sendNewMessageTemplate,
  BaseUrl,
  deleteContactList,
  sortBroadcastDataUrl,
  genterateOtpUrl,
  forgotPasswordUrl

} from "../Urls";

const headers = {
  Accept: "application/json",
};

const instance = axios.create({
  baseURL: BaseUrl,
});

instance.interceptors.request.use((config) => {
  config.headers["Authorization"] = `Bearer ${cookie.load("accessToken")}`;
  return config;
});

export const fetchLoginToken = async (data) => {
  const { data: response } = await instance.post(fetctokenUrl, data, {
    headers: { Accept: "application/json" },
  });
  return response;
};

export const fetchSignUpCreds = async (data) => {
  return await instance.post(signUpUrl, data);
};
////sortBroadcastDataUrl
export const sortBroadcastDateRange = async (data) => {
  return await instance.post(sortBroadcastDataUrl, data);
};

export const ForgotpasswordApi = async (data) => {
  return await instance.post(forgotPasswordUrl, data);
};
// deleteContactList

export const deleteContactExcel = async (data) => {
  return await instance.post(deleteContactList, data);
};


export const fetchTempalteMessageData = async () => {
  return await instance.get(fetcemplateData, { headers });
};




export const fetchContactDetailsToClient = async () => {
  return await instance.get(`${fetchContacts}?UserId=one`, { headers });
};

// sendNewMessageTemplate
export const fetchNewMessageTemplate = async (data) => {
  return await instance.post(`${sendNewMessageTemplate}`, data, { headers });
};

export const fetchContactDetailsToServer = async (data) => {
  return await instance.post(fetchContacts, data, { headers });
};

// selectedAgentUrl
export const PostAssignAgent = async (data) => {
  return await instance.post(selectedAgentUrl, data, { headers });
};

//genterateOtpUrl
export const PostOtp = async (data) => {
  return await instance.post(genterateOtpUrl, data, { headers });
};

// removeAgentUrl
export const PostRemoveAssignAgent = async (data) => {
  return await instance.post(removeAgentUrl, data, { headers });
};

//newMessageUrl
export const NewMessageApi = async (data) => {
  return await instance.post(newMessageUrl, data, { headers });
};

//allChatDataUrl
export const AllChatData = async (data) => {
  return await instance.post(allChatDataUrl, data);
};

// logoutUrl
export const PostLogout = async (data) => {
  return await instance.post(logoutUrl, data, { headers });
};

export const fetchExcelFile = async (data) => {
  return await instance.post(`${exportExcel}`, data, { headers });
};

export const sendBrodcastData = async (data) => {
  return await instance.post(sendBroadcastDetails, data, { headers });
};

export const sendVideoData = async (data) => {
  return await instance.post(sendVideoUrl, data, { headers });
};

export const sendBrodcastDataWithDateTime = async (data) => {
  return await instance.post(sendBroadcastDetailsWithDateTime, data, { headers });
};

export const sendTeamInboxDetails = async (data) => {
  return await instance.post(sendTeamInboxData, data, { headers });
};

export const fetchTeamInboxLists = async (userDetails) => {
  return await instance.post(
    getContactList,
    {
      role: userDetails.role,
      agentId: userDetails._id,
    },
    {
      headers,
    }
  );
};

export const fetchScheduleBroadcastData = async () => {
  return await instance.get(`${fetchScheduleBroadcast}`, { headers });
};

export const fetchAgentLists = async () => {
  return await instance.get(`${agentListUrl}`, { headers });
};

export const fetchSingleChatData = async (data) => {
  return await instance.post(`${fetchSingleChatdataUrl}`, data, { headers });
};

export const fetchBroadcastHistoryStatus = async () => {
  return await instance.get(`${fetchBroadcastHistoryStatusUrl}`, { headers });
};

export const fetchBroadcastHistoryTabelData = async () => {
  return await instance.get(`${fetchBroadcastHistoryDataUrl}`, { headers });
};

export const fetchContactListOptions = async () => {
  return await instance.get(`${contactOptionsUrl}`, { headers });
};
