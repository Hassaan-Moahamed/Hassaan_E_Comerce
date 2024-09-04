import { createContext, useState } from "react";
import Login from "../components/Login/Login";

export let CounterContext= createContext(0);
export default  function CounterContextProvider(props){

    let[counter,setCounter]=useState(0);
      
       
    return<CounterContext.Provider value={{counter ,setCounter}}>
    {props.children}
    </CounterContext.Provider>
}