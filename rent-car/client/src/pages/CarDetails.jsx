import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { assets, dummyCarData } from '../assets/assets';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = React.useState(null);

  React.useEffect(() => {
    const foundCar = dummyCarData.find((car) => car._id === id);
    setCar(foundCar);
  }, [id]);

  return car ? (
    <div className="p-6 md:px-14 lg:px-24 mt-16">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-500 gap-2 mb-6 cursor-pointer"
      >
        <img
          className="rotate-180 w-4"
          src={assets.arrow_icon}
          alt="back"
        />
        Back to all cars
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

        {/* Left Section */}
        <div className="lg:col-span-2">

          <img
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md"
          />

          <div className="space-y-6">

            {/* Title */}
            <div>
              <h1 className="text-3xl font-bold">
                {car.brand} {car.model}
              </h1>
              <p>{car.category} • {car.year}</p>
            </div>

            <hr className="border-borderColor my-6" />

            {/* Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: assets.seat_icon, text: `${car.seating_capacity} Seats` },
                { icon: assets.fuel_icon, text: car.fuel_type },
                { icon: assets.car_icon, text: car.transmission },
                { icon: assets.location_icon, text: car.location },
              ].map(({ icon, text }) => (
                <div
                  key={text}
                  className="flex flex-col items-center bg-light p-4 rounded-lg"
                >
                  <img src={icon} alt="" className="w-6 h-6 mb-2" />
                  <p className="text-sm">{text}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div>
              <h1 className="text-xl font-medium mb-3">Description</h1>
              <p className="text-gray-500">{car.description}</p>
            </div>

              {/*Features*/}
              <div>
  
                <h1>Features</h1>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {
                    ["360 Camera","GPS","Bluetooth","Rear View Mirror","Heated Seats"].map((item)=>(
                      <li key={item} className="flex items-center text-gray-500">
                          <img src={assets.check_icon} className="h-4  mr-2" alt=""></img>
                          {item}
                      </li>
                    ))
                  }

                </ul>
              </div>

          </div>
        </div>
          <form className="shadow-lg h-max  sticky top-18 rounded-xl p-6 space-y-6 text-gray-500"></form>
      </div>
    </div>
  ) : (
    <Loader/>
  );
};

export default CarDetails;