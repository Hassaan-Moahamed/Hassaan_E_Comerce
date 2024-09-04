import React, { useEffect, useState } from "react";
import style from "./Register.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';


export default function Register() {
  const [counter, setCounter] = useState(0);
  const[Error,setError]=useState(false)
  const[ApiError,setApiError]=useState(null)
  const[load,setLoading]=useState(false);

  useEffect(() => { }, []);
  //useNavigate is  a hook in react router dom to send to specific path
  let navigate = useNavigate();
  async function handleRegister(formikvalues) {
    setLoading(true)
   axios.post( `https://ecommerce.routemisr.com/api/v1/auth/signup`, formikvalues)
   .then((response) => {
    setError(false)
    setLoading(false)
    if(response.data.message=='success'){
      localStorage.setItem('token',response.data.token)
      navigate('/login')
    }
    else{

    }
   })
   .catch((ApiResponse)=>{ 
    setLoading(false)
    setError(true)
    setApiError(ApiResponse?.response?.data?.message)
    })
 

  }
  //validate
  let validationSchema = Yup.object().shape({
    name: Yup.string().required('name is required').min(3, 'min legth of char is 3').max(20, 'max legth of char is 20'),
    email: Yup.string().email('invalid email address').required('email is required'),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, 'the phone number should start with 01 and max nums is 11').required('phone is required'),
    password: Yup.string().matches(/^[A-Z][a-z]{9}$/, 'password should start with an uppercase letter followed by 9 lowercase letters').required('password is required'),
    rePassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must the same on password').required('rePassword is required'),
  });

  //ussformik  sent parameters to the function which onsubmit did by default like=> onSubmit: handleRegister,
  //hook => useformik =>take object => firt property is initialValues =>take obgect
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",

    },
    validationSchema: validationSchema,
    //onsubmit(property) :i give her function that i want call when i want submit formik
    onSubmit: handleRegister,
  });
  return (
    <>
     <div className="flex justify-center items-center h-screen w-full">
       {/* components in flewbit  */}
       <div className="p-6 max-w-4xl lg:py-4 lg:mx-auto  w-full  bg-slate-200 shadow-lg my-4 mx-8 rounded-3xl lg:mb-48">
        <h1 className="pb-6 mt-10 text-4xl font-bold colo1">Register Now:</h1>
        {Error? <div
              className="p-4 mb-4 text-sm text-red-800ps-4 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {ApiError}
              
            </div>:null}
       
        {/*  onsubmit is a function on javascript special to forms to make submit it's better than button
        formik=>has a handlesubmit (form has a default refresh when submit): handlesubmit prevent this default  */}
        <form onSubmit={formik.handleSubmit} className="max-w-4xl   py-16 ">
          <div className="relative z-0 w-full mb-6 group">
            {/* to link input witj useformik :in every input ther is attribute call name you should write in name the same name in useformik (name="name")
            and value={object.valuse.(nameofProperty)} 
            onchange=>in javascript when any chane did in input: and there is a function in formik do this(handleChange)and link this with onchange
            onblur=> exit from input is the opposite of focus :and there is a function in formik do this(handleBlur)
            learn more in web formik DOC */}
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              type="text"
              name="name"
              id="name"
              className=" ps-4 rounded-lg block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-400 dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:border-green-400 peer"
              placeholder=" "

            />
            <label
              htmlFor="name"
              className=" ps-4  peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-400 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              name:
            </label>
            <i className="text-black fa-solid fa-user absolute right-2 top-1/2 transform -translate-y-1/2  dark:text-gray-400 peer-focus:text-green-400 peer-focus:dark:text-green-500"></i>

          </div>

          {formik.errors.name && formik.touched.name ? (
            <div
              className="p-4 mb-4 text-sm text-red-800ps-4 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.name}
            </div>
          ) : null}

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
            <i className="text-black fa-solid fa-envelope absolute  right-2 top-1/2 transform -translate-y-1/2  dark:text-gray-400 peer-focus:text-green-400 peer-focus:dark:text-green-500"></i>

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
              value={formik.values.phone}
              type="tel"
              name="phone"
              id="phone"
              className=" ps-4 rounded-lg block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-400 dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:border-green-400 peer"
              placeholder=" "
            />
            <label
              htmlFor="phone"
              className="  ps-4 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-400 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              phone:
            </label>
            <i className="text-black fa-solid fa-phone absolute right-2 top-1/2 transform -translate-y-1/2  dark:text-gray-400 peer-focus:text-green-400 peer-focus:dark:text-green-500"></i>

          </div>
          {formik.errors.phone && formik.touched.phone ? (
            <div
              className="p-4 mb-4 text-sm text-red-800ps-4 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.phone}
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
            <i className="text-black fa-solid fa-lock absolute  right-2 top-1/2 transform -translate-y-1/2  dark:text-gray-400 peer-focus:text-green-400 peer-focus:dark:text-green-500"></i>

          </div>
          {formik.errors.password && formik.touched.password ? (
            <div
              className="p-4 mb-4 text-sm text-red-800ps-4 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.password}
            </div>
          ) : null}
          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.rePassword}
              type="password"
              name="rePassword"
              id="rePassword"
              className="ps-4 rounded-lg block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-400 dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:border-green-400 peer"
              placeholder=" "
            />
            <label
              htmlFor="rePassword"
              className=" ps-4 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-400 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              rePassword:
            </label>
            <i className="text-black fa-solid fa-lock absolute  right-2 top-1/2 transform -translate-y-1/2  dark:text-gray-400 peer-focus:text-green-400 peer-focus:dark:text-green-500"></i>

          </div>
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div
              className="p-4 mb-4 text-sm text-red-800ps-4 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.rePassword}
            </div>
          ) : null}
           <div className="relative flex items-center">
            <button
              type="submit"
              className="  absolute right-0 text-white colo hover:bg-colo focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm  w-auto px-5 py-2.5 text-center dark:bg-green-400 dark:hover:bg-green-400 dark:focus:ring-green-400"
            >
              {load? <i className="fas fa-spinner fa-spin"></i>:'submit'}
          
            </button>
            <h1>Do you have already account? <Link to={'/login'}><span className='font-semibold'>Login now</span></Link>
            </h1>
          </div>
        </form>
      </div>
     </div>
    </>
  );
}
