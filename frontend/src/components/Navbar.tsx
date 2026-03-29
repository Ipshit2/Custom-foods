import { NavLink } from "react-router-dom"
export default function Navbar() {
  return (
    <div className="  px-6 py-4 flex justify-between items-center font-P2P ">
      <div className="border-[3px] border-[#201E1F] bg-[#423C3C] text-[#E9E1D4] px-4 py-2 shadow-[3px_3px_0px_#201E1F]">
        CUSTOMFOODS
      </div>
      <NavLink to="/orders" className="border-[3px] border-[#201E1F] bg-[#423C3C] text-[#E9E1D4] px-4 py-2 shadow-[3px_3px_0px_#201E1F]"> 
        MY ORDERS
      </NavLink>
    </div>
  )
}
