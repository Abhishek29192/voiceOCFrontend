import axios from "axios";
import { fetcemplateData, fetchContacts, sendBroadcastDetails, fetctokenUrl, signUpUrl, sendBroadcastDetailsWithDateTime, fetchScheduleBroadcast, sendTeamInboxData, fetchSingleChatdata, fetchSingleChatdataUrl, fetchBroadcastHistoryDataUrl, fetchBroadcastHistoryStatusUrl, contactOptionsUrl, sendVideoUrl, exportExcel } from "../Urls";
import cookie from "react-cookies";
import { useAppCommonDataProvider } from "../components/AppCommonDataProvider/AppCommonDataProvider";

let headers = {
  Authorization: `Bearer ${cookie.load("accessToken")}`,
  Accept: "application/json",
};


export const fetchLoginToken = async (data) => {
  const { data: response } = await
    axios.post(fetctokenUrl, data)
  return response;
}

export const fetchSignUpCreds = async (data) => {
  return await axios.post(signUpUrl, data);
}

export const fetchTempalteMessageData = async () => {
  return await axios.get(fetcemplateData, { headers });
};

export const fetchContactDetailsToClient = async () => {
  return await axios.get(`${fetchContacts}?UserId=one`, { headers });
};

export const fetchContactDetailsToServer = async (data) => {
  return await axios.post(fetchContacts, data, { headers });
};


export const fetchExcelFile = async (data) => {
  return await axios.post(`${exportExcel}`, data, { headers });
};

export const sendBrodcastData = async (data) => {
  return await axios.post(sendBroadcastDetails, data, { headers });
};

export const sendVideoData = async (data) => {
  return await axios.post(sendVideoUrl, data, { headers });
};

export const sendBrodcastDataWithDateTime = async (data) => {
  return await axios.post(sendBroadcastDetailsWithDateTime, data, { headers });
};

export const sendTeamInboxDetails = async (data) => {
  return await axios.post(sendTeamInboxData, data, { headers });
};


export const fetchTeamInboxDetails = async () => {
  return await axios.get(sendTeamInboxData, { headers });
};

export const fetchScheduleBroadcastData = async () => {
  return await axios.get(`${fetchScheduleBroadcast}`, { headers });
};


export const fetchSingleChatData = async (data) => {
  return await axios.post(`${fetchSingleChatdataUrl}`, data, { headers });
};

export const fetchBroadcastHistoryStatus = async () => {
  return await axios.get(`${fetchBroadcastHistoryStatusUrl}`, { headers })
}

export const fetchBroadcastHistoryTabelData = async () => {
  return await axios.get(`${fetchBroadcastHistoryDataUrl}`, { headers })
}

export const fetchContactListOptions = async () => {
  return await axios.get(`${contactOptionsUrl}`, { headers })
}