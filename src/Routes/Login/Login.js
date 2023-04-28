import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Styles from "./Login.module.css";
import LoginPage from "../../components/Images/LoginPage.svg";
import { InputFieldWithoutCounter } from "../../components/InputField";
import { HiOutlineMail } from "react-icons/hi";
import { IoKeyOutline } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { Paragraph1 } from "../../components/Typography";
import { PrimaryButton } from "../../components/Button";
import { useLogin } from "../../hooks/useQueryApi";
import { Routes as AppRoute } from "../../constants/RoutesNames";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import cookie from "react-cookies";
import "react-toastify/dist/ReactToastify.css";
import { useAppCommonDataProvider } from "../../components/AppCommonDataProvider/AppCommonDataProvider";

export const Login = () => {
  const { mutateAsync, data } = useLogin();
  const navigate = useNavigate();
  const { setUserDetails } = useAppCommonDataProvider();

  const [checkbox, setCheckbox] = useState(false);
  const [passwordType, setPasswordType] = useState("password");

  const handleSignUp = () => {
    navigate(`${AppRoute.register}`);
  };

  const showToast = (res) => {
    console.log(res.status, "status");
    if (res.status === true) {
      toast.success(" Login successful!!! ", {
        autoClose: 1500,
        closeOnClick: true,
        position: "top-right",
      });
    } else {
      toast.error(`${res.message}`, {
        autoClose: 1500,
        closeOnClick: true,
        position: "top-right",
      });
    }
  };

  const handleShowPassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const schema = Yup.object().shape({
    email: Yup.string()
      .required("Email is a required field")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is a required field")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
  });

  const handleSubmitLogin = (values) => {
    mutateAsync(values).then((res) => {
      localStorage.setItem("userDetails", JSON.stringify(res.userDetail));
      setUserDetails?.(res.userDetail);

      if (res.status === true) {
        cookie.save("accessToken", res?.authToken, {});
        showToast(res);
        setTimeout(() => {
          navigate(`${AppRoute.teamInbox}`);
        }, 1000);
      } else {
        showToast(res);
      }
    });
  };

  return (
    <>
      <Formik
        validationSchema={schema}
        initialValues={{ email: "", password: "", rememberMe: true }}
        onSubmit={(values) => {
          handleSubmitLogin(values);
        }}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <div className="justify-center items-center border h-full flex absolute w-full">
            <div className={Styles.body}>
              <form noValidate onSubmit={handleSubmit}>
                <div className="flex w-full">
                  <div className="w-1/2 flex border-r-[1px] items-center justify-center">
                    <div className="w-[90%] h-[100%]">
                      <img src={LoginPage} />
                    </div>
                  </div>
                  <div className="w-1/2 pl-10">
                    {/* login------------------------ */}
                    <div className={Styles.LoginText}>Login</div>
                    {/* email------------------------------ */}
                    <div className=" flex flex-col w-full">
                      <div className={Styles.optionText}>Email</div>
                      <div className="relative w-[85%]">
                        <InputFieldWithoutCounter
                          type={"Email"}
                          onChange={handleChange}
                          placeholder="Email..."
                          id={"email"}
                          className={"h-12 mt-1 w-full"}
                        />
                        <HiOutlineMail
                          size={"1.5rem"}
                          className="absolute top-4 right-1"
                        />
                      </div>
                    </div>
                    <p className={Styles.errorMsg}>
                      {errors.email && touched.email && errors.email}
                    </p>
                    {/* Password------------------------------- */}
                    <div className="mt-4 flex flex-col w-full">
                      <div className={Styles.optionText}>Password</div>
                      <div className="relative w-[85%] ">
                        <InputFieldWithoutCounter
                          onChange={handleChange}
                          placeholder="Password..."
                          className={"h-12 mt-1 w-full"}
                          id={"password"}
                          type={passwordType}
                        />
                        <IoKeyOutline
                          size={"1.5rem"}
                          className="absolute top-4 right-1"
                          onClick={handleShowPassword}
                        />
                      </div>
                    </div>
                    <p className={Styles.errorMsg}>
                      {errors.password && touched.password && errors.password}
                    </p>
                    <div className="flex items-center justify-between w-96  mt-5">
                      <div className="flex items-center w-fit ">
                        <div
                          className={Styles.CheckBox__style}
                          onClick={(e) => setCheckbox(!checkbox)}
                        >
                          {checkbox && (
                            <TiTick color="#5536DB" size={"1.4rem"} />
                          )}
                        </div>
                        <Paragraph1 className="text-[0.85rem] p-2 ">
                          Remember Me?
                        </Paragraph1>
                      </div>
                      <Paragraph1 className="text-[0.85rem] p-2 pointer">
                        <u>Forgot password?</u>
                      </Paragraph1>
                    </div>
                    <div className="mt-5">
                      <PrimaryButton
                        text={"Login"}
                        type={"submit"}
                        className={"w-96"}
                      />
                      <ToastContainer theme="light" />
                    </div>
                    <div className="justify-center items-center mt-4 pl-10">
                      <Paragraph1 className="text-[0.85rem]">
                        Do not have an account?
                        <span
                          className={Styles.registerText}
                          onClick={handleSignUp}
                        >
                          Register here
                        </span>
                      </Paragraph1>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div >
        )}
      </Formik >
    </>
  );
};
