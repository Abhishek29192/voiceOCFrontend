import { useMutation, useQuery } from "react-query";
import {
  fetchContactDetailsToClient,
  fetchContactDetailsToServer,
  fetchTempalteMessageData,
  sendBrodcastData,
} from "../api";

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
