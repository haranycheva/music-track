import useSelectedStore from "@/store/selectedStore";
import { CheckCircleIcon, StopIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Selected({ id, isSelected }) {
  const selected = useSelectedStore((state) => state.selected);
  const setSelected = useSelectedStore((state) => state.setSelected);
  const onSelect = () => {
    
    if (isSelected) {
      setSelected(selected.filter((id) => id !== id));
    } else {
      setSelected([...selected, id]);
    }
  };
  return (
    <button
    data-testid={`track-checkbox-${id}`}
      onClick={onSelect}
      type="button"
      className="cursor-pointer absolute top-1 right-1 z-10 bg-blue-500 rounded-[3px]"
    >
      {isSelected ? (
        <CheckCircleIcon className="h-8 w-8 text-almond" />
      ) : (
        <StopIcon className="h-8 w-8 text-almond" />
      )}
    </button>
  );
}
