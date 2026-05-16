import Image from "next/image";
import { Item } from "@/features/calculator/types"

type Props = {
  item: Item;
  isSelected: boolean;
  onClick: () => void;
};

const buttonStyle = "border-gray-100 border-2 rounded-lg p-1 bg-gray-100"
const buttonSelectedStyle = "border-yellow-400 border-2 rounded-lg p-1 bg-yellow-300"

export default function ItemButton({ item, isSelected, onClick }: Props) {
  return (
    <div className="relative group">
      <button
        onClick={onClick}
        className={isSelected ? buttonSelectedStyle : buttonStyle}
      >
        <Image
          src={item.image}
          alt={item.name}
          width={60}
          height={60}
        />
      </button>
    </div>
  )
}
