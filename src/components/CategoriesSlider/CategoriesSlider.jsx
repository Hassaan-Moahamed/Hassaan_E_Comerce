import React, { useEffect, useState } from 'react';
import style from './CategoriesSlider.module.css';
import axios from 'axios';
import Slider from "react-slick";
import Loader from '../Loader/Loader';
import { useQuery } from '@tanstack/react-query';
export default function CategoriesSlider() {

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 2,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: true,
          slidesToShow: 6,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          dots: true,
          slidesToShow: 4,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          dots: true,
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      }
    ]
  };
  function getProduct() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
  let  { data, isLoadingError, error, isLoading } = useQuery({
    queryKey:[ 'productslider'],
    queryFn: getProduct
  })  
  if (isLoading) {
    return <Loader />
  }
  if (isLoadingError) {
    return <div className='h-screen flex items-center justify-center'>
      <h3>{error}</h3>
    </div>
  }
  
  return (
    <div className='py-6'>
      <h2 className='font-thin text-gray-600 text-xl py-2 ps-3'>Shop Popular Categories</h2>
      <Slider {...settings}>
        {data.data.data.map((category) =><div key={category._id}>
            <img className={`w-full ${style.image}`} src={category.image} alt={category.name} />
            <h2 className='ps-2 pt-2 font-light text-gray-600'>{category.name}</h2>
          </div>
        )}
      </Slider>
    </div>
  );
}
