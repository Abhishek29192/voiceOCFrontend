import axios from "axios";
import { fetcemplateData, fetchContacts, sendBroadcastDetails } from "../Urls";
import cookie from "react-cookies";
import { useAppCommonDataProvider } from "../components/AppCommonDataProvider/AppCommonDataProvider";

// const { createContactDetails } = useAppCommonDataProvider();
// const { templateSelected, fileName, excelSelected, brodcastSelectedRowData } =
//   createContactDetails;

// const body = {
//   templateSelected,
//   fileName,
//   excelSelected,
//   brodcastSelectedRowData,
// };

let headers = {
  Authorization: `Bearer ${cookie.load("accessToken")}`,
  Accept: "application/json",
};

export const fetchTempalteMessageData = async () => {
  return await axios.get(fetcemplateData, { headers });
};

export const fetchContactDetailsToClient = async () => {
  return await axios.get(`${fetchContacts}?UserId=one`, { headers });
};

export const fetchContactDetailsToServer = async (data) => {
  return await axios.post(fetchContacts, data, { headers });
};

export const sendBrodcastData = async () => {
  return await axios.post(sendBroadcastDetails, { headers });
};
