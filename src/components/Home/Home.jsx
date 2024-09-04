import React, { useContext, useEffect, useState } from "react";
import style from "./Home.module.css";
import { CounterContext } from "../../context/CounterContext";
import RecentProducts from "./../RecentProducts/RecentProducts";
import CategoriesSlider from "./../CategoriesSlider/CategoriesSlider";
import MainSlider from "../MainSlider/MainSlider";
import Loader from "../Loader/Loader";
import { UserContext } from "../../context/userContext";
import { CartContext } from "../../context/CartContext";

export default function Home() {
  let { counter, setCounter } = useContext(CounterContext);
  let { UserToken, setUserToken } = useContext(UserContext);
  let { count } = useContext(CartContext);

  return (
    <>
      <div>{UserToken && count !== null ? <RecentProducts /> : <Loader />}</div>
    </>
  );
}
