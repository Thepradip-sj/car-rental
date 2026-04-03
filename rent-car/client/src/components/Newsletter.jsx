import React from 'react'

const Newsletter = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-4 p-7 max-md:px-4 my-10 mb-40">
        <h1 className="md:text-4xl text-5xl font-bold">Never Miss a Deal!</h1>
        <p className="text-gray-500 md:text-lg pb-8">Subscribe to get the latest offers, new arrivals, and exclusive discounts</p>
        <form className="flex items-center justify-between w-full max-w-2xl h-[50px]">
            <input placeholder="Enter Email Id" className="border border-gray-300  rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray" type="text" required/>
            <button type="submit" className="md:px-12 px-8 h-full text-white bg-indigo-500 hover:bg-indigo-600 transition-all cursor-pointer rounded-md rounded-l-none">Subscribe</button>
        </form>
    </div>
  )
}

export default Newsletter;