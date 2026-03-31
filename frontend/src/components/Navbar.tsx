import { NavLink } from "react-router-dom"
import Button from "./ui/Button"
export default function Navbar() {
  return (
    <div className="  px-6 py-4 flex mx-[100px] justify-between items-center font-P2P ">
        <NavLink to="/dashboard">
            <Button size="lg" variant="secondary">
              CUSTOM FOODS
            </Button>
        </NavLink>
        <NavLink to="/orders">
            <Button size="lg" variant="secondary">
              MY ORDERS
            </Button>
        </NavLink>
    </div>
  )
}
