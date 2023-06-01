import React, { useEffect, useState } from "react";
import Styles from "./signUp.module.css";
import register from "../../components/Images/register.svg";
import { InputFieldWithoutCounter } from "../../components/InputField";
import { Paragraph1 } from "../../components/Typography";
import { TiTick } from "react-icons/ti";
import { PrimaryButton } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { BsEyeSlash } from "react-icons/bs";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSignUp } from "../../hooks/useQueryApi";
import { Routes as AppRoute } from "../../constants/RoutesNames";
import { Checkbox } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SelectOptionButton } from "../../components/SelectOptions";
import { optionCategoary, optionRole } from "../../constants/DropDownContent";

export const SignUp = () => {
  const navigate = useNavigate();
  const { mutateAsync } = useSignUp();
  const [checkbox, setCheckbox] = useState(false);
  const [signUpCreds, setSignUpCreds] = useState();
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setconfirmPasswordType] = useState("password");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleLoginPage = () => {
    navigate("/");
  };

  const colourStyles = {
    control: (styles) => {
      return {
        ...styles,
        backgroundColor: "white",
        width: "full",
        height: "2.7rem",
        boxShadow: "none",
        fontSize: "15px",
        fontFamily: "poppins",
        marginTop: "2px",
        // border: "1px solid #5536db",
        // "&:hover": {
        //   border: "1px solid #5536db",
        // },
      };
    },
    option: (styles, { data, isDisabled }) => {
      return {
        ...styles,
        backgroundColor: isDisabled ? "red" : "white",
        color: "#000",
        width: "full",
        fontSize: "15px",
        fontFamily: "poppins",
        cursor: isDisabled ? "not-allowed" : "pointer",
      };
    },
  };

  const showToast = (res) => {
    console.log(res.status, "----------")
    if (res.status) {
      toast.success(" Sign Up Successful!!!! ", {
        autoClose: 1500,
        closeOnClick: true,
        position: "top-right",
      });
    } else {
      toast.error(res.message, {
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

  const handleTermsCondition = (e) => {
    // console.log(e, "eventS")
    setCheckbox(!checkbox);
  };

  const handleShowConfirmPassword = () => {
    if (confirmPasswordType === "password") {
      setconfirmPasswordType("text");
      return;
    }
    setconfirmPasswordType("password");
  };

  const handleSignUp = (values) => {
    // console.log(values, "valuesssss")
    if (values.password === "" || values.confirmPassword == "" || values.password !== values.confirmPassword) {
      toast.error(" fields are empty!!!", {
        autoClose: 1500,
        closeOnClick: true,
        position: "top-right",
      });
    }
    else {
      mutateAsync(values).then((res) => {
        if (res?.data) {
          // setTimeout(() => {
          //   navigate(`/`);
          // }, 1700);
          showToast(res.data);
        }
      });
    }
  };

  const schema = Yup.object().shape({
    firstName: Yup.string()
      .required("Required field")
      .min(2, "Too Short!")
      .max(20, "Too Long!"),
    lastName: Yup.string()
      .required("Required field")
      .min(2, "Too Short!")
      .max(20, "Too Long!"),
    email: Yup.string()
      .required("Email is a required field")
      .email("Invalid email format"),
    // password: Yup.string()
    //   .required("Password is a required field")
    //   .min(8, "Password must be at least 8 characters"),
    password: Yup.string()
      .required("Password is a required field")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
    termsAndCondition: Yup.bool().oneOf(
      [true],
      "Accept Terms & Conditions is required"
    ),
  });



  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        confirmPassword: "",
        role: "",
        termsAndCondition: "false",
      }}
      onSubmit={(values) => {
        // setSignUpCreds(values);
        handleSignUp(values);
        console.log(values);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        setFieldValue,
      }) => (
        <div className="justify-center items-center border h-full flex absolute w-full">
          <div className={Styles.body}>
            <form noValidate onSubmit={handleSubmit}>
              <div className="flex w-full h-[95%]">
                <div className="flex w-full">
                  <div className="w-1/2 pl-2 flex border-r-[1px] items-center justify-center">
                    <div className="w-[90%] h-[80%] p-2 items-center ">
                      <img src={register} />
                    </div>
                  </div>
                  <div className="w-1/2 pl-10">
                    <div className={Styles.LoginText}>Register an account</div>
                    <div className="flex justify-between px-2">
                      <div>
                        <div className={Styles.optionText}>First name<span className="text-red-500">*</span></div>
                        <div>
                          <InputFieldWithoutCounter
                            type={"text"}
                            onChange={handleChange}
                            placeholder="Enter your first name..."
                            id="firstName"
                            name="firstName"
                            className={"h-12 mt-1 w-[90%]"}
                          />
                        </div>
                        <p className={Styles.errorMsg}>
                          {errors.firstName &&
                            touched.firstName &&
                            errors.firstName}
                        </p>
                      </div>
                      <div className="pr-8">
                        <div className={Styles.optionText}>Last name<span className="text-red-500">*</span></div>
                        <div>
                          <InputFieldWithoutCounter
                            type={"text"}
                            onChange={handleChange}
                            placeholder="Enter your last name..."
                            id="lastName"
                            name="lastName"
                            className={"h-12 mt-1 w-[90%]"}
                          />
                        </div>
                        <p className={Styles.errorMsg}>
                          {errors.lastName &&
                            touched.lastName &&
                            errors.lastName}
                        </p>
                      </div>
                    </div>
                    <div className="pt-2 px-2 w-[90%]">
                      <div className={`${Styles.optionText}`}>Email<span className="text-red-500">*</span></div>
                      <div className="w-[99%]">
                        <InputFieldWithoutCounter
                          type={"Email"}
                          onChange={handleChange}
                          placeholder="Email..."
                          id="email"
                          name="email"
                          className={"h-12 mt-1 w-full"}
                        />
                      </div>
                      <p className={Styles.errorMsg}>
                        {errors.email && touched.email && errors.email}
                      </p>
                    </div>


                    {/* ---------------- */}
                    <div className="flex pt-3 px-2 w-[100%] justify-between">
                      <div className="w-full">
                        {/* password---------------------------- */}
                        <div className={Styles.optionText}>Password<span className="text-red-500">*</span></div>
                        <div className="relative w-full">
                          <InputFieldWithoutCounter
                            onChange={handleChange}
                            placeholder="Password..."
                            className={"h-12 mt-1 w-[82%]"}
                            id="password"
                            name="password"
                            type={passwordType}
                          />
                          {passwordType === "password" ? (
                            <BsEyeSlash
                              size={"1.5rem"}
                              color="grey"
                              className={"absolute top-4 right-11"}
                              onClick={handleShowPassword}
                            />
                          ) : (
                            <AiOutlineEye
                              size={"1.5rem"}
                              className={"absolute top-4 right-11"}
                              onClick={handleShowPassword}
                            />
                          )}
                        </div>
                        <p className={Styles.errorMsg}>
                          {errors.password &&
                            touched.password &&
                            errors.password}
                        </p>
                      </div>
                      <div className="pr-8 w-full">
                        <div className={`${Styles.optionText}`}>
                          Confirm password<span className="text-red-500">*</span>
                        </div>
                        {/* password-------------------------- */}
                        <div className="relative">
                          <InputFieldWithoutCounter
                            onChange={handleChange}
                            placeholder="Password..."
                            className={"h-12 mt-1 w-[89%]"}
                            id="confirmPassword"
                            name="confirmPassword"
                            type={confirmPasswordType}
                          />
                          {confirmPasswordType === "password" ? (
                            <BsEyeSlash
                              size={"1.5rem"}
                              color="grey"
                              className={"absolute top-4 right-7"}
                              onClick={handleShowConfirmPassword}
                            />
                          ) : (
                            <AiOutlineEye
                              size={"1.5rem"}
                              className={"absolute top-4 right-7"}
                              onClick={handleShowConfirmPassword}
                            />
                          )}
                        </div>
                        <p className={Styles.errorMsg}>
                          {errors.confirmPassword &&
                            touched.confirmPassword &&
                            errors.confirmPassword}
                        </p>
                      </div>
                    </div>
                    {/* ---------------- */}
                    <div className=" my-3 w-[87%]">
                      <div className={Styles.optionText}>Role<span className="text-red-500">*</span></div>
                      <SelectOptionButton
                        options={optionRole.filter((ele) => ele.value)}
                        className={colourStyles}
                        placeholder="Role"
                        onChange={(e) => setFieldValue("role", e.value)}
                      // selectedValue={role}
                      // setCurrentlySelectedOption={setCategory}
                      />
                    </div>
                    <div className="flex items-center justify-between w-[100%]">
                      <div className="flex items-center w-fit ">
                        <Checkbox
                          checked={values.termsAndCondition === "true"}
                          onChange={(e) =>
                            setFieldValue(
                              "termsAndCondition",
                              e.target.checked.toString()
                            )
                          }
                        />
                        <Paragraph1 className="text-[0.85rem] p-2 w-[90%]">
                          I agree to Terms and conditions and Privacy Policy
                        </Paragraph1>
                      </div>
                    </div>
                    <p className={Styles.errorMsg}>
                      {errors.termsAndCondition &&
                        touched.termsAndCondition &&
                        errors.termsAndCondition}
                    </p>
                    <div className="mt-1">
                      <PrimaryButton
                        text={"Sign Up"}
                        type="submit"
                        // disabled={!password || !confirmPassword}
                        className={"w-[87%]"}
                        onClick={handleSignUp}
                      />
                      <ToastContainer theme="light" />
                    </div>
                    <div className="justify-center items-center mt-1 flex w-[87%]">
                      <Paragraph1 className="justify-center items-center text-[0.85rem]">
                        Already have an account?
                        <span
                          className={Styles.registerText}
                          onClick={handleLoginPage}
                        >
                          Login
                        </span>
                      </Paragraph1>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </Formik>
  );
};
