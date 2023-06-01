import React, { useState } from "react";
import Modal from "react-responsive-modal";
import { Base1Strong } from "../../components/Typography";
import { HiOutlineMail } from "react-icons/hi";
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

    const { mutateAsync } = usePostForgetOtp();
    const { mutateAsync: PosTForgotPasswordData } = usePostForgotPassword();

    const handleEmail = (e) => {
        console.log(e.target.value, "eee")
        if (e === "") {
            setEmailErrorMsg("Please, enter Email!");
        } else {
            setEmail(e.target.value);
            if (validator.isEmail(email)) {
                setEmailErrorMsg("");
            } else {
                setEmailErrorMsg("Please, enter valid Email!");
            }
        }
    };

    const handleGetOtp = () => {
        if (email.length > 0) {
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
            toast.error(`Please Enter Email!!!`, {
                autoClose: 1500,
                closeOnClick: true,
                position: "top-right",
            });
        }
    };

    const handleOtpEntered = (e) => {
        setOtpEntered(e.target.value);
    };

    console.log(otpEntered, "565565565")

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

    const handleChangePassword = (e) => {
        setPasswordChanged(e.target.value);
    };

    const handleChangeConfirmPassword = (e) => {
        setConfirmPasswordChanged(e.target.value);
    };

    const handleForgotPassword = () => {
        console.log("975487596785418574");

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
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            showCloseIcon
            center
            // styles={bg}
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
                        <span
                            style={{
                                fontWeight: "semi-bold",
                                color: "red",
                            }}
                        >
                            {emailErrorMsg}
                        </span>
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
                                onChange={(e) => handleOtpEntered(e)}
                                // onChange={(e) => setFieldValue("email", e.target.value.toLowerCase())}
                                placeholder="Email..."
                                id={"email"}
                                className={"h-12 mt-1 w-full bg-slate-200"}
                            />
                            <HiOutlineMail
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
                                type={"password"}
                                onChange={(e) => handleChangePassword(e)}
                                // onChange={(e) => setFieldValue("email", e.target.value.toLowerCase())}
                                placeholder="password..."
                                id={"email"}
                                className={"h-12 mt-1 w-full bg-slate-200"}
                            />
                            <IoKeyOutline
                                size={"1.5rem"}
                                className="absolute top-6 right-1"
                            />
                        </div>
                    </div>
                    {/* 2222 */}
                    <div className=" flex flex-col w-full">
                        <div className={Styles.optionText}>
                            Confirm Password<span className="text-red-500">*</span>
                        </div>
                        <div className="relative w-[100%] py-2">
                            <InputFieldWithoutCounter
                                type={"password"}
                                onChange={(e) => handleChangeConfirmPassword(e)}
                                // onChange={(e) => setFieldValue("email", e.target.value.toLowerCase())}
                                placeholder="Confirm password..."
                                id={"email"}
                                className={"h-12 mt-1 w-full bg-slate-200"}
                            />
                            <IoKeyOutline
                                size={"1.5rem"}
                                className="absolute top-6 right-1"
                            />
                        </div>
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
