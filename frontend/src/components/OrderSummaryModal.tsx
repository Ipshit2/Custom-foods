import { useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast'
import { useNavigate } from "react-router-dom";
import Button from "./ui/Button";
type Ingredient = {
  _id: string;
  name: string;
  type: string;
  price: number;
};

type Props = {
  items: Ingredient[];
  total: number;
  onClose: () => void;
};

function OrderSummaryModal({ items, total, onClose }: Props) {
  const [openType, setOpenType] = useState<string | null>(null);
  const navigate = useNavigate();

  const grouped: { [key: string]: Ingredient[] } = {};

  items.forEach((item) => {
    if (!grouped[item.type]) {
      grouped[item.type] = [];
    }
    grouped[item.type].push(item);
  });

  const handlePlaceOrder = async () => {
    try {
      const orderIds = items.map((item) => item._id);

      await axios.post(
        "http://localhost:8080/order/create",
        { orderInfo: orderIds },
        { withCredentials: true }
      )
      toast.success("Order placed successfully" ,{
        style: {
          border: '3px solid #66422A',
          color: '#66422A',
          backgroundColor: '#E5CA95',
          padding: '16px',
          fontFamily: '"Press Start 2P", system-ui',
          fontSize: '10px'
        },
        iconTheme: {
          primary: '#5c6a46',
          secondary: '#201E1F',
        }
      })
      
      onClose()
      setTimeout(() => {
      navigate("/dashboard")
    }, 500)
    } catch (error: any) {
      console.error(error);
      toast.error('Invalid credentials', {
        style: {
          border: '3px solid #66422A',
          color: '#66422A',
          backgroundColor: '#E5CA95',
          padding: '16px',
          fontFamily: '"Press Start 2P", system-ui',
          fontSize: '10px'
        },
        iconTheme: {
          primary: '#5c6a46',
          secondary: '#201E1F',
        }
      })
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-[#f5e6cc] w-[500px] max-h-[80vh] overflow-y-auto p-6 border-[4px] border-[#201E1F]">
        <h2 className="text-center text-[18px] mb-4">ORDER SUMMARY</h2>

        {Object.keys(grouped).map((type) => {
          const typeItems = grouped[type];
          const typeTotal = typeItems.reduce(
            (sum, item) => sum + item.price,
            0
          );

          return (
            <div key={type} className="mb-4 border-b pb-2">
              <div
                onClick={() =>
                  setOpenType(openType === type ? null : type)
                }
                className="flex justify-between cursor-pointer"
              >
                <p className="capitalize">{type}</p>
                <p>₹ {typeTotal}</p>
              </div>

              {openType === type && (
                <div className="mt-2 ml-3 text-[14px]">
                  {typeItems.map((item) => (
                    <div key={item._id} className="flex justify-between">
                      <span>{item.name}</span>
                      <span>₹ {item.price}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        <div className="mb-4 border-b pb-2 flex justify-between">
          <span>Tax</span>
          <span>₹ 50</span>
        </div>

        <div className="flex justify-between mt-4 text-[16px] font-bold">
          <span>Total</span>
          <span>₹ {total}</span>
        </div>

        <div className="gap-5 mt-10 flex justify-center">
          <Button onClick={handlePlaceOrder} variant="primary" size="md" className="w-[50%]">
              Place Order
          </Button>
          <Button onClick={onClose} size="md" className="w-[50%]">
            Add More
          </Button>
        </div>
      </div>
    </div>
  );
}

export default OrderSummaryModal;