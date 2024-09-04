import React, { useContext,useEffect, useState } from 'react'
import style from './WishList.module.css'
import { CartContext } from "../../context/CartContext";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { BallTriangle } from "react-loader-spinner";
import logo from "../../assets/images/logo-image.svg";

export default function WishList() {
  const [isloading, setisloading] = useState(false);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [LoadingDelet , setLoadingDelet] = useState(null);

  const {getAddProduct,setCount,getDeletWish,
   getLoggedUserWish,getAddWish,setWishItem,wishItem
  } = useContext(CartContext);


  async function getWishtItems() {
    setisloading(false);
    try {
      let x = await getLoggedUserWish()
          setWishItem(x.data.data);
    } 
     catch 
    {

    }
    finally {
      setisloading(true);
    }
  }
  async function getAddprod(prodId) {
    setLoadingProductId(prodId);
    let response = await getAddProduct(prodId);
    setLoadingProductId(null);
    if (response.data.status === "success") {
      setCount(response.data.numOfCartItems);
      toast.success(response.data.message, {
        position: "top-right",
        className: "bg-green-300",
        icon:  <span style={{ fontSize: '30px' }}>🚀</span>,
        style: {
          marginTop: "40px",
          marginRight: "50px",
          backgroundColor: "#4FA74F",
          color: "#000",
        },
      });
    } else {
      toast.error(response.data.message, {
        position: "top-right",
        icon: "⚠️",
        style: {
          marginTop: "20px",
          backgroundColor: "red",
          color: "#000",
        },
      });
    }
  }
  async function getDeletWishItems(prodId) {
    try {
      setLoadingDelet(prodId)
      let x = await getDeletWish(prodId);
      setLoadingDelet(null)
      const filterWishList=wishItem.filter((prod)=>prod._id!==prodId)
      setWishItem(filterWishList)
     
    } catch 
    {
    } finally {
     
    }
  }

  useEffect(() => {
    getWishtItems() 
  }, []);
  if (isloading == false) {
    return <Loader />;
  }
  return (
    <>
      {isloading ? (
        <>
          {wishItem == null || wishItem.length == 0 ? (
            <>
              <h1 className="font-bold text-center text-3xl pt-2 pb-2 text-green-400 ">
                WishList 
              </h1>
              <div className="flex h-[500px] justify-center items-center   text-center bg-slate-100 my-1 rounded-xl ">
                <h1 className="font-bold text-2xl py-16  text-red-400 ">
                  <i className="fa-solid fa-triangle-exclamation px-2 text-yellow-400"></i>
                  Your WishList Is Empty
                </h1>
              </div>
            </>
          ) : (
            <>
              <h1 className="font-bold text-center text-3xl pt-2 pb-2 text-green-400 ">
              WishList 
              </h1>
              <div className="relative overflow-x-auto shadow-md sm:rounded-xl bg-slate-100">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <tbody>
                    {wishItem?.map((prod) => (
                      <tr
                        key={prod._id}
                        className="border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600 flex flex-col sm:flex-row  justify-center items-center sm:justify-between"
                      >
                        <td className="p-4 sm:w-1/5">
                          <img
                            src={prod.imageCover}
                            className="h-[250px] lg:h-full w-full md:w-3/5 "
                            alt={prod.title}
                          />
                        </td>
                        <td className="px-6 py-4 font-semibold text-xl text-gray-900 dark:text-white sm:w-1/5">
                          {prod.title.split(" ").slice(0, 4).join(" ")}
                        </td>
                        <td className="px-6 py-4 font-semibold text-blue-800 text-xl dark:text-white sm:w-1/5">
                          {prod.price} EGP
                        </td>
                        <td className="px-6 py-4 sm:w-1/5">
                          <span
                             onClick={()=> getDeletWishItems(prod.id)}
                            className="flex justify-center items-center cursor-pointer font-medium text-red-600 dark:text-red-500 "
                          >
                            {LoadingDelet==prod.id?<div className="fa-3x"><i className=" text-2xl px-2  fa-solid fa-cog fa-spin  text-red-600"></i></div> :<i className="fa-solid fa-trash px-2"> R e m o v e</i>}
                         
                          </span>
                        </td>
                        <td className="px-6 py-4 sm:w-1/5">
                        <button onClick={() => getAddprod(prod.id)} className=" btn2 text-xl  ">
                {loadingProductId === prod.id ? (
                  <div className=" flex items-center justify-center relative">
                    <div className="relative">
                      <BallTriangle
                        height={30}
                        width={100}
                        radius={5}
                        color="white"
                        ariaLabel="ball-triangle-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                      />
                      <img src={logo} className="absolute inset-0 m-auto" />
                    </div>
                  </div>
                ) : (
                  "Add to cart"
                )}
              </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
            </>
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
