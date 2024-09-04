import React, { useEffect, useState } from 'react'
import style from './MainSlider.module.css'
import slider1 from '../../assets/images/slider-image-1.jpeg'
import slider2 from '../../assets/images/slider-image-2.jpeg'
import slider3 from '../../assets/images/slider-image-3.jpeg'
import Slider from "react-slick";
export default function MainSlider() {
  const [counter, setCounter] = useState(0);
  useEffect(() => { }, [])
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    slickPrev:(false),
    arrows: false,
   
  };
  return <>

    <div className="row  ">
      <div className="w-2/3">
      <Slider {...settings}>
       <img src={slider1} className='w-full h-[300px] lg:h-[600px] ' alt="" />
       <img src={slider2} className='h-[300px] lg:h-[600px]' alt="" />
       <img src={slider3} className='h-[300px] lg:h-[600px]'  alt="" />
      </Slider>
      </div>
      <div className="w-1/3">
      <img src={slider2} className='w-full h-[150px] lg:h-[300px]' alt="" />
      <img src={slider3} className='w-full h-[150px] lg:h-[300px]' alt="" />
      </div>
    </div>
  </>
}
