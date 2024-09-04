import React, { useContext, useEffect, useState } from "react";
import style from "./RecentProducts.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";
import MainSlider from "../MainSlider/MainSlider";
import logo from "../../assets/images/logo-image.svg";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import { CartContext } from "../../context/CartContext";
import toast from "react-hot-toast";
import { BallTriangle } from "react-loader-spinner";

export default function RecentProducts() {
  const { getAddWishList, setCount, getAddProduct, getDeletWish, wishItem, setWishItem } = useContext(CartContext);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [iconLoad, setLiconLoad] = useState(null);

  async function getAddprod(prodId) {
    setLoadingProductId(prodId);
    let response = await getAddProduct(prodId);
    setLoadingProductId(null);
    if (response.data.status === "success") {
      setCount(response.data.numOfCartItems);
      toast.success(response.data.message, {
        position: "top-right",
        className: "bg-green-300",
        icon: <span style={{ fontSize: '30px' }}>🚀</span>,
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

  async function getAddWish(prodId) {
    setLiconLoad(prodId)
    let response = await getAddWishList(prodId);
    if (response.data.status === "success") {
      setLiconLoad(null)
      setWishItem([...wishItem, { _id: prodId }]);//this by chat gpt bacause i couldn't do rerender when i click on heart icon i need feeedback her please
      toast.success(response.data.message, {
        position: "top-right",
        className: "bg-green-300",
        icon: <span style={{ fontSize: '30px' }}>❤️</span>,
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
    setLiconLoad(prodId)

    try {
      await getDeletWish(prodId);
      setWishItem(wishItem.filter((prod) => prod._id !== prodId));
    } catch {
    
    }
    setLiconLoad(null)
  }

  function getProduct() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  const { data, isLoadingError, error, isLoading } = useQuery({
    queryKey: ["productdetails"],
    queryFn: getProduct,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isLoadingError) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h3>{error}</h3>
      </div>
    );
  }
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<i key={i} className="fa fa-star text-yellow-300"></i>);
      } else {
        stars.push(<i key={i} className="fa fa-star text-gray-300"></i>);
      }
    }
    return stars;
  };
  return (
    <>
      <MainSlider />
      <CategoriesSlider />
      <div className="row mt-20">
        {data?.data.data.map((product) => {
          const isInWishlist = wishItem?.some((prod) => prod._id === product.id);

          return (
            <div key={product.id} className="w-1/2 lg:w-1/5 px-4 pb-8">
              <div className="product px-2 relative">
                <Link to={`/productdetails/${product.id}/${product.category?.name}`}>
                  <img src={product.imageCover} alt="" />
                  <h1 className="text-green-500 p-2 text-xl font-bold">
                    {product.category.name}
                  </h1>
                  <div className="px-2 flex justify-between">
                    <h2 className="px-2 flex justify-between">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h2>
                  </div>
                  <div className="flex flex-col lg:flex-row justify-between ps-2 pt-1">
                    <span className="text-lg font-bold">
                      {product.price} EGP
                    </span>
                    <div className="flex items-center">
                      <span className="pl-1 text-xl pe-2 font-bold">
                        {product.ratingsAverage}
                      </span>
                      {renderStars(Math.round(product.ratingsAverage))}
                    </div>
                  </div>
                </Link>
                <button onClick={() => getAddprod(product.id)} className="btn">
                  {loadingProductId === product.id ? (
                    <div className="flex items-center justify-center relative">
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
                <button
                  onClick={() =>
                    isInWishlist
                      ? getDeletWishItems(product.id)
                      : getAddWish(product.id)
                  }
                  className="btn1"
                >
                  <i
                    className={` absolute right-4 bottom-[100px] text-3xl fa-solid ${
                      iconLoad==product.id?'fa-solid fa-spinner fa-spin-pulse fa-spin-reverse text-green-400':  isInWishlist
                        ? "fa-solid fa-heart text-green-400 "
                        : "fa-solid fa-heart text-black "
                    } `}
                  ></i>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
