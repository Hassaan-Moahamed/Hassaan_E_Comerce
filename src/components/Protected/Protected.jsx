import React, { useEffect, useState } from 'react'
import style from './Protected.module.css'
import { Navigate } from 'react-router-dom';

export default function Protected(props) {
    const [counter, setCounter] = useState(0);
  if(localStorage.getItem('token')!=null){
  return props.children
  }
  else{
   return <Navigate to={'/login'}/>
  }
}
