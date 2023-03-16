import { useMutation, useQuery } from "react-query";
import {
  fetchBroadcastHistoryData,
  fetchBroadcastHistoryStatus,
  fetchBroadcastHistoryTabelData,
  fetchContactDetailsToClient,
  fetchContactDetailsToServer,
  fetchLoginToken,
  fetchScheduleBroadcastData,
  fetchSignUpCreds,
  fetchSingleChatData,
  fetchTeamInboxDetails,
  fetchTempalteMessageData,
  sendBrodcastData,
  sendBrodcastDataWithDateTime,
  sendTeamInboxDetails,
} from "../api";
import { fetchScheduleBroadcast, fetchSingleChatdata } from "../Urls";

export const useLogin = (creds) => {
  return useMutation({
    mutationKey: ["login-creds"],
    mutationFn: async (data) => await fetchLoginToken(data),
    onError: (e) => e,
  })
}

export const useSignUp = (creds) => {
  return useMutation({
    mutationKey: ["signup-creds"],
    mutationFn: async (data) => await fetchSignUpCreds(data),
    onError: (e) => e,
  })
}

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
      return fetchContactDetailsToServer(data);
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
}

export const usePostTeamInboxData = () => {
  return useMutation({
    mutationKey: ["post-teamInbox-data"],
    mutationFn: async (data) => {
      return sendTeamInboxDetails(data);
    },
    onError: (e) => e,
  });
}

export const useTeamInboxDetails = () => {
  return useQuery({
    queryKey: ["contact-details"],
    queryFn: fetchTeamInboxDetails,
    enabled: false,
    onError: (e) => e,
  });
};


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
}


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
