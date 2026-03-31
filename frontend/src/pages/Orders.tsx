import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Heading from "../components/ui/Heading";
import OrderCard from "../components/ui/OrderCard";

type Order = {
  _id: string;
  ingredients: string[];
  totalPrice: number;
  status: string;
  createdAt: string;
};

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:8080/order/myorder", {
          withCredentials: true,
        });
        setOrders(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="bg-[#EEDEC4] text-[#66422A] min-h-screen w-full font-P2P">
      <Navbar />
      <div className="mx-[250px]">
        <div className=" my-[30px]">
          <Heading title=">> CHECK YOUR ORDERS <<" />
        </div>
        <div className=" bg-[#E5CA95] border-[#66422A] shadow-[4px_4px_0px_#66422A] border-4 p-[30px]">
        {orders.length === 0 ? (
          <p className="text-center">No orders yet</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

export default Orders;