import axios from "axios";
import { url1 } from "../Urls";

export const fetchTempalteMessageData = async () => {
  return await axios.get(url1);
};
