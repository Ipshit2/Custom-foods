type Order = {
  _id: string;
  createdAt: string;
  status: string;
  ingredients: string[];
  totalPrice: number;
};

type OrderCardProps = {
  order: Order;
};

export default function OrderCard({ order }: OrderCardProps) {

  return (
    <div className="bg-[#f5e6cc] border-[3px] border-[#201E1F] p-5 shadow-[4px_4px_0px_#201E1F]">
      <div className="flex justify-between items-center mb-3 text-[12px]">
        <span className="bg-[#423C3C] text-[#E9E1D4] px-2 py-1 border-2 border-[#201E1F] shadow-[2px_2px_0px_#201E1F]">
          {new Date(order.createdAt).toLocaleDateString()}
        </span>
        <span className="px-8 py-2 border-2 shadow-[2px_2px_0px_#201E1F] bg-gray-700 text-[#E9E1D4] border-[#201E1F] text-[8px] uppercase ">
          {order.status}
        </span>
      </div>

      <div className="text-[13px] text-[#212121] mb-4 border-t border-b border-[#201E1F] py-8 pr-5">
        {order.ingredients.join(", ")}
      </div>

      <div className="flex justify-between items-center font-bold text-[15px]  text-[#212121]">
        <span className="tracking-wider">TOTAL</span>
        <span >
          ₹ {order.totalPrice}
        </span>
      </div>
    </div>
  );
}