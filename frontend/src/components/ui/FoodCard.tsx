import Button from "./Button";

type FoodItem = {
  _id: string;
  name: string;
  price: number;
  image: string;
  type: string; 
}

type FoodCardProps = {
  item: FoodItem;
  isSelected: boolean;
  disabled?: boolean;
  onToggle: (item: FoodItem) => void;
};

export default function FoodCard({
  item,
  isSelected,
  disabled = false,
  onToggle,
}: FoodCardProps) {
  return (
    <div className={`p-3 text-center border-[3px]  text-[12px] shadow-[3px_3px_0px_#66422A]
      ${isSelected ? "bg-[#A4BE7B]" : "bg-[#f5e6cc]"}`}>
      
      <img src={`http://localhost:8080/${item.image}`} className="animate-bounce h-[150px] mx-auto mb-3"/>
      <h2>{item.name}</h2>
      <p>₹ {item.price}</p>

      <Button
        size="sm"
        variant="secondary"
        className="w-full mt-5"
        disabled={!isSelected && disabled}
        onClick={() => onToggle(item)}>
        {isSelected ? "REMOVE" : "ADD"}
      </Button>

    </div>
  );
}