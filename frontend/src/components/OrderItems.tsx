import { useState, useEffect } from "react"
import axios from "axios"
import toast from 'react-hot-toast'
type Ingredient = {
  _id: string
  name: string
  type: string
  price: number
  image: string
};

interface OrderItemsProps {
  selectedItems: Ingredient[];
}

function OrderItems({ selectedItems }: OrderItemsProps) {
  const [hasRequiredItems, setHasRequiredItems] = useState(false)

  useEffect(() => {
    let crust = 0, cheese = 0, sauce = 0, topping = 0

    selectedItems.forEach(({ type }) => {
      if (type === "Crust") {
        crust++
      }
      if (type === "Cheese") {
        cheese++
      }
      if (type === "Sauce") {
        sauce++
      }
      if (type === "Topping") {
        topping++
      }
    })

    setHasRequiredItems(crust === 1 && cheese >= 1 && sauce === 1 && topping >= 1)
  }, [selectedItems])

  const handleOrder = async () => {
    if (!hasRequiredItems) return

    const ingredientIds = selectedItems.map(item => item._id)

    try {
      const response = await axios.post("http://localhost:8080/order/create",
        { orderInfo: ingredientIds },
        { withCredentials: true })

        toast.success("Successfully Order Placed",{
          style:{
            border: '3px solid #66422A',
            color: '#66422A',
            backgroundColor: '#E5CA95',
            padding: '20px',
            fontFamily: '"Press Start 2P", system-ui',
            fontSize: '10px'
          },
          iconTheme:{
            primary: '#5c6a46',
            secondary:'#201E1F',
          }
        })
      console.log("Order Response:", response.data)
    } catch (error) {
      toast.error('An error happened. Put proper information',{
        style:{
          border: '3px solid #66422A',
          color: '#66422A',
          backgroundColor: '#E5CA95',
          padding: '20px',
          fontFamily: '"Press Start 2P", system-ui',
          fontSize: '10px'
        },
        iconTheme:{
          primary: '#5c6a46',
          secondary:'#201E1F',
        }
      });
      console.log("Login FAILED");
      
    }
  };

  return (
    <div className="w-full h-full bg-[#423C3C] border-2 border-black p-5 mr-5 relative">
      <div className="grid grid-cols-6 gap-1">
        {selectedItems.map(({ _id, image, name }) => (
          <div key={_id} className="border-2 border-black flex flex-col items-center">
            <img src={`http://localhost:8080${image}`} alt={name} className="object-cover rounded-md" />
          </div>
        ))}
      </div>

      <button
        onClick={handleOrder}
        className={`absolute bottom-4 right-4 px-6 py-2 rounded-md text-white font-semibold transition ${
          hasRequiredItems ? "bg-[#05a129] cursor-pointer" : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={!hasRequiredItems}
      >
        Order
      </button>
    </div>
  );
}

export default OrderItems;
