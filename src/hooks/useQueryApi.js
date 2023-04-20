import {useMutation, useQuery} from "react-query";
import {
  AllChatData,
  fetchAgentLists,
  fetchBroadcastHistoryData,
  fetchBroadcastHistoryStatus,
  fetchBroadcastHistoryTabelData,
  fetchContactDetailsToClient,
  fetchContactDetailsToServer,
  fetchContactListOptions,
  fetchExcelFile,
  fetchLoginToken,
  fetchScheduleBroadcastData,
  fetchSignUpCreds,
  fetchSingleChatData,
  fetchTeamInboxDetails,
  fetchTeamInboxLists,
  fetchTempalteMessageData,
  NewMessageApi,
  PostAssignAgent,
  PostLogout,
  PostRemoveAssignAgent,
  sendBrodcastData,
  sendBrodcastDataWithDateTime,
  sendTeamInboxDetails,
  sendVideoData,
} from "../api";
import {fetchScheduleBroadcast, fetchSingleChatdata} from "../Urls";

export const useLogin = (creds) => {
  return useMutation({
    mutationKey: ["login-creds"],
    mutationFn: async (data) => await fetchLoginToken(data),
    onError: (e) => e,
  });
};

export const useSignUp = (creds) => {
  return useMutation({
    mutationKey: ["signup-creds"],
    mutationFn: async (data) => await fetchSignUpCreds(data),
    onError: (e) => e,
  });
};

export const useTemplateData = () => {
  return useQuery({
    queryKey: ["template-data"],
    queryFn: fetchTempalteMessageData,
    enabled: false,
    onError: (e) => e,
  });
};

export const useContactDataToServer = () => {
  return useMutation({
    mutationKey: ["contact-data-to-server"],
    mutationFn: async (data) => {
      // console.log(data, "datatatatataa")
      return fetchContactDetailsToServer(data);
    },
    onError: (e) => e,
  });
};

// PostAssignAgent
export const usePostAssignAgentData = () => {
  return useMutation({
    mutationKey: ["assign-agent"],
    mutationFn: async (data) => {
      // console.log(data, "datatatatataa")
      return PostAssignAgent(data);
    },
    onError: (e) => e,
  });
};

// PostRemoveAssignAgent
export const usePostRemoveAssignAgent = () => {
  return useMutation({
    mutationKey: ["remove-agent"],
    mutationFn: async (data) => {
      // console.log(data, "datatatatataa")
      return PostRemoveAssignAgent(data);
    },
    onError: (e) => e,
  });
};

// PostLogout

export const useLogout = () => {
  return useMutation({
    mutationKey: ["log-out"],
    mutationFn: async (data) => {
      return PostLogout(data);
    },
    onError: (e) => e,
  });
};
export const useDPostExcelToDownload = () => {
  return useMutation({
    mutationKey: ["download-excel"],
    mutationFn: async (data) => {
      return fetchExcelFile(data);
    },
    onError: (e) => e,
  });
};

export const useContactDataToClient = () => {
  return useQuery({
    queryKey: ["contact-data-to-client"],
    queryFn: fetchContactDetailsToClient,
    enabled: false,
    onError: (e) => e,
  });
};

export const usePostBordcastData = () => {
  return useMutation({
    mutationKey: ["post-brodcast-data"],
    mutationFn: async (data) => {
      return sendBrodcastData(data);
    },
    onError: (e) => e,
  });
};

export const usePostBroadcastDataWithDateTime = () => {
  return useMutation({
    mutationKey: ["post-brodcast-data-with-date-time"],
    mutationFn: async (data) => {
      return sendBrodcastDataWithDateTime(data);
    },
    onError: (e) => e,
  });
};

//NewMessageApi
export const useNewMessageStatus = () => {
  return useMutation({
    mutationKey: ["new-message-update"],
    mutationFn: async (data) => {
      return NewMessageApi(data);
    },
    onError: (e) => e,
  });
};

//AllChatData
export const useAllChatData = () => {
  return useMutation({
    mutationKey: ["all-chat-data"],
    mutationFn: async (data) => {
      return AllChatData(data);
    },
    onError: (e) => e,
  });
};

export const usePostTeamInboxData = () => {
  return useMutation({
    mutationKey: ["post-teamInbox-data"],
    mutationFn: async (data) => {
      return sendTeamInboxDetails(data);
    },
    onError: (e) => e,
  });
};

export const useTeamInboxContactList = (userDetails) => {
  // console.log(userDetails, "----------------")
  return useMutation({
    mutationKey: ["contact-details"],
    mutationFn: async (data) => {
      return fetchTeamInboxLists(userDetails);
    },
    onError: (e) => e,
  });
};

// export const useTeamInboxDetails = (userDetails) => {
//   // console.log(userDetails, "----------------")
//   return useQuery({
//     queryKey: ["contact-details"],
//     queryFn: fetchTeamInboxDetails(userDetails),
//     enabled: false,
//     onError: (e) => e,
//   });
// };

export const useSchedulBroadcastData = () => {
  return useQuery({
    queryKey: ["Schedule-broadcast"],
    queryFn: fetchScheduleBroadcastData,
    enabled: false,
    onError: (e) => e,
  });
};

export const useSingleChatData = () => {
  return useMutation({
    mutationKey: ["single-data"],
    mutationFn: async (data) => {
      return await fetchSingleChatData(data);
    },
    onError: (e) => e,
  });
};

export const useUploadVideo = () => {
  return useMutation({
    mutationKey: ["video-Upload"],
    mutationFn: async (data) => {
      return await sendVideoData(data);
    },
    onError: (e) => e,
  });
};

export const useBroadcastDataHistoryOveraAllStatus = () => {
  return useQuery({
    queryKey: ["Broadcast-history-status"],
    queryFn: fetchBroadcastHistoryStatus,
    enabled: false,
    onError: (e) => e,
  });
};

export const useBroadcastHistoryTabelData = () => {
  return useQuery({
    queryKey: ["broadcast-history-tabel"],
    queryFn: fetchBroadcastHistoryTabelData,
    enabled: false,
    onError: (e) => e,
  });
};

export const useContactListOptions = () => {
  return useQuery({
    queryKey: ["contact-List"],
    queryFn: fetchContactListOptions,
    enabled: false,
    onError: (e) => e,
  });
};

export const useAgentLists = () => {
  return useQuery({
    queryKey: ["agent-list"],
    queryFn: fetchAgentLists,
    enabled: false,
    onError: (e) => e,
  });
};
