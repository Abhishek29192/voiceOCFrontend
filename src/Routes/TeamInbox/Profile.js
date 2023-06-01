import React, { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { HiOutlineUserCircle } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { SecondaryButton } from "../../components/Button";
import { Base2, Base2Strong } from "../../components/Typography";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/useQueryApi";
import { useClickOutside } from "../../hooks/useClickOutSide";

export const Profile = ({ setOpenProfile }) => {
  const [openCloseDrawer, setOpenCloseDrawer] = useState(false)

  const navigate = useNavigate();
  const { mutateAsync } = useLogout();
  const ref = useClickOutside(() => setOpenCloseDrawer(false));
  const profileData = JSON.parse(localStorage.getItem("userDetails"));

  const role = JSON.parse(localStorage.getItem("userDetails"))?.role;

  const handleSignOut = () => {
    localStorage.clear();
    const personId = { _id: profileData._id };
    mutateAsync(personId)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    navigate("/");
  };

  return (
    <div ref={ref}>
      <div>
        <div className="flex items-center justify-between py-5 p-2 border-b-2 bg-slate-200">
          <div className="flex items-center">
            <div className="px-2">
              <HiOutlineUserCircle size={"3.5rem"} />
            </div>
            <div>
              <Base2 className="text-2xl poppins">
                {profileData.firstName + " " + profileData.lastName}
              </Base2>
              <Base2 className="poppins">{profileData.email}</Base2>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center">
              <div>
                <SecondaryButton
                  text={"Sign Out"}
                  type={"button"}
                  onClick={handleSignOut}
                />
              </div>
              <div className="border-[black] border-[2px] rounded-full mx-3">
                <RxCross2
                  size={"1.5rem"}
                  onClick={() => setOpenProfile(false)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center  bg-slate-200 p-4 py-4">
          <div className="pl-16">
            <SecondaryButton text="Edit Profile" type={"button"} />
          </div>

          {/* <div className="flex mx-3 items-center">
            <div className="flex items-center">
              <AiOutlineInfoCircle size={"1.5rem"} color={"#5536db"} />
              <Base2 className="font-bold px-1">Change Info</Base2>
            </div>
          </div> */}
          <div className="flex px-4">
            <Base2Strong className="text-xl">Role:</Base2Strong>
            <p className="px-2">{role.toUpperCase()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
