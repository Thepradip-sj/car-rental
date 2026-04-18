import React from 'react'
import Title from '../../components/owner/Title'

const AddCard = () => {
  const [image,setImage]=useState(null);
  const [car,setCar]=useState({
    brand:'',
    model:'',
    year: 0,
    pricePerday: 0,
    category: '',
    transmission: '',
    fueltype: '',
    seating_capacity:0,
    location:'',
    description:'',
  })
  const onSubmitHandler=async(e)=>{
    e.preventDefault();
  }
  return (
    <div>
        <Title title="Add new Car" subTitle="Fill in details to list a new car for booking,including pricing,availaibility, and car specifications."/>
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl">
          <div>
            <label htmlFor="car-image">
              <img src={image ? URL.createObjectURL(image) : assets.upload_icon} alt=""/>
            </label>
          </div>
        </form>
    </div>
  )
}

export default AddCard;