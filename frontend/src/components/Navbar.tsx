import { NavLink } from "react-router-dom"

interface NAME{
  name: string
}

function Navbar({ name } :NAME) {
  return (
    <div className='pt-[20px] pl-[20px] text-[15px] flex  text-[#E9E1D4] gap-x-[900px]'>
        <h1 className=' rounded-2xl w-[170px] py-[7px] border-[#201E1F] border-[4px] bg-[#423C3C]' >CustomFoods</h1>
        <NavLink to={name === "Order" ? "/orders" : "/dashboard"}>
        <h1 className=' rounded-2xl w-auto px-[25px] py-[7px] border-[#201E1F] border-[4px] bg-[#423C3C]' >
        {name === "Order" ? "Orders" : "Dashboard"}
        </h1>
        </NavLink>
        
        
        
    </div>
  )
}

export default Navbar