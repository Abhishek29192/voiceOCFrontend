import { useQuery } from "react-query";
import { fetchTempalteMessageData } from "../api";

export const TemplateData = () => {
  return useQuery("templateData", fetchTempalteMessageData, {
    cacheTime: 5000, // to remain data in cache memory
    // staleTime: 10000, //is the data dosent changes we can use to decrease network request
    // enabled: false,  //TO DIABLE THE API CALL
    // select: (data) => {
    //   const title = data.data.map((i) => console.log(i.title));
    // },
  });
};
