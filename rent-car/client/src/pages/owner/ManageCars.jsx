import {React,useState,useEffect} from 'react'
import Title from "../../components/Title"

const ManageCars = () => {
    const [cars,setCars]=useState([]);
    const fetchOwnerCars=async()=>{
      setCar(dummyCarData);
    }
    useEffect(()=>{
      fetchOwnerCars();
    },[])
  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <Title title="Manage Cars" subTitle="View all listed cars, update their details, or remove them from the booking platform"/>
      <div className="max-w-3xl w-full rounded-md overflow-hidden border=border-Color mt-6">
        <table></table>
      </div>
    </div>
  )
}

export default ManageCars;