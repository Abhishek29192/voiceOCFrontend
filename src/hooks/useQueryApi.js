import { useMutation, useQuery } from "react-query";
import {
  fetchContactDetailsToClient,
  fetchContactDetailsToServer,
  fetchLoginToken,
  fetchScheduleBroadcastData,
  fetchSignUpCreds,
  fetchTempalteMessageData,
  sendBrodcastData,
  sendBrodcastDataWithDateTime,
} from "../api";
import { fetchScheduleBroadcast } from "../Urls";

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


export const useSchedulBroadcastData = () => {
  return useQuery({
    queryKey: ["Schedule-broadcast"],
    queryFn: fetchScheduleBroadcastData,
    enabled: false,
    onError: (e) => e,
  });
};
