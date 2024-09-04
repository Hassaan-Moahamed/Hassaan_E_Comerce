import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
import Loader from '../Loader/Loader';
import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { BallTriangle } from 'react-loader-spinner'; 
import logo from "../../assets/images/logo-image.svg";

export default function ProductDetails() {
  let { id, categorey } = useParams()
  
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loadingProductId, setLoadingProductId] = useState(null)
  let {setCount,getAddProduct} = useContext(CartContext);
  async function getAddprod(prodId) {
    setLoadingProductId(prodId); 
    let response = await getAddProduct(prodId);
    setLoadingProductId(null); 

    if(response.data.status === "success") {
      setCount(response.data.numOfCartItems);   
      toast.success(response.data.message, {
        position: 'top-right',
        className: 'bg-green-300',
        icon: '🚀',
        style: {
          marginTop: '40px',
          marginRight: '50px',
          backgroundColor: '#4FA74F', 
          color: '#000', 
        },

      });
    } else {
      toast.error(response.data.message, {
        position: 'top-right',
        icon: '⚠️',
        style: {
          marginTop: '20px',
          backgroundColor: 'red', 
          color: '#000', 
        },

      });
    }
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  function getProductDetails(id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProduct(data.data);
      })
      .catch((error) => {

      })
  }
  function getRelatedProduct(categorey) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        let relatedProd = data.data.filter((product) => product.category.name == categorey)
        setRelated(relatedProd)
      })
      .catch(() => {
      })
  }
  useEffect(() => {
    getProductDetails(id)
    getRelatedProduct(categorey)
  }, [id, categorey])
  if(product==null){
    return  <Loader/>
  }
  
  return <>
    <div className="row  shadow-2xl rounded-xl shadow-slate-300 lg:px-2">
      <div className="w-full lg:w-1/4">
        <div className="p-8 w-full ">
          {/* this because in ps5 dual product in electronic */}
          {product?.images.length === 1 ? <img className='p-4 w-3/4' src={product.images} alt="" /> : <Slider {...settings}>
            {product?.images.map((src) => <img key={product.id} className='p-4 w-3/4' src={src} alt="" />
            )}</Slider>}

        </div>
      </div>
      <div className="lg:w-3/4 text-center lg:text-left  ps-12">
        <h1 className='font-semibold text-xl'>{product?.title}</h1>
        <h1 className=' text-sm text-gray-400 tex lg:ms-8 lg: my-4'>{product?.description}</h1>
        <h1 className='ps-2 text-green-400'>{product?.category.name}</h1>
        <div className="flex justify-between  lg: ps-2  pt-1">
          <span >{product?.price} EGP</span>
          <div>
            <i className='fa fa-star text-yellow-300 pe-1'></i>
            <span className='pe-6'>{product?.ratingsAverage}</span>
          </div>
        </div>
        <button 
                onClick={() => getAddprod(product.id)} 
                className='btn' 
              
              >
                {loadingProductId === product.id ? (
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
                       <img
                         src={logo}
                         className="absolute inset-0 m-auto" 
                       />
                     </div>
                   </div>
                ) : 'Add to cart'}
              </button> 
      </div>
    </div>
    <h1 className=' px-6 py-8 text-green-400 font-semibold text-2xl'>Related Products:</h1>
    <div className="row  my-2 shadow-2xl rounded-xl  shadow-slate-500">
      {
        related.map((product) => <div key={product.id} className="w-1/2  lg:w-1/6 px-6 ">
          <div className='product my-6' >
            <Link to={`/productdetails/${product.id}/${product.category?.name}`}>
              <img className='w-full' src={product.imageCover} alt="" />
              <h1 className='text-green-400 p-2'>{product.category.name}</h1>
              <h2 className=' px-2'>{product.title.split(' ').slice(0, 2).join(' ')}</h2>
              <div className="flex justify-between ps-2  pt-1">
                <span >{product.price} EGP</span>
                <div>
                  <i className='fa fa-star text-yellow-300 pe-1'></i>
                  <span>{product.ratingsAverage}</span>
                </div>
              </div>
            </Link>
            <button 
                onClick={() => getAddprod(product.id)} 
                className='btn' 
              
              >
                {loadingProductId === product.id ? (
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
                       <img
                         src={logo}
                         className="absolute inset-0 m-auto" 
                       />
                     </div>
                   </div>
                ) : 'Add to cart'}
              </button>          </div>
        </div>)
      }
    </div>
  </>
}
