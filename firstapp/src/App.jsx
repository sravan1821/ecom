import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from './comonents/Home.jsx'
import Register from "./comonents/Register.jsx";
import Login from "./comonents/Login.jsx";
import Navigation from "./comonents/Navigation.jsx";
import AddProduct from "./comonents/AddProduct.jsx";
import Cart from './comonents/Cart.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Home/>}/>      
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/add-product" element={<AddProduct/>}/>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
    </BrowserRouter>
  )
}