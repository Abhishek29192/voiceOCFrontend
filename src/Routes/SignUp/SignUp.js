import React, { useState } from 'react'
import Styles from "./signUp.module.css";
import register from "../../components/Images/register.svg"
import { InputFieldWithoutCounter } from '../../components/InputField';
import { Paragraph1 } from '../../components/Typography';
import { TiTick } from "react-icons/ti"
import { PrimaryButton } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye } from "react-icons/ai"
import { BsEyeSlash } from "react-icons/bs";
import { Formik } from "formik";
import * as Yup from "yup";

export const SignUp = () => {
    const [checkbox, setCheckbox] = useState(false)
    const [signUpCreds, setSignUpCreds] = useState([]);
    const [passwordType, setPasswordType] = useState("password");
    const [confirmPasswordType, setconfirmPasswordType] = useState("password");
    const navigate = useNavigate()
    const handleLoginPage = () => {
        navigate("/")
    }
    const handleShowPassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }
    const handleShowConfirmPassword = () => {
        if (confirmPasswordType === "password") {
            setconfirmPasswordType("text")
            return;
        }
        setconfirmPasswordType("password")
    }

    const handleSignUp = () => {
    }

    const schema = Yup.object().shape({
        firstname: Yup.string()
            .required("Required field")
            .min(2, 'Too Short!')
            .max(20, 'Too Long!'),
        lastname: Yup.string()
            .required("Required field")
            .min(2, 'Too Short!')
            .max(20, 'Too Long!'),
        email: Yup.string()
            .required("Email is a required field")
            .email("Invalid email format"),
        password: Yup.string()
            .required("Password is a required field")
            .min(8, "Password must be at least 8 characters"),
        confirmpassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
    });

    return (
        <Formik
            validationSchema={schema}
            initialValues={{ email: "", password: "", firstname: "", lastname: "", confirmpassword: "" }}
            onSubmit={(values) => {
                console.log(JSON.stringify(values, "vallllll"));
                setSignUpCreds(values);
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
            }) => (<div className='justify-center items-center border h-full flex absolute w-full'>
                <div className={Styles.body}>
                    <form noValidate onSubmit={handleSubmit}>
                        <div className='flex w-full h-[95%]'>
                            <div className='flex w-full'>
                                <div className='w-1/2 pl-2 flex border-r-[1px] items-center justify-center'>
                                    <div className='w-[90%] h-[80%] p-2 items-center '>
                                        <img src={register} />
                                    </div>
                                </div>
                                <div className='w-1/2 pl-10'>
                                    <div className={Styles.LoginText}>Register an account</div>
                                    <div className='flex justify-between'>
                                        <div>
                                            <div className={Styles.optionText}>First name*</div>
                                            <div>
                                                <InputFieldWithoutCounter
                                                    type={"text"}
                                                    onChange={handleChange}
                                                    placeholder="Enter your first name..."
                                                    id={"firstname"}
                                                    className={"h-12 mt-1 w-44"}
                                                />
                                            </div>
                                            <p className={Styles.errorMsg}>
                                                {errors.firstname && touched.firstname && errors.firstname}
                                            </p>
                                        </div>
                                        <div className='pr-12'>
                                            <div className={Styles.optionText}>Last name*</div>
                                            <div>
                                                <InputFieldWithoutCounter
                                                    type={"text"}
                                                    onChange={handleChange}
                                                    placeholder="Enter your last name..."
                                                    id={"lastname"}
                                                    className={"h-12 mt-1 w-44"}
                                                />
                                            </div>
                                            <p className={Styles.errorMsg}>
                                                {errors.lastname && touched.lastname && errors.lastname}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='pt-2'>
                                        <div className={Styles.optionText}>Email</div>
                                        <div className='w-fit'>
                                            <InputFieldWithoutCounter
                                                type={"Email"}
                                                onChange={handleChange}
                                                placeholder="Email..."
                                                id={"email"}
                                                className={"h-12 mt-1 w-96"}
                                            />
                                        </div>
                                        <p className={Styles.errorMsg}>
                                            {errors.email && touched.email && errors.email}
                                        </p>
                                    </div>
                                    <div className='flex pt-3 justify-between'>
                                        <div>
                                            <div className={Styles.optionText}>Password</div>
                                            <div className='relative'>
                                                <InputFieldWithoutCounter
                                                    onChange={handleChange}
                                                    placeholder="Password..."
                                                    className={"h-12 mt-1 w-44"}
                                                    id={"password"}
                                                    type={passwordType}
                                                />
                                                {
                                                    passwordType === "password" ? <BsEyeSlash size={"1.5rem"} color="grey" className={"absolute top-4 right-1"} onClick={handleShowPassword} /> : <AiOutlineEye size={"1.5rem"} className={"absolute top-4 right-1"} onClick={handleShowPassword} />
                                                }
                                                {/* <AiOutlineEye size={"1.5rem"} className={"absolute top-4 right-1"} onClick={handleShowPassword} /> */}
                                            </div>
                                            <p className={Styles.errorMsg}>
                                                {errors.password && touched.password && errors.password}
                                            </p>
                                        </div>
                                        <div className='pr-12'>
                                            <div className={Styles.optionText}>Confirm password</div>
                                            <div className='relative'>
                                                <InputFieldWithoutCounter
                                                    onChange={handleChange}
                                                    placeholder="Password..."
                                                    className={"h-12 mt-1 w-44"}
                                                    id={"confirmpassword"}
                                                    type={confirmPasswordType}
                                                />
                                                {
                                                    confirmPasswordType === "password" ? <BsEyeSlash size={"1.5rem"} color="grey" className={"absolute top-4 right-1"} onClick={handleShowConfirmPassword} /> : <AiOutlineEye size={"1.5rem"} className={"absolute top-4 right-1"} onClick={handleShowConfirmPassword} />
                                                }
                                                {/* <BsEyeSlash size={"1.5rem"} color="grey" className={"absolute top-4 right-1"} /> */}
                                            </div>
                                            <p className={Styles.errorMsg}>
                                                {errors.confirmpassword && touched.confirmpassword && errors.confirmpassword}
                                            </p>
                                            {/* {
                                                password !== confirmpassword && (

                                                    <p className={Styles.errorMsg}>
                                                        {errors.password && touched.password && errors.password}
                                                    </p>
                                                )
                                            } */}
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-between w-96 mt-5'>
                                        <div className='flex items-center w-fit '>
                                            <div className={Styles.CheckBox__style} onClick={(e) => setCheckbox(!checkbox)}>
                                                {
                                                    checkbox && (
                                                        <TiTick color="#5536DB" size={"1.4rem"} />
                                                    )
                                                }
                                            </div>
                                            <Paragraph1 className="text-[0.85rem] p-2 w-96 ">I agree to Terms and conditions and Privacy Policy</Paragraph1>
                                        </div>
                                    </div>
                                    <div className='mt-5'>
                                        <PrimaryButton text={"Login"} type={"submit"} className={"w-96"} onClick={handleSignUp} />
                                    </div>
                                    <div className='justify-center items-center mt-4 pl-16'>
                                        <Paragraph1 className="justify-center text-[0.85rem]">Already have an account?<span className={Styles.registerText} onClick={handleLoginPage}>Login</span></Paragraph1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>)
            }
        </Formik>
    )
}
