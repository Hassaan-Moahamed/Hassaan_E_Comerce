import React, { useEffect, useState } from 'react'
import style from './NotFound.module.css'
import Logoer from '../../assets/images/404.png'
export default function NotFound() {
    const [counter, setCounter] = useState(0);
    useEffect(()=>{},[])
  return<>
    <div className="flex justify-center items-center">
      <img src={Logoer} alt="" />
    </div>
  
  </>
}
