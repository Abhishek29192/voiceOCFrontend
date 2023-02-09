import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import cookie from "react-cookies";

export const TeamInbox = () => {
  useEffect(() => {
    cookie.save(
      "accessToken",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiI2M2UwYzhjZDQ4OTYzMzdiNmUyZTc5NTIiLCJyb2xlIjoic3VwZXJhZG1pbiIsImlhdCI6MTY3NTc1MTMxN30.AZUDv5jufP2FfyiWb0MN5j-hk3gC-WG3ujp03OVMZFU",
      {}
    );
  }, []);
  return (
    <div>
      <Navbar />
      <p>hdsnbn</p>
    </div>
  );
};
