import React, { useContext, useEffect, useState } from "react";
import style from "./Cart.module.css";
import { CartContext } from "../../context/CartContext";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

export default function Cart() {
  const [CartItem, setCartItem] = useState(null);
  const [isloading, setisloading] = useState(false);
  const [LoadingDelet , setLoadingDelet] = useState(null);
  const [LoadingAdd , setLoadingAdd] = useState(null);

  const {
    setCount,
    carid,
    setcarid,
    getLoggedUserCart,
    getUpdateProduct,
    getDeletProduct,
    getDeletAllProduct,
  } = useContext(CartContext);
  async function getCartItems() {
    setisloading(false);
    try {
      let x = await getLoggedUserCart()
          setCartItem(x.data.data);
          setcarid(x.data.data._id);
    } 
     catch 
    {

    }
    finally {
      setisloading(true);
    }
  }

  async function getUpdateCartItems(prodId, proCount) {
    setLoadingAdd(prodId);
    try {
      let x = await getUpdateProduct(prodId, proCount);

      setCartItem(x.data.data);
    } finally {
      setLoadingAdd(null);
    }
  }
  async function getDeletCartItems(prodId) {
    setLoadingDelet(prodId)
    try {
      let x = await getDeletProduct(prodId);
      setLoadingDelet(null)
      setCount(x.data.numOfCartItems);
      setCartItem(x.data.data);
    
      
    } finally {
      
    }
  }
  async function getDeletCart() {
    setisloading(false);
    try {
      let x = await getDeletAllProduct();
      setCount(0);
      setCartItem(x.data.data);
    } finally {
      setisloading(true);
    }
  }
  useEffect(() => {
    getCartItems();
  }, []);
  if (isloading == false) {
    return <Loader />;
  }

  return (
    <>
      {isloading ? (
        <>
          {CartItem == null || CartItem.products.length == 0 ? (
            <>
              <h1 className="font-bold text-center text-3xl pt-2 pb-2 text-green-400 ">
                Cart SHop
              </h1>
              <div className="flex h-[500px] justify-center items-center   text-center bg-slate-100 my-1 rounded-xl ">
                <h1 className="font-bold text-2xl py-16  text-red-400 ">
                  <i className="fa-solid fa-triangle-exclamation px-2 text-yellow-400"></i>
                  Your Cart Is Empty: Please Add Product{" "}
                </h1>
              </div>
            </>
          ) : (
            <>
              <h1 className="font-bold text-center text-3xl pt-2 pb-2 text-green-400 ">
                Cart SHop
              </h1>

              <div className="flex sm:flex-row flex-col justify-center items-center   sm:justify-between bg-slate-100 my-1 rounded-xl ">
                <Link to={`/checkout/${carid}`}>
                  <button className="btn3 text-xl  ms-3 ">Check Out</button>
                </Link>
                <h1 className="font-bold text-2xl py-2 sm:py-4 ps-3">
                  Total Price :{" "}
                  <span className="text-green-400 text-xl">
                    {CartItem?.totalCartPrice} EGP
                  </span>
                </h1>
                <h1 className="font-bold text-lg pb-2 sm:py-2 sm:pe-3 ps-4">
                  Total Number Of Items:{" "}
                  <span className="text-green-400 text-xl">
                    {CartItem?.products.length}{" "}
                  </span>
                </h1>
              </div>
              <div className="relative overflow-x-auto shadow-md sm:rounded-xl bg-slate-100">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <tbody>
                    {CartItem?.products.map((prod) => (
                      <tr
                        key={prod._id}
                        className="border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600 flex flex-col sm:flex-row  justify-center items-center sm:justify-between"
                      >
                        <td className="p-4 sm:w-1/5">
                          <img
                            src={prod.product.imageCover}
                            className="h-[250px] lg:h-full w-full md:w-3/5 "
                            alt={prod.product.title}
                          />
                        </td>
                        <td className="px-6 py-4 font-semibold text-xl text-gray-900 dark:text-white sm:w-1/5">
                          {prod.product.title.split(" ").slice(0, 4).join(" ")}
                        </td>
                        <td className="px-6 py-4 sm:w-1/5">
                          <div className="flex items-center">
                          {LoadingAdd==   prod.product.id?<i className=" text-2xl px-2  fa-solid fa-cog fa-spin  text-green-600"></i>:<>  <button
                              onClick={() =>
                                getUpdateCartItems(
                                  prod.product.id,
                                  prod.count - 1
                                )
                              }
                              className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 bg-red-600 text-white border border-gray-300 rounded-full focus:outline-non focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                              type="button"
                            >
                              <span className="sr-only">Decrease Quantity</span>
                              <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 2"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M1 1h16"
                                />
                              </svg>
                            </button>
                            <div>
                              <span>{prod.count}</span>
                            </div>
                            <button
                              onClick={() =>
                                getUpdateCartItems(
                                  prod.product.id,
                                  prod.count + 1
                                )
                              }
                              className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium bg-green-400 text-white border border-gray-300 rounded-full focus:outline-none  focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                              type="button"
                            >
                              <span className="sr-only">Increase Quantity</span>
                              <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 18"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 1v16M1 9h16"
                                />
                              </svg>
                            </button></>}
                          
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white sm:w-1/5">
                          {prod.price} EGP
                        </td>
                        <td className="px-6 py-4 sm:w-1/5">
                          <span
                            onClick={() => getDeletCartItems(prod.product.id)}
                            className="cursor-pointer font-medium text-red-600 dark:text-red-500 "
                          >
                       {LoadingDelet==prod.product.id?<i className=" text-2xl px-2  fa-solid fa-cog fa-spin  text-red-600"></i>:<div>  <i className="fa-solid fa-trash px-2"></i>
                        Remove</div>}   
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-2 flex items-center justify-center">
                <button
                  onClick={() => getDeletCart()}
                  className="btn2 text-xl "
                >
                  Clear Alll Product
                </button>
              </div>
            </>
          )}{" "}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
