import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export let CartContext = createContext();
export default function CartContextProvider(props) {
  let [carid, setcarid] = useState(0);
  let [count, setCount] = useState(0);
const [wishItem, setWishItem] = useState([]);
  let { UserToken } = useContext(UserContext);
let header={
  token:UserToken
}
  //WishList
  function getLoggedUserWish() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: header,
      })
      .then((responsive) => responsive)
      .catch((responsive) => responsive);
  }
  function getAddWishList(prodId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId: prodId,
        },
        {
          headers: header,
        }
      )
      .then((responsive) => responsive)
      .catch((responsive) => {
        window.location.reload();
      });
  }
  function getDeletWish(prodIdi) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${prodIdi}`, {
        headers: header,
      })
      .then((responsive) => responsive)
      .catch((responsive) => responsive);
  }
  //cart
  function getLoggedUserCart() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: header,
      })
      .then((responsive) => responsive)
      .catch((responsive) => responsive);
  }
  function getDeletProduct(prodId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${prodId}`, {
        headers: header,
      })
      .then((responsive) => responsive)
      .catch((responsive) => responsive);
  }
  function getAddProduct(prodId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: prodId,
        },
        {
          headers: header,
        }
      )
      .then((responsive) => responsive)
      .catch((responsive) => {
        window.location.reload();
      });
  }
  function getUpdateProduct(prodId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${prodId}`,
        {
          count: count,
        },
        {
          headers: header,
        }
      )
      .then((responsive) => responsive)
      .catch((responsive) => responsive);
  }
  function getDeletAllProduct() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: header,
      })
      .then((responsive) => responsive)
      .catch((responsive) => responsive);
  }
  function CheckOut(url, formvalues) {
    return axios
      .post(
        url,
        {
          shippingAddress: formvalues,
        },
        {
          headers: header,
        }
      )
      .then((responsive) => responsive)
      .catch((responsive) => responsive);
  }
 
  return (
    <CartContext.Provider
      value={{
        count,
        setCount,
        carid,
        wishItem,
        setWishItem,
        getDeletWish,
        getAddWishList,
        getLoggedUserWish,
        setcarid,
        CheckOut,
        getLoggedUserCart,
        getAddProduct,
        getUpdateProduct,
        getDeletProduct,
        getDeletAllProduct,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
