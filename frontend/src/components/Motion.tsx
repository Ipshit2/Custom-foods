import { useState } from "react";
import { motion } from "framer-motion";
import back from "../assets/back.png";
import next from "../assets/next.png";
import OrderItems from "../components/OrderItems";

type Ingredient = {
  _id: string;
  name: string;
  type: string;
  price: number;
  image: string;
};

export default function Motion({ ingredients }: { ingredients: Ingredient[] }) {
  const [index, setIndex] = useState(0);
  const [selectedItems, setSelectedItems] = useState<Ingredient[]>([]);
  const total = ingredients.length;

  const nextSlide = () => {
  setIndex((back) => (back + 1) % total);
  }
  const backSlide = () => {
    setIndex((back) => (back - 1 + total) % total)
  }

  const selectItem = () => {
    const selectedIngredient = ingredients[index];
    if (!selectedItems.some((item) => item._id === selectedIngredient._id)) {
      setSelectedItems([...selectedItems, selectedIngredient]);
    }
  };

  return (
    <div className="relative flex items-center justify-center w-full py-5 border-4 bg-[#5c6a46] border-black my-5 rounded-xl">
      <div className="relative flex flex-col items-center w-[2000px] ">
        
        <button onClick={backSlide} className="absolute left-4 top-[35%] z-20 cursor-pointer">
          <img src={back} alt="" className="h-12 animate-bounce" />
        </button>

        <div className="relative w-full h-[400px] mt-[20px] ">
          {ingredients.length > 0 ? (
            <div>
              <motion.img
                key={ingredients[index]._id}
                src={`http://localhost:8080${ingredients[index].image}`}
                alt={ingredients[index].name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="h-[250px] object-cover flex ml-[225px]"
              />
              <div className="flex flex-col items-center mt-4">
                <h2 className="text-lg font-bold text-black">{ingredients[index].name}</h2>
                <p className="text-sm text-black">Price: ${ingredients[index].price}</p>
                <button 
                  onClick={selectItem}
                  className="cursor-pointer mt-4 px-6 py-2 text-white  bg-[#423C3C] border-2 border-[#201E1F] rounded-lg hover:bg-[#2e2828] "
                >
                  Select
                </button>
              </div>
            </div>
          ) : (
            <p className="text-black flex justify-center items-center">No ingredients available</p>
          )}
        </div>

        <button onClick={nextSlide} className="absolute right-4 top-[35%]  z-20 cursor-pointer ">
          <img src={next} alt="Next" className="h-12 animate-bounce" />
        </button>
      </div>

      
      <OrderItems selectedItems={selectedItems} />
    </div>
  );
}
