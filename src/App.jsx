import { useContext, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import Categories from "./components/Categories/Categories";
import About from "./components/About/About";
import Brands from "./components/Brands/Brands";
import Cart from "./components/Cart/Cart";
import Contact from "./components/Contact/Contact";
import Loader from "./components/Loader/Loader";
import Login from "./components/Login/Login";
import Order from "./components/Order/Order";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Register from "./components/Register/Register";
import NotFound from "./components/NotFound/NotFound";
import CounterContextProvider from "./context/CounterContext";
import UserContextProvider, { UserContext } from "./context/UserContext";
import Protected from "./components/Protected/Protected";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvider, { CartContext } from "./context/CartContext";
import { Toaster } from "react-hot-toast";
import CheckOut from "./components/CheckOut/CheckOut";
import WishList from "./components/WishList/WishList";

let query = new QueryClient();
let x = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "home",
        element: (
          <Protected>
            <Home />
          </Protected>
        ),
      },
      {
        path: "categories",
        element: (
          <Protected>
            <Categories />
          </Protected>
        ),
      },
      {
        path: "About",
        element: (
          <Protected>
            <About />
          </Protected>
        ),
      },
      {
        path: "brands",
        element: (
          <Protected>
            <Brands />
          </Protected>
        ),
      },
      {
        path: "cart",
        element: (
          <Protected>
            <Cart />
          </Protected>
        ),
      },
      {
        path: "wishList",
        element: (
          <Protected>
            <WishList />
          </Protected>
        ),
      },
      {
        path: "contact",
        element: (
          <Protected>
            <Contact />
          </Protected>
        ),
      },
      {
        path: "allorders",
        element: (
          <Protected>
            <Order />
          </Protected>
        ),
      },
      {
        path: "checkout/:cartid",
        element: (
          <Protected>
            <CheckOut />
          </Protected>
        ),
      },
      {
        path: "productdetails/:id/:categorey",
        element: (
          <Protected>
            <ProductDetails />
          </Protected>
        ),
      },
      {
        path: "loader",
        element: (
          <Protected>
            <Loader />
          </Protected>
        ),
      },
      { path: "login", element: <Login /> },
      { index: true, element: <Register /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  let { getLoggedUserCart, setCount } = useContext(CartContext);
  let { UserToken } = useContext(UserContext);

  async function getCartItems() {
    let x = await getLoggedUserCart();  
    setCount(x.data.numOfCartItems);
  }
  useEffect(() => {
    if(UserToken){
       getCartItems();
      }
   
  },[UserToken]);
  return (
    <QueryClientProvider client={query}>
     <UserContextProvider>
        <RouterProvider router={x}></RouterProvider>
        <ReactQueryDevtools initialIsOpen="false" />
        <Toaster />
        </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
