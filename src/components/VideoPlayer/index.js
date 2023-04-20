import React from "react";

export const VideoPlayer = ({videoUrl}) => {
  return (
    <video width="300" height="200" controls autoplay>
      {/* <source src="/html5/foo.ogg" type="video/ogg" />  */}
      <source src={videoUrl} type="video/mp4" />
      Your browser does not support the element.
    </video>
  );
};
