import { useState } from 'react'
import './App.css'
import Navbar from "./components/Navbar";
import { Routes, Route,useLocation} from "react-router-dom";
import CarDetails from "./pages/CarDetails";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import MyBookings from "./pages/MyBookings";


export default function App() {
  const [showLogin,setShowLogin]=useState(false);
  const isOwnerPath=useLocation().pathname.startsWith('/owner');
  return (
    <div>
      {!isOwnerPath && <Navbar setShowlogin={showLogin}/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/car-details:id' element={<CarDetails/>}/>
        <Route path='/cars' element={<Cars/>}/>
        <Route path='/my-bookings' element={<MyBookings/>}/>
      </Routes>
    </div>
  );
}