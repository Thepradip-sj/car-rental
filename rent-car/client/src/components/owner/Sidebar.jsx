import React from 'react'
import {dummyUserData} from '../../assets/assets';
import {useLocation} from 'react-router-dom';

const Sidebar = () => {
    const user=dummyUserData;
    const location=useLocation();
    const [image,setImage] = useState('');

    const updateImage=async()=>{
        user.image = URL.createObjectURL(image);
        setImage('');
    }
  return (
    <div className="relative min-h-screen md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-borderColor text-sm">
        <div className="group rlative">
            <label htmlFor="image" >
                <img src={image ? URL.createObjectURL(image) : user?.image || "" } alt=""/>
                <input type="file" id='image' accept="image/*" hidden onChange={e=>setImage(e.target.files[0])}></input>
                <div className="absolute hidden top-0 right-0 left-0 bottom-0 bg-black/10 rounded-full group-hover:flex items-center justify-center cursor-pointer">
                <img src={assets.edit_icon} alt=""/>
                </div>
            </label>
        </div>
        {
            image && (
                <button className='absolute top-0 right-0 flex p-2 gap-1 bg-primary/10 text-primary cursor-pointer'>Save <img src={assets.check_icon} width={13} alt="" onClick={updateImage}/></button>
            )
        }
        <p className="mt-2 text-base max-md:hidden">{user?.name}</p>
        <div>
            {ownerMenuLinks.map((link,index)=>(
                <NavLink key={index} to={link.path}>
                    <img src={linkpath===location.pathname ? link.coloredIcon : link.icon} alt="car icon"/>
                    <span  className="max-md:hidden">{link.name}</span>
                    <div className={`${link.path===location.pathname && 'bg-primary'} w-1.5 h-8 rounded-lg right-0 absolute`}></div>
                </NavLink>
            )

            )}
        </div>
    </div>
  )
}

export default Sidebar;