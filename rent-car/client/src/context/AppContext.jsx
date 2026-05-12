import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const  [cars,setCars]=useState([]);

  //function to fetch cars
  const fetchCars=async()=>{
    try {
        const {data}=await axios.get('/api/user/cars');
        if(data.success){
            setUser(data.user);
            setIsOwner(data.user?.role==='owner');
            setCars(data.cars);
        }else{
            navigate('/');
        }
    }
    catch(error){
      toast.error(error.message);
    }   
  }

  //fetch user details
  const fetchUser=async()=>{
    try {
        const {data} =await axios.get('/api/user/cars');
        data.success ? setCars(data.cars) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
}

//function to logout
    const logout=()=>{
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setIsOwner(false);
        axios.defaults.headers.common['Authorization']='';
        toast.success('Logged out successfully');
    }


//useEfect to fetch user details on app load
    useEffect(()=>{
        const token=localStorage.getItem('token');
        setToken(token);
        fetchCars();
    },[])

    useEffect(()=>{
        if(token){
            axios.defaults.headers.common['Authorization']=`${token}`;
            fetchUser();
        }else{

        }
    },[token])

//value to be passed to context
  const value={
    navigate,
    currency,
    axios,
    token,
    setToken,
    user,
    setUser,
    isOwner,
    setIsOwner,
    showLogin,
    setShowLogin,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
    cars,
    setCars,
    logout,
    fetchCars,
    fetchUser
  }
  return (
    <AppContext.Provider value={ value }>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
    return useContext(AppContext);
};