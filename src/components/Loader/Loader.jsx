import React, { useEffect, useState } from 'react';
import style from './Loader.module.css'; // Assuming custom styles are here
import logo from "../../assets/images/logo-image.svg";
import { BallTriangle } from 'react-loader-spinner';

export default function Loader() {
  const [counter, setCounter] = useState(0);

  useEffect(() => { }, []);

  return (
    <div className="h-screen flex items-center justify-center relative ">
      <div className="relative">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
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
  );
}

