import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

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

      <div className="flex justify-center items-center
      mx-[140px] mt-[30px] text-center bg-[#423C3C] mb-10 text-[#E9E1D4] border-[3px] animate-bounce border-[#201E1F] shadow-[3px_3px_0px_#201E1F] py-3"
      >
        &gt;&gt; CHECK YOUR ORDERS!! &lt;&lt;
      </div>

      <div className="mx-[140px] bg-[#E5CA95] border-[#66422A] border-4 p-[30px]">

        {orders.length === 0 ? (
          <p className="text-center">No orders yet</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-[#f5e6cc] border-[3px] border-[#201E1F] p-4 shadow-[3px_3px_0px_#66422A]"
              >
                <div className="flex justify-between mb-2">
                  <span className="text-[14px]">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                  <span className="uppercase">{order.status}</span>
                </div>

                <div className="text-[14px] mb-2">
                  {order.ingredients.join(", ")}
                </div>

                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹ {order.totalPrice}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;