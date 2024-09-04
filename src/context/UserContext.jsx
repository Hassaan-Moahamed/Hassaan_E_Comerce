import { createContext, useEffect, useState } from "react";
export let UserContext = createContext(0);
export default function UserContextProvider({ children }) {
  let [UserToken, setUserToken] = useState(localStorage.getItem("token")||null);
  
  return (
    <UserContext.Provider value={{ UserToken, setUserToken }}>
      {children}
    </UserContext.Provider>
  );
}
