import React, { useState, useEffect } from "react";
import { useAppCommonDataProvider } from "../AppCommonDataProvider/AppCommonDataProvider";



export const TimerCounter = ({ startTimer, selectedMobileNumber }) => {
  const [timer, setTimer] = useState(startTimer)
  const [timeRemaining, setTimeRemaining] = useState(
    Math.max(0, 86400000 - (Date.now() - timer))
  ); // 24 hours in milliseconds

  const { createTeamInboxDetails, allChat, setAllChat, setCreateTeamInboxDetails, } =
    useAppCommonDataProvider();
  const { chatDataAll } = allChat;
  const { contactDetailData } = createTeamInboxDetails;

  useEffect(() => {
    setTimeRemaining(Math.max(0, 86400000 - (Date.now() - startTimer)))
  }, [startTimer])

  // console.log(timeRemaining, "timeRemaining", timeLeft)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) =>
        prevTime > 0 ? prevTime - 1000 : 0
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) => {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return (`${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")
      }:${seconds.toString().padStart(2, "0")}`)
  };

  useEffect(() => {
    if (timeRemaining <= 0) {
      setTimeRemaining(0);


      const data = [...chatDataAll];

      data?.forEach((ele, index) => {
        if (ele?.mobileNumber === selectedMobileNumber) {
          const details = ele.chatDetail
          details.status = "deactive"

          data[index].chatDetail = details

          if (contactDetailData?.mobileNumber === selectedMobileNumber) {
            setCreateTeamInboxDetails({
              ...createTeamInboxDetails,
              contactDetailData: data[index],
            });
          }

          setAllChat({ chatDataAll: data });
        }
      })
    }
  }, [timeRemaining]);

  return <div>{formatTime(timeRemaining)}</div>;
}
