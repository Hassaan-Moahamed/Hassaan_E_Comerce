import React, { useContext, useEffect, useState } from "react";
import style from "./Login.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../context/UserContext";

export default function Login() {
  const [Error, setError] = useState(false);
  const [ApiError, setApiError] = useState(null);
  const [load, setLoading] = useState(false);
  let { setUserToken } = useContext(UserContext);
  useEffect(() => {}, []);
  let navigate = useNavigate();
  async function handleLogIn(formikvalues) {
    setLoading(true);
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, formikvalues)
      .then((response) => {
        setError(false);
        setLoading(false);
        if (response.data.message == "success") {
          localStorage.setItem("token", response.data.token);
          setUserToken(response.data.token);
          navigate("/home");
        } else {
        }
      })
      .catch((ApiResponse) => {
        setLoading(false);
        setError(true);
        setApiError(ApiResponse?.response?.data?.message);
        console.log(ApiResponse);
      });
  }
  let validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("invalid email address")
      .required("email is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z]{9}$/,
        "password should start with an uppercase letter followed by 9 lowercase letters"
      )
      .required("password is required"),
  });

  //ussformik  sent parameters to the function which onsubmit did by default like=> onSubmit: handleRegister,
  //hook => useformik =>take object => firt property is initialValues =>take obgect
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    //onsubmit(property) :i give her function that i want call when i want submit formik
    onSubmit: handleLogIn,
  });
  return (
    <>
      {/* components in flewbit  */}
      <div className="flex justify-center items-center h-screen w-full">
        <div className="p-6 max-w-4xl py-4 w-full lg:mx-auto bg-slate-200 shadow-lg rounded-3xl mx-8 lg:mb-48">
          <h1 className="mt-10 pb-6 text-4xl font-bold colo1">LogIn Now:</h1>
          {Error ? (
            <div
              className="p-4 mb-4 text-sm text-red-800ps-4 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {ApiError}
            </div>
          ) : null}

          {/*  onsubmit is a function on javascript special to forms to make submit it's better than button
        formik=>has a handlesubmit (form has a default refresh when submit): handlesubmit prevent this default  */}
          <form onSubmit={formik.handleSubmit} className="max-w-4xl  py-16  ">
            <div className="relative z-0 w-full mb-6 group">
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                type="email"
                name="email"
                id="email"
                className="ps-4 rounded-lg block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-400 dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:border-green-400 peer"
                placeholder=" "
              />
              <label
                htmlFor="email"
                className=" ps-4 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-400 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                email:
              </label>
              <i className="fa-solid fa-envelope absolute  right-2 top-1/2 transform -translate-y-1/2 text-black dark:text-gray-400 peer-focus:text-green-400 peer-focus:dark:text-green-500"></i>

            </div>
            {formik.errors.email && formik.touched.email ? (
              <div
                className="p-4 mb-4 text-sm text-red-800ps-4 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.email}
              </div>
            ) : null}

            <div className="relative z-0 w-full mb-6 group">
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
                type="password"
                name="password"
                id="password"
                className="ps-4 rounded-lg block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-400 dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:border-green-400 peer"
                placeholder=" "
              />
              <label
                htmlFor="password"
                className=" ps-4 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-400 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                password:
              </label>
              <i className="fa-solid fa-lock absolute  right-2 top-1/2 transform -translate-y-1/2 text-black dark:text-gray-400 peer-focus:text-green-400 peer-focus:dark:text-green-500"></i>

            </div>
            {formik.errors.password && formik.touched.password ? (
              <div
                className="p-4 mb-4 text-sm text-red-800ps-4 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.password}
              </div>
            ) : null}

            <div className="relative flex items-center">
              <button
                type="submit"
                className="  absolute right-0 text-white colo hover:bg-colo focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm  w-auto px-5 py-2.5 text-center dark:bg-green-400 dark:hover:bg-green-400 dark:focus:ring-green-400"
              >
                {load ? <i className="fas fa-spinner fa-spin"></i> : "LogIn"}
              </button>
              <h1>
                Do you want register?{" "}
                <NavLink to={"/"}>
                  <span className="font-semibold">Register now</span>
                </NavLink>
              </h1>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
