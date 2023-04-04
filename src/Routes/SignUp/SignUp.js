import React, { useEffect, useState } from 'react'
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
import { useSignUp } from '../../hooks/useQueryApi';
import { Routes as AppRoute } from "../../constants/RoutesNames";
import { Checkbox } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { SelectOptionButton } from '../../components/SelectOptions';
import { optionCategoary, optionRole } from '../../constants/DropDownContent';

export const SignUp = () => {
    const navigate = useNavigate()
    const { mutateAsync } = useSignUp();
    const [checkbox, setCheckbox] = useState(false)
    const [signUpCreds, setSignUpCreds] = useState();
    const [passwordType, setPasswordType] = useState("password");
    const [confirmPasswordType, setconfirmPasswordType] = useState("password");

    const handleLoginPage = () => {
        navigate("/")
    }

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

    const showToast = (status) => {
        if (status === 200 || 201) {
            toast.success(" Sign Up Successful!!!! ", { autoClose: 1500, closeOnClick: true, position: "top-right" })
        } else {
            toast.error(" Siggn Up Failed !!!! ", { autoClose: 1500, closeOnClick: true, position: "top-right" })
        }
    };

    const handleShowPassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }

    const handleTermsCondition = (e) => {
        // console.log(e, "eventS")
        setCheckbox(!checkbox)
    }


    const handleShowConfirmPassword = () => {
        if (confirmPasswordType === "password") {
            setconfirmPasswordType("text")
            return;
        }
        setconfirmPasswordType("password")
    }

    const handleSignUp = (values) => {
        mutateAsync(values).then(res => {
            if (res.status = 200) {
                setTimeout(() => {
                    navigate(`/`);
                }, 1700);
            }
            showToast(res.status)
        })

    }


    const schema = Yup.object().shape({
        firstName: Yup.string()
            .required("Required field")
            .min(2, 'Too Short!')
            .max(20, 'Too Long!'),
        lastName: Yup.string()
            .required("Required field")
            .min(2, 'Too Short!')
            .max(20, 'Too Long!'),
        email: Yup.string()
            .required("Email is a required field")
            .email("Invalid email format"),
        password: Yup.string()
            .required("Password is a required field")
            .min(8, "Password must be at least 8 characters"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        termsAndCondition: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required')
    });

    // const bakwas = () => {
    //     console.log("uhu")
    //     showToast();
    // }



    return (
        <Formik
            validationSchema={schema}
            initialValues={{ email: "", password: "", firstName: "", lastName: "", confirmPassword: "", role: "", termsAndCondition: "false" }}
            onSubmit={(values) => {
                // setSignUpCreds(values);
                handleSignUp(values)
                console.log(values)
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                setFieldValue
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
                                                    id="firstName"
                                                    name="firstName"
                                                    className={"h-12 mt-1 w-44"}
                                                />
                                            </div>
                                            <p className={Styles.errorMsg}>
                                                {errors.firstName && touched.firstName && errors.firstName}
                                            </p>
                                        </div>
                                        <div className='pr-12'>
                                            <div className={Styles.optionText}>Last name*</div>
                                            <div>
                                                <InputFieldWithoutCounter
                                                    type={"text"}
                                                    onChange={handleChange}
                                                    placeholder="Enter your last name..."
                                                    id="lastName"
                                                    name="lastName"
                                                    className={"h-12 mt-1 w-44"}
                                                />
                                            </div>
                                            <p className={Styles.errorMsg}>
                                                {errors.lastName && touched.lastName && errors.lastName}
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
                                                id="email"
                                                name="email"
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
                                                    id="password"
                                                    name="password"
                                                    type={passwordType}
                                                />
                                                {
                                                    passwordType === "password" ? <BsEyeSlash size={"1.5rem"} color="grey" className={"absolute top-4 right-1"} onClick={handleShowPassword} /> : <AiOutlineEye size={"1.5rem"} className={"absolute top-4 right-1"} onClick={handleShowPassword} />
                                                }

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
                                                    id="confirmPassword"
                                                    name="confirmPassword"
                                                    type={confirmPasswordType}
                                                />
                                                {
                                                    confirmPasswordType === "password" ? <BsEyeSlash size={"1.5rem"} color="grey" className={"absolute top-4 right-1"} onClick={handleShowConfirmPassword} /> : <AiOutlineEye size={"1.5rem"} className={"absolute top-4 right-1"} onClick={handleShowConfirmPassword} />
                                                }

                                            </div>
                                            <p className={Styles.errorMsg}>
                                                {errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
                                            </p>

                                        </div>
                                    </div>
                                    <div className=' my-3 w-96'>
                                        <div className={Styles.optionText}>Role</div>
                                        <SelectOptionButton
                                            options={optionRole.filter((ele) => ele.value)}
                                            className={colourStyles}
                                            placeholder="Role"
                                            onChange={(e) => setFieldValue("role", e.value)}
                                        // selectedValue={role}
                                        // setCurrentlySelectedOption={setCategory}
                                        />
                                    </div>
                                    <div className='flex items-center justify-between w-96'>
                                        <div className='flex items-center w-fit '>
                                            <Checkbox
                                                checked={values.termsAndCondition === "true"}
                                                // sx={{
                                                //     "&.Mui-checked": {
                                                //         color: AppColors.PRIMARYCOLOR,
                                                //     },
                                                // }}
                                                onChange={(e) =>
                                                    // console.log(e.target.checked.toString(), "dfghghmj,k")
                                                    // termsAndCondition: e.target.checked.toString,
                                                    setFieldValue("termsAndCondition", e.target.checked.toString())
                                                }
                                            />
                                            <Paragraph1 className="text-[0.85rem] p-2 w-96 ">I agree to Terms and conditions and Privacy Policy</Paragraph1>
                                        </div>
                                    </div>
                                    <p className={Styles.errorMsg}>
                                        {errors.termsAndCondition && touched.termsAndCondition && errors.termsAndCondition}
                                    </p>
                                    <div className='mt-1'>
                                        <PrimaryButton text={"Login"} type="submit" className={"w-96"} onClick={handleSignUp} />
                                        < ToastContainer theme='light' />
                                    </div>
                                    <div className='justify-center items-center mt-1 pl-16'>
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
