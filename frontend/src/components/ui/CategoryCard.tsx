import { ReactNode } from "react";

type FoodCardProps = {
  title: string;
  description: string;
  isActive?: boolean;
  children?: ReactNode;
};

export default function CategoryCard({
  title,
  description,
  isActive = false,
  children,
}: FoodCardProps) {
  return (
    <div
      className={`bg-[#E5CA95] border-[4px] border-[#66422A] p-6 text-center
      ${isActive ? "shadow-[6px_6px_0px_#66422A]" : "opacity-60"}`}
    >
      <h2 className={`${isActive ? "text-[20px]" : "text-[12px]"} mb-4`}>
        {title}
      </h2>

      <p className="text-[10px] mb-6">{description}</p>

      {children}
    </div>
  );
}