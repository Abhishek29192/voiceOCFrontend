import React from 'react'
import { Formik } from "formik";
import * as Yup from "yup";
import Styles from "./Login.module.css"
import LoginPage from "../../components/Images/LoginPage.svg"
import { InputFieldWithoutCounter } from '../../components/InputField'
import { HiOutlineMail } from "react-icons/hi"
import { IoKeyOutline } from "react-icons/io5"
import { TiTick } from "react-icons/ti"

export const Login = () => {

  const schema = Yup.object().shape({
    email: Yup.string()
      .required("Email is a required field")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is a required field")
      .min(8, "Password must be at least 8 characters"),
  });

  ///
  return (
    <>
      <Formik
        validationSchema={schema}
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          // Alert the input values of the form that we filled
          alert(JSON.stringify(values));
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (<div className='justify-center items-center border h-full flex absolute w-full'>
          <div className={Styles.body}>
            <form noValidate onSubmit={handleSubmit}>
              <div className='flex w-full'>
                <div className='w-1/2'>
                  <div className='w-[80%] h-[90%]'>
                    <img src={LoginPage} />
                  </div>
                </div>
                <div className='w-1/2'>
                  {/* login------------------------ */}
                  <div className={Styles.LoginText}>Login</div>
                  {/* email------------------------------ */}
                  <div className=''>
                    <div className={Styles.optionText}>Email</div>
                    <div className='relative w-fit'>
                      {/* <div className={styles.input__container}> */}
                      <InputFieldWithoutCounter
                        type={"Email"}
                        placeholder="Email..."
                        className={"h-12 mt-1 w-96"}
                      />
                      <HiOutlineMail size={'1.5rem'} className='absolute top-4 right-1' />

                      {/* </div> */}
                    </div>
                  </div>
                  {/* Password------------------------------- */}
                  <div className='mt-4'>
                    <div className={Styles.optionText}>Password</div>
                    <div className='relative w-fit'>
                      {/* <div className={styles.input__container}> */}
                      <InputFieldWithoutCounter
                        placeholder="Password..."
                        className={"h-12 mt-1 w-96"}
                        type={"password"}
                      />
                      <IoKeyOutline size={'1.5rem'} className='absolute top-4 right-1' />

                      {/* </div> */}
                    </div>
                  </div>
                  <div className='flex mt-3 w-fit items-center'>
                    <div className={Styles.CheckBox__style} onClick={(e) => (e ? <TiTick /> : "")}></div>
                    <div className='pl-2'>Remember Me?</div>
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
