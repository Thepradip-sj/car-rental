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

    const [isOwner, setIsOwner] = useState(
        localStorage.getItem("isOwner") === "true"
    );

    const [showLogin, setShowLogin] = useState(false);

    const [pickupDate, setPickupDate] = useState('');
    const [returnDate, setReturnDate] = useState('');

    const [cars, setCars] = useState([]);

    

    const fetchCars = async () => {

        try {

            const { data } = await axios.get('/api/user/cars');

            if (data.success) {

                setCars(data.cars);

            } else {

                toast.error(data.message);

            }

        } catch (error) {

            toast.error(error.message);

        }

    };



    const fetchUser = async () => {

        try {

            const { data } = await axios.get('/api/user/data');

            if (data.success) {

                setUser(data.user);

                setIsOwner(data.user?.role === 'owner');

                localStorage.setItem(
                    "isOwner",
                    data.user?.role === 'owner'
                );

            } else {

                toast.error(data.message);

            }

        } catch (error) {

            toast.error(error.message);

        }

    };

  

    const logout = () => {

        localStorage.removeItem('token');
        localStorage.removeItem('isOwner');

        setToken(null);
        setUser(null);
        setIsOwner(false);

        axios.defaults.headers.common['Authorization'] = '';

        toast.success('Logged out successfully');

        navigate('/');

    };

    // =========================
    // App Load
    // =========================

    useEffect(() => {

        const storedToken = localStorage.getItem('token');

        if (storedToken) {

            setToken(storedToken);

            axios.defaults.headers.common['Authorization'] =
                `Bearer ${storedToken}`;

            fetchUser();

        }

        fetchCars();

    }, []);

  

    const value = {
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
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

const useAppContext = () => {

    return useContext(AppContext);

};

export default useAppContext;