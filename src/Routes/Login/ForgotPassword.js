import React, { useState } from "react";
import Modal from "react-responsive-modal";
import { Base1Strong } from "../../components/Typography";
import { HiOutlineMail } from "react-icons/hi";
import { MdPassword } from "react-icons/md"
import { InputFieldWithoutCounter } from "../../components/InputField";
import { IoKeyOutline } from "react-icons/io5";
import { PrimaryButton } from "../../components/Button";
import { usePostForgetOtp, usePostForgotPassword } from "../../hooks/useQueryApi";
import cookie from "react-cookies";
import validator from "validator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Styles from "./Login.module.css";

const ForgotPassword = ({
    isOpen,
    onClose,
    className,
    classes,
    forgotpassword,
    setForgotpassword,
    emailEnterd,
    setEmailEnterd,
}) => {
    const [OtpStatus, setOtpStatus] = useState(false);
    const [otpEntered, setOtpEntered] = useState("");
    const [passwordStatus, setPasswordStatus] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState("");
    const [confirmPasswordChanged, setConfirmPasswordChanged] = useState("");
    const [email, setEmail] = useState("");
    const [emailErrorMsg, setEmailErrorMsg] = useState("");
    const [passwordType, setPasswordType] = useState("password");
    const [confirmPasswordType, setConfirmPasswordType] = useState("password");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const { mutateAsync } = usePostForgetOtp();
    const { mutateAsync: PosTForgotPasswordData } = usePostForgotPassword();

    const handleShowPassword = () => {
        if (passwordType === "password") {
            setPasswordType("text");
            return;
        }
        setPasswordType("password");
    };

    const handleShowConfirmPassword = () => {
        if (confirmPasswordType === "password") {
            setConfirmPasswordType("text");
            return;
        }
        setConfirmPasswordType("password");
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
        console.log(e.target.value, "ijoh")
        if (e.target.value === "") {
            setEmailErrorMsg("Please, enter Email!");
        } else {
            if (!validator.isEmail(email)) {
                setEmailErrorMsg("");
            } else {

                setEmailErrorMsg("Please, enter valid Email!");
            }
        }
    };

    const handleConfirmPassword = (e) => {
        // setPasswordChanged(e)
        setConfirmPasswordChanged(e)
        if (e === "") {
            setConfirmPasswordError("please enter a password!");
        } else {
            if (!validator.isAlphanumeric(confirmPasswordChanged)) {
                setConfirmPasswordError("");
            } else if (passwordChanged == confirmPasswordChanged) {
                setConfirmPasswordError("password and confirm password dose not match");
            }
        }
    }

    const handlePassword = (e) => {
        setPasswordChanged(e)
        // setConfirmPasswordChanged(e)
        if (e === "") {
            setPasswordError("please enter a password!");
        } else {
            if (!validator.isAlphanumeric(passwordChanged)) {
                setPasswordError("");
            } else if (passwordChanged == confirmPasswordChanged) {


                setConfirmPasswordError("password and confirm password dose not match");
            }
        }
    }

    const handleGetOtp = () => {
        if (email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            mutateAsync({ email: email })
                .then((res) => {
                    setOtpStatus(true);
                    setEmailEnterd(false);
                    cookie.save(
                        "number",
                        res?.data?.otp + "" + Math.floor(Math.random() * 100000000)
                    );
                    // setForgotpassword(false)
                })
                .catch((err) => console.log(err));
        } else {
            toast.error(`Please Enter valid Email!!!`, {
                autoClose: 1500,
                closeOnClick: true,
                position: "top-right",
            });
        }
    };


    const handleNextBtn = () => {
        const otp = cookie.load("number");
        if (otpEntered == otp.substring(0, 4)) {
            setPasswordStatus(true);
            setOtpStatus(false);
        } else {
            toast.error("Please Enter valid otp", {
                autoClose: 1500,
                closeOnClick: true,
                position: "top-right",
            });
        }
    };


    const validatePassword = (password) => {
        const pattern1 = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        const pattern2 = /[a-zA-Z]+/g
        const pattern3 = /\d/g
        return password.length >= 8 && pattern1.test(password) && pattern2.test(password) && pattern3.test(password);
    }




    const handleForgotPassword = () => {
        const validPassword = validatePassword(passwordChanged)
        console.log(validPassword, "dfghmj")
        if (
            validPassword && confirmPasswordChanged == passwordChanged
        ) {
            PosTForgotPasswordData({
                password: passwordChanged,
                email: email,
            })
                .then((res) => {
                    console.log(res);
                    onClose();
                })
                .catch((err) => {
                    console.log(err);
                });
        } else if (confirmPasswordChanged !== passwordChanged) {
            toast.error("Password and Confirm password dosen't match", {
                autoClose: 1500,
                closeOnClick: true,
                position: "top-right",
            });
        } else {
            toast.error("Invalid Credentials!!!", {
                autoClose: 1500,
                closeOnClick: true,
                position: "top-right",
            });
        }
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            showCloseIcon
            center
            classNames={{ modal: `${className} ${classes}` }}
        >
            <div className="items-center pb-3 ">
                <Base1Strong className="items-center mr-38">
                    Forgot Password
                </Base1Strong>
            </div>
            <hr />
            {emailEnterd && (
                <div>
                    <div className=" flex flex-col w-full">
                        <div className={Styles.optionText}>
                            Email<span className="text-red-500">*</span>
                        </div>
                        <div className="relative w-[100%] py-2">
                            <InputFieldWithoutCounter
                                type={"Email"}
                                onChange={(e) => handleEmail(e)}
                                placeholder="Email..."
                                id={"email"}
                                className={"h-12 mt-1 w-full bg-slate-200"}

                            />
                            <HiOutlineMail
                                size={"1.5rem"}
                                className="absolute top-[1.4rem] right-2"
                            />
                        </div>
                        <small
                            style={{
                                fontWeight: "semi-bold",
                                color: "red",
                            }}
                        >
                            {emailErrorMsg}
                        </small>
                    </div>
                    <ToastContainer theme="light" />

                    <div className="flex mt-28 justify-end">
                        <PrimaryButton
                            text={"Get Otp"}
                            type={"submit"}
                            className={"w-[40%]"}
                            onClick={handleGetOtp}
                        // disabled={!email}
                        />
                    </div>
                </div>
            )}

            {OtpStatus && (
                <>
                    <div className=" flex flex-col w-full py-2">
                        <div className={Styles.optionText}>
                            Enter OTP<span className="text-red-500">*</span>
                        </div>
                        <div className="relative w-[100%]">
                            <InputFieldWithoutCounter
                                type={"Eneter OTP"}
                                onChange={(e) => setOtpEntered(e.target.value)}
                                // onChange={(e) => setFieldValue("email", e.target.value.toLowerCase())}
                                placeholder="Email..."
                                id={"email"}
                                className={"h-12 mt-1 w-full bg-slate-200"}
                            />
                            <MdPassword
                                size={"1.5rem"}
                                className="absolute top-4 right-2"
                            />
                        </div>
                    </div>
                    <div className="flex mt-28 justify-end">
                        <PrimaryButton
                            text={"Next"}
                            type={"submit"}
                            className={"w-[40%]"}
                            onClick={(e) => handleNextBtn(e)}
                        />
                        <ToastContainer theme="light" />
                    </div>
                </>
            )}

            {passwordStatus && (
                <div>
                    <div className=" flex flex-col w-full">
                        <div className={Styles.optionText}>
                            Password<span className="text-red-500">*</span>
                        </div>
                        <div className="relative w-[100%] py-2">
                            <InputFieldWithoutCounter
                                type={passwordType}
                                onChange={(e) => handlePassword(e.target.value)}
                                placeholder="password..."
                                id={"email"}
                                className={"h-12 mt-1 w-full bg-slate-200"}
                            />
                            <IoKeyOutline
                                size={"1.5rem"}
                                className="absolute top-6 right-1"
                                onClick={handleShowPassword}
                            />
                        </div>
                        <small
                            style={{
                                fontWeight: "semi-bold",
                                color: "red",
                            }}
                        >
                            {passwordError}
                        </small>
                    </div>
                    {/* 2222 -----------------------------*/}
                    <div className=" flex flex-col w-full">
                        <div className={Styles.optionText}>
                            Confirm Password<span className="text-red-500">*</span>
                        </div>
                        <div className="relative w-[100%] py-2">
                            <InputFieldWithoutCounter
                                type={confirmPasswordType}
                                onChange={(e) => handleConfirmPassword(e.target.value)}
                                // onChange={(e) => setConfirmPasswordChanged(e.target.value)}
                                placeholder="Confirm password..."
                                id={"email"}
                                className={"h-12 mt-1 w-full bg-slate-200"}
                            />
                            <IoKeyOutline
                                size={"1.5rem"}
                                className="absolute top-6 right-1"
                                onClick={handleShowConfirmPassword}
                            />
                        </div>
                        <small
                            style={{
                                fontWeight: "semi-bold",
                                color: "red",
                            }}
                        >
                            {confirmPasswordError}
                        </small>
                        <div className="flex  py-2 justify-end">
                            <PrimaryButton
                                text={"Save"}
                                type={"submit"}
                                className={"w-[40%]"}
                                onClick={handleForgotPassword}
                            />
                        </div>
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default ForgotPassword;
