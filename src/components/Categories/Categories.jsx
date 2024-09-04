import React, { useEffect, useState } from "react";
import style from "./Categories.module.css";
import axios from "axios";
import Loader from "../Loader/Loader";

export default function Categories() {
  let [categiryItems, setcategiryItems] = useState([]);
  let [subcategiryItems, setSubcategiryItems] = useState([]);
  let [selectedcategry, setSelectedcategry] = useState('');

  const [loadingCategiry, setLoadingCategiry] = useState(false);

 async function getCategries() {
    setLoadingCategiry(true)
    let x= await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    .then((res) => {
      setcategiryItems(res.data.data);
    })
    .catch((res) => {
      console.log(res);
    }) 
    setLoadingCategiry(false)
  }
  async function getSubCategries(prodId,prodName) {
    setLoadingCategiry(true)
  
    let x= await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${prodId}/subcategories`)
    .then((res) => {
      setSubcategiryItems(res.data.data);
      setSelectedcategry(`${prodName} category` ) 
    })
    .catch((res) => {
      console.log(res);
    }) 
    setLoadingCategiry(false)

  }
  useEffect(() => {
    getCategries()
  }, []);
  if(loadingCategiry){
   return <Loader/>
  }
  return (
    <>
           <h1 className="text-4xl text-center font-bold text-green-500 my-4"> categories</h1>

      <div className=" row   ">
        {categiryItems?.map((prod) => (
          <div className="mx-6 lg:mx-0 w-full lg:w-1/3 py-5 rounded-xl " key={prod._id}>
            <div className="px-2 lg:px-8 rounded-xl ">
             <button onClick={()=> getSubCategries(prod._id,prod.name)} className="w-full  h-[400px] lg:h-full btn6  categries rounded-xl border-spacing-4"> <div className="text-center border-separate border-green-500">
                <img
                  src={prod.image}
                  className="rounded-t-xl h-[300px]  lg:h-[400px] w-full "
                  alt=""
                />
                <h1 className="text-3xl font-bold py-8 text-green-700 ">{prod.name}</h1>
              </div></button>
            </div>
          </div>
        ))}
      </div>
      <div className=" my-10">
       <h1 className="text-4xl text-center font-bold text-green-500"> {selectedcategry} </h1>
      </div>
      <div className="row  items-cente justify-center">
        {
          subcategiryItems.map((sub)=>(
             <div key={sub._id} className=" px-4 w-full lg:w-1/4 my-8 text-center ">
               <div className="border-2 shadow-xl py-4 border-slate-600 ">
               <h1  className="text-2xl font-bold ps-6 lg:h-[50px] ">
                    {sub.name}
                </h1>
               </div>
             </div>
          ))
        }
      </div>
    </>
  );
}
