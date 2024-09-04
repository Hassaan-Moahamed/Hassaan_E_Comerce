import React, { useContext, useEffect, useState } from "react";
import style from "./Navbar.module.css";
import logo from "../../assets/images/logo-image.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from '../../context/UserContext';
import { CartContext } from "../../context/CartContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  let { UserToken, setUserToken } = useContext(UserContext);
  const [isloading, setisloading] = useState(false);
  let {count}=useContext(CartContext)
  function LogOut() {
    setUserToken(null);
    localStorage.removeItem('token');
  }
  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }
  return (
    <div className="bg-gray-200 fixed top-0 right-0 left-0 w-full z-50">
      <div className="container mx-auto flex flex-col lg:flex-row items-center ">
        <div className="left-side flex items-center justify-between w-full lg:w-auto ">
          <img className="ps-2 py-2 lg:pt-0 " width={150} src={logo} alt="Logo" />
          <button
            onClick={toggleMenu}
            className="text-green-700 my-2 me-4 border border-green-700 p-2 rounded-lg text-xl lg:hidden block focus:outline-none"
          >
            <i className="fa fa-bars"></i>
          </button>
        </div>
        <div
          className={`transition-max-height duration-500 overflow-hidden flex-col lg:flex-row items-center justify-between w-full lg:w-full ${isMenuOpen ? 'max-h-96' : 'max-h-0'} lg:max-h-full lg:flex`}
        >
          {UserToken !== null ? (
            <>
              <ul className="contain flex flex-col lg:flex-row items-center lg:justify-start w-full lg:w-auto lg:ml-4">
                <li className="lg:p-4 py-2 text-lg">
                  <NavLink to="home" >Home</NavLink>
                </li>
                <li className="lg:p-4 py-2  text-lg">
                  <NavLink to="cart">Cart</NavLink>
                </li>
                <li className="lg:p-4 py-2  text-lg">
                  <NavLink to="wishList">WishList</NavLink>
                </li>
                <li className="lg:p-4 py-2  text-lg">
                  <NavLink to="categories">Categories</NavLink>
                </li>
                <li className="lg:p-4 py-2  text-lg">
                  <NavLink to="brands">Brands</NavLink>
                </li>
              </ul>
              <ul className="right-side flex flex-col lg:flex-row items-center justify-end">
              <li className="lg:p-4 relative mt-2  ">
                  <NavLink to="cart"><i className="fa-solid fa-cart-shopping text-3xl text-black  ">
                 </i></NavLink>
                 <h1 className="absolute right-[-10px] top-[-15px] lg:top-0 px-2 bg-green-400  rounded-lg text-white lg:right-2"> {count}</h1>
                </li>
                <li className="lg:p-1 lg:mx-4">
                  <i className="fa-brands py-3  text-orange-700 rounded-full mx-1 text-xl  fa-instagram"></i>
                  <i className="fa-brands py-3 text-blue-800 rounded-full mx-1 text-xl fa-facebook"></i>
                  <i className="fa-brands py-3 rounded-full mx-1 text-xl fa-tiktok"></i>
                  <i className="fa-brands py-3  text-blue-500  rounded-full mx-1 text-xl fa-twitter"></i>
                  <i className="fa-brands py-3  text-blue-800  rounded-full mx-1 text-xl fa-linkedin"></i>
                  <i className="fa-brands py-3  text-red-600  rounded-full mx-1 text-xl fa-youtube"></i>
                </li>
                <li onClick={LogOut} className="lg:p-2 py-2  text-lg">
                  <NavLink to="login">Sign Out</NavLink>
                </li>
              </ul>
            </>
          ) : (
            <ul className="right-side flex flex-col lg:flex-row items-center lg:w-full justify-end py-4">
              <li className="lg:p-2 py-2">
                <NavLink to="">Register</NavLink>
              </li>
              <li className="lg:p-2 py-2">
                <NavLink to="login">Log in</NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}