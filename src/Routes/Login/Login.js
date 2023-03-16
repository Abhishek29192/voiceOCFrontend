import React, { useState } from 'react'
import { Formik } from "formik";
import * as Yup from "yup";
import Styles from "./Login.module.css"
import LoginPage from "../../components/Images/LoginPage.svg"
import { InputFieldWithoutCounter } from '../../components/InputField'
import { HiOutlineMail } from "react-icons/hi"
import { IoKeyOutline } from "react-icons/io5"
import { TiTick } from "react-icons/ti"
import { Paragraph1 } from '../../components/Typography';
import { PrimaryButton } from '../../components/Button';
import { useLogin } from '../../hooks/useQueryApi';
import { Routes as AppRoute } from "../../constants/RoutesNames";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import cookie from "react-cookies";
import 'react-toastify/dist/ReactToastify.css'

export const Login = () => {

  const { mutateAsync, data } = useLogin();
  const navigate = useNavigate();
  const [checkbox, setCheckbox] = useState(false)
  const [passwordType, setPasswordType] = useState("password")

  const handleSignUp = () => {
    navigate(`${AppRoute.register}`);
  }

  const showToast = (status) => {
    console.log(status, "status")
    if (status === true) {
      toast.success(" Login Successful!!! ", { autoClose: 1500, closeOnClick: true, position: "top-right" })
    } else {
      toast.error("Invalid Credentials !!! ", { autoClose: 1500, closeOnClick: true, position: "top-right" })
    }
  };


  const handleShowPassword = () => {
    if (passwordType === "password") {
      setPasswordType("text")
      return;
    }
    setPasswordType("password")
  }

  const schema = Yup.object().shape({
    email: Yup.string()
      .required("Email is a required field")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is a required field")
      .min(8, "Password must be at least 8 characters"),
  });

  const handleSubmitLogin = (values) => {
    mutateAsync(values).then(res => {
      console.log(res.data, "response")
      if (res.status) {
        cookie.save(
          "accessToken",
          res?.authToken,
          {}
        );
        showToast(res.status);
        setTimeout(() => {
          navigate(`${AppRoute.teamInbox}`);
        }, 1000);
      } else {
        showToast(res.status)
      }
    })

  }

  return (
    <>
      <Formik
        validationSchema={schema}
        initialValues={{ email: "", password: "", rememberMe: true }}
        onSubmit={(values) => {
          handleSubmitLogin(values)
          // console.log(JSON.stringify(values, "vallllll"));
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
              <div className='flex w-full'>
                <div className='w-1/2 flex border-r-[1px] items-center justify-center'>
                  <div className='w-[90%] h-[100%]'>
                    <img src={LoginPage} />
                  </div>
                </div>
                <div className='w-1/2 pl-10'>
                  {/* login------------------------ */}
                  <div className={Styles.LoginText}>Login</div>
                  {/* email------------------------------ */}
                  <div className=''>
                    <div className={Styles.optionText}>Email</div>
                    <div className='relative w-fit'>
                      <InputFieldWithoutCounter
                        type={"Email"}
                        onChange={handleChange}
                        placeholder="Email..."
                        id={"email"}
                        className={"h-12 mt-1 w-96"}
                      />
                      <HiOutlineMail size={'1.5rem'} className='absolute top-4 right-1' />
                    </div>
                  </div>
                  <p className={Styles.errorMsg}>
                    {errors.email && touched.email && errors.email}
                  </p>
                  {/* Password------------------------------- */}
                  <div className='mt-4'>
                    <div className={Styles.optionText}>Password</div>
                    <div className='relative w-fit'>
                      <InputFieldWithoutCounter
                        onChange={handleChange}
                        placeholder="Password..."
                        className={"h-12 mt-1 w-96"}
                        id={"password"}
                        type={passwordType}
                      />
                      <IoKeyOutline size={'1.5rem'} className='absolute top-4 right-1' onClick={handleShowPassword} />
                    </div>
                  </div>
                  <p className={Styles.errorMsg}>
                    {errors.password && touched.password && errors.password}
                  </p>
                  <div className='flex items-center justify-between w-96  mt-5'>
                    <div className='flex items-center w-fit '>
                      <div className={Styles.CheckBox__style} onClick={(e) => setCheckbox(!checkbox)}>
                        {
                          checkbox && (
                            <TiTick color="#5536DB" size={"1.4rem"} />
                          )
                        }
                      </div>
                      <Paragraph1 className="text-[0.85rem] p-2 ">Remember Me?</Paragraph1>
                    </div>
                    <Paragraph1 className="text-[0.85rem] p-2 pointer"><u>Forgot password?</u></Paragraph1>
                  </div>
                  <div className='mt-5'>
                    <PrimaryButton text={"Login"} type={"submit"} className={"w-96"} onClick={handleSubmitLogin} />
                    <ToastContainer theme='light' />
                  </div>
                  <div className='justify-center items-center mt-4 pl-10'>
                    <Paragraph1 className="text-[0.85rem]">Do not have an account?<span className={Styles.registerText} onClick={handleSignUp}>Register here</span></Paragraph1>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>)
        }
      </Formik >
    </>
  )
}
