import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom'
import {assets,cityList} from '../assets/assets'
import {useAppContext} from '../context/AppContext.jsx';

const Hero = () => {
    const [pickupLocation,setPickupLocation]=useState('');
    const {pickupdate,setPickupdate,returndate,setReturndate}=useAppContext();
    const navigate=useNavigate();
    const handleSearch=(e)=>{
          e.preventDefault();
          navigate('/cars?pickupLocation='+ pickupLocation + '&pickupDate=' + pickupdate + '&returnDate=' + returndate);
    }
  return (
    <div className="min-h-screen flex flex-col items-center gap-14 bg-slate-100 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold p-12">Luxury cars on Rent</h1>
        <form onSubmit={handleSearch} className="flex flex-col justify-evenly md:flex-row items-start md:items-center p-4 px-8 rounded-lg md:rounded-full
        w-full max-w-80 md:max-w-2xl bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-10 md:ml-8 w-full">
              <div className="flex flex-col items-start gap-2">
              <select required value={pickupLocation} onChange={(e)=>setPickupLocation(e.target.value)}>
                <option value="">Pickup Location</option>
                {cityList.map((city)=><option key={city} value={city}>{city}</option>)}
              </select>
              <p className="px-4 text-sm text-gray-500">{pickupLocation ? pickupLocation : 'Please select location'}</p>
            </div>
            <div className='flex flex-col items-start gap-2'>
                <label htmlFor='pickup-date'>Pick-up Date</label>
                <input type="date" id="pickup-date" value={pickupdate} onChange={e=>setPickupdate(e.target.value)} min={new Date().toISOString().split('T')[0]} className='text-sm text-gray-500' required />
            </div>
             <div className='flex flex-col items-start gap-2'>
                <label htmlFor='return-date'>Return Date</label>
                <input type="date" id="return-date" value={returndate} onChange={e=>setReturndate(e.target.value)} min={new Date().toISOString().split('T')[0]} className='text-sm text-gray-500' required />
            </div>
            </div>
            <button className='flex items-center justify-center gap-1 m-2 px-7 py-4 max-sm:mt-4 bg-primary hover:bg-primary-dull text-white rounded-full cursor-pointer'>  
                 <img src={assets.search_icon} alt="search" className='brightness-300'/>
                 Search
            </button>
        </form>
        <img src={assets.main_car} alt="car" className='max-h-[320px]'/>
    </div>
  )
}

export default Hero;