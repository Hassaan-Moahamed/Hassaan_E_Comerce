import React, { useContext, useEffect, useState } from "react";
import style from "./CheckOut.module.css";
import { useFormik } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import { CartContext } from "../../context/CartContext";
export default function CheckOut() {
  let { cartid } = useParams();
  let navi = useNavigate();
  const [load, setisloading] = useState(false);
  let { CheckOut } = useContext(CartContext);
  const [isonline, setIsonline] = useState(false);
  async function handleCheckOut() {
    setisloading(true);
    let url = `https://ecommerce.routemisr.com/api/v1/orders/${cartid}`;
    if (isonline) {
      url = `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartid}?url=http://localhost:5173`;
    }
    try {
      let x = await CheckOut(url, formik.values);

      if (x.data.status == "success") {
        if (isonline) {
          window.location.href = x.data.session.url;
        } else {
          navi("/allorders");
        }
      } else {
        console.log(x.data.data.status);
      }
    } finally {
      setisloading(false);
    }
  }
  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: handleCheckOut,
  });
  return (
    <>
      {/* components in flewbit  */}
      <div className="flex justify-center items-center h-screen w-full ">
        <div className="p-6 max-w-4xl py-4  w-full mx-3  bg-slate-200 shadow-lg rounded-3xl mb-48 ">
          <h1 className="mt-10 pb-6 text-4xl font-bold colo1">
            Chick out Now:
          </h1>

          {/*  onsubmit is a function on javascript special to forms to make submit it's better than button
          formik=>has a handlesubmit (form has a default refresh when submit): handlesubmit prevent this default  */}
          <form onSubmit={formik.handleSubmit} className="max-w-4xl py-16  ">
            <div className="relative z-0 w-full mb-6 group">
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.details}
                type="text"
                name="details"
                id="details"
                className="ps-4 rounded-lg block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-400 dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:border-green-400 peer"
                placeholder=" "
              />
              <label
                htmlFor="details"
                className=" ps-4 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-400 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Details:
              </label>
              <i className="fa-solid fa-circle-info absolute right-2 top-1/2 transform -translate-y-1/2 text-black dark:text-gray-400 peer-focus:text-green-400 peer-focus:dark:text-green-500"></i>

            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.phone}
                type="tel"
                name="phone"
                id="phone"
                className="ps-4 rounded-lg block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-400 dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:border-green-400 peer"
                placeholder=" "
              />
              <label
                htmlFor="phone"
                className=" ps-4 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-400 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                phone:
              </label>
              <i className="fa-solid fa-phone absolute right-2 top-1/2 transform -translate-y-1/2text-black dark:text-gray-400 peer-focus:text-green-400 peer-focus:dark:text-green-500"></i>

            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.city}
                type="text"
                name="city"
                id="city"
                className="ps-4 pr-10 rounded-lg block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-400 dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:border-green-400 peer"
                placeholder=" "
              />
              <label
                htmlFor="city"
                className="ps-4 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-400 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                City:
              </label>
              <i className="fa-solid fa-city absolute right-2 top-1/2 transform -translate-y-1/2 text-black dark:text-gray-400 peer-focus:text-green-400 peer-focus:dark:text-green-500"></i>
            </div>

            <div className="my-2 text-lg">
              <input
                type="checkbox"
                id="foronline"
                className="ms-2 rounded-full p-2 decoration-slice"
                onChange={() => setIsonline(!isonline)}
              />
              <label htmlFor="foronline" className="ms-2">
                pay online{" "}
              </label>
            </div>
            <div className="relative flex items-center">
              <button
                type="submit"
                className=" text-lg pb-4 absolute right-0 text-white colo hover:bg-colo focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg  w-auto px-5 text-center dark:bg-green-400 dark:hover:bg-green-400 dark:focus:ring-green-400"
              >
                {load ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  <>
                    <i className="fa-brands mt-4   pe-3 text-2xl text-blue-600 fa-amazon-pay"></i>
                    {isonline ? "Pay Online Now" : "cash on delivery"}
                  </>
                )}
              </button>
              <h1 className="text-lg ms-2">
                return:{" "}
                <Link to={"/home"}>
                  <span className="font-semibold"> To Home?</span>
                </Link>
              </h1>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
