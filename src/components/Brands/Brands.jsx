import React, { useEffect, useState } from 'react'
import style from './Brands.module.css'
import axios from "axios";
import Loader from "../Loader/Loader";
export  default function Brands() {
 
  let [categiryItems, setcategiryItems] = useState([]);
  const [loadingBrand, setLoadingBrand] = useState(false);

 async function getProduct() {
    setLoadingBrand(true)
    let x= await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
    .then((res) => {
      setcategiryItems(res.data.data);
      
    
    })
    .catch((res) => {
      console.log(res);
    }) 
    setLoadingBrand(false)
  }
  useEffect(() => {
    getProduct();
  }, []);
  if(loadingBrand){
   return <Loader/>
  }
  return (
    <>
    <h1 className=' text-center text-4xl font-bold my-6 text-green-400'>All Brands</h1>
      <div className=" row   ">
        {categiryItems?.map((prod) => (
          <div className="mx-6 lg:mx-0 w-full lg:w-1/4 py-5 rounded-xl " key={prod._id}>
            <div className="px-2 lg:px-8 rounded-xl ">
             <button className="w-full  h-[400px] lg:h-[300px] btn6  categries rounded-xl border-spacing-4"> <div className="text-center border-separate border-green-500">
                <img
                  src={prod.image}
                  className="rounded-t-xl h-[300px]  lg:h-[200px] w-full "
                  alt=""
                />
                <h1 className="text-3xl font-bold py-8 text-green-700">{prod.name}</h1>
              </div></button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
