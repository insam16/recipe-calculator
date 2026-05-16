import { itemMetas } from "@/features/calculator/constants/itemMeta";
import ItemButton from "./ItemButton";
import type { ItemName } from "@/features/calculator/types";

type Props = {
  selectedItem: ItemName;
  onSelect: (item: ItemName) => void;
};

export default function ItemSelector({ selectedItem, onSelect }: Props) {
  return (
    <div className="flex gap-2 mb-4">
      {itemMetas.map((item) => (
        <ItemButton
          key={item.name}
          item={item}
          isSelected={selectedItem === item.name}
          onClick={() => onSelect(item.name)}
        />
      ))}
    </div>
  );
}
