import { useQuery } from "react-query";
import { fetchTempalteMessageData } from "../api";

export const useTemplateData = () => {
  return useQuery("template-data", fetchTempalteMessageData);
};
