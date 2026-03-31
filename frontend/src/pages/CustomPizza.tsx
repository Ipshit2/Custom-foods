import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import OrderSummaryModal from "../components/OrderSummaryModal";
import Chatbox from '../components/Chatbox'
import Button from "../components/ui/Button";
import Heading from "../components/ui/Heading";
import FoodCard from "../components/ui/FoodCard";
type Ingredient = {
  _id: string;
  name: string;
  type: string;
  price: number;
  image: string;
};

function CustomizePizza() {
  const [allItems, setAllItems] = useState<Ingredient[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filtered, setFiltered] = useState<Ingredient[]>([]);
  const [selected, setSelected] = useState<Ingredient[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8080/ingredient/getall", {
        withCredentials: true,
      });

      const data: Ingredient[] = res.data.data;
      const uniqueTypes = [...new Set(data.map((i) => i.type))];

      setAllItems(data);
      setTypes(uniqueTypes);
      setFiltered(data.filter((i) => i.type === uniqueTypes[0]));
    };

    fetchData();
  }, []);

  const changeType = (index: number) => {
    setCurrentIndex(index);
    setFiltered(allItems.filter((i) => i.type === types[index]));
  };

  const next = () => {
    if (!types.length) return;
    const i = (currentIndex + 1) % types.length;
    changeType(i);
  };

  const prev = () => {
    if (!types.length) return;
    const i = (currentIndex - 1 + types.length) % types.length;
    changeType(i);
  };

  const count = (type: string) => {
    return selected.filter((i) => i.type.toLowerCase() === type.toLowerCase()).length;
  };

  const canAdd = (item: Ingredient) => {
    const c = count(item.type);

    if (item.type === "Crust" && c >= 1) return false;
    if (item.type === "Sauce" && c >= 1) return false;
    if (item.type === "Cheese" && c >= 3) return false;
    if (item.type === "Topping" && c >= 10) return false;

    return true;
  };

  const toggleItem = (item: Ingredient) => {
    const exists = selected.find((i) => i._id === item._id);

    if (exists) {
      setSelected(selected.filter((i) => i._id !== item._id));
    } else {
      if (!canAdd(item)) return;
      setSelected([...selected, item]);
    }
  };

  const isSelected = (id: string) => {
    return selected.some((i) => i._id === id);
  };

  useEffect(() => {
    const sum = selected.reduce((acc, i) => acc + i.price, 0);
    setTotal(sum + 50);
  }, [selected]);

  const canOrder = () => {
    return count("Crust") >= 1 && count("Sauce") >= 1;
  };

  return (
    <div className="bg-[#f5e6cc] min-h-screen pb-25 text-[#66422A] font-P2P">
      <Navbar />

      <div className="px-[250px]">
        <div className=" mt-[30px]">
          <Heading title=">> BUILD YOUR PIZZA  <<" />
        </div>

        <div className=" flex justify-center  gap-20 mt-[20px] text-[12px]">
          <p>• Atleast 1 crust & 1 sauce</p>
          <p>• Max 3 cheese & 10 toppings</p>
        </div>

        <div className="mt-[20px] bg-[#E5CA95] border-[4px] border-[#66422A] shadow-[5px_5px_0px_#66422A] p-6">
          <div className="flex justify-center items-center gap-10 mb-8">
            <Button
              size="md"
              onClick={prev}
              className="w-10 h-10 flex items-center justify-center p-0">
              {"<"}
            </Button>
            <h1 className="text-lg text-center bg-[#E5CA95] px-6 py-2 border-[3px] border-[#66422A] shadow-[3px_3px_0px_#66422A] min-w-[200px] tracking-widest">
              {types[currentIndex] || "Loading"}
            </h1>
            <Button
              size="md"
              onClick={next}
              className="w-10 h-10 flex items-center justify-center p-0">
              {">"}
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-10 ">
            {filtered.map((item) => {
              const selectedItem = isSelected(item._id);
              const disabled = !canAdd(item);

              return (
                <FoodCard
                  key={item._id}
                  item={item}
                  isSelected={selectedItem}
                  disabled={disabled}
                  onToggle={toggleItem}
                />
              );
            })}
          </div>
        </div>
      </div>
            
      <div className="fixed bottom-0 w-full bg-[#423C3C]  p-4 flex justify-between">
        <button disabled={!canOrder()} onClick={() => setShowModal(true)} className={`border-[2px] border-[#201E1F] shadow-[3px_3px_0px_#201E1F] hover:cursor-pointer
      active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
      transition-all duration-100 px-4 py-2 ${
            canOrder() ? "bg-[#A4BE7B]" : "bg-gray-500"}`}>
          PLACE ORDER
        </button>
        <Chatbox/>
      </div>

      {showModal && (
        <OrderSummaryModal
          items={selected}
          total={total}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default CustomizePizza;