import React from "react";

export const VideoPlayer = () => {
  return (
    <video width="300" height="200" controls autoplay>
      {/* <source src="/html5/foo.ogg" type="video/ogg" />  */}
      <source
        src="https://www.youtube.com/watch?v=2s2iJLLDwgk&list=PLC3y8-rFHvwjTELCrPrcZlo6blLBUspd2&index=14"
        type="video/mp4"
      />
      Your browser does not support the element.
    </video>
  );
};
