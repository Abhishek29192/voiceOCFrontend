import axios from "axios";
import { url1 } from "../Urls";

export const fetchTempalteMessageData = () => {
  return axios.get(url1);
};
