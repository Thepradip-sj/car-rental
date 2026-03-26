import { useState } from 'react'
import './App.css'
import Navbar from "./components/Navbar";
import { Link, useLocation ,useNavigate} from "react-router-dom";

export default function App() {
  const [showLogin,setShowLogin]=useState(false);
  const isOwnerPath=useLocation().pathname.startsWith('/owner');
  return (
    <div>
      {!isOwnerPath && <Navbar setShowlogin={showLogin}/>}
    </div>
  );
}