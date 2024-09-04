import { StrictMode, useContext } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import '@fortawesome/fontawesome-free/css/all.min.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartContextProvider from './context/CartContext.jsx'
import UserContextProvider from './context/userContext.jsx'
UserContextProvider
createRoot(document.getElementById('root')).render(
  <StrictMode> 
      <UserContextProvider>
         <CartContextProvider>
          <App />
         </CartContextProvider>
      </UserContextProvider>
  </StrictMode>
)