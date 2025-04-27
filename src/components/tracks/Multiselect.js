import { buttonClass } from "@/classes/button";
import useModalStore from "@/store/modalSrore";
import useSelectedStore from "@/store/selectedStore";
import useTrackStore from "@/store/tracksStore";
import { useEffect, useState } from "react";

export default function Multiselect() {
  const ableSelect = useSelectedStore((state) => state.ableSelect);
  const setAbleSelect = useSelectedStore((state) => state.setAbleSelect);
  const setSelected = useSelectedStore((state) => state.setSelected);
  const selected = useSelectedStore((state) => state.selected);
  const openModal = useModalStore((state) => state.openModal);
  const list = useTrackStore((state) => state.tracks);

  const [allSelected, setAllSelected] = useState(false);

  useEffect(() => {
    if (!ableSelect) {
      setAllSelected(false);
    }
  }, [ableSelect]);

  const toggleSelect = () => {
    if (ableSelect) {
      setAbleSelect(false);
    } else {
      setAbleSelect(true);
    }
  };

  const onDelete = () => {
    if(!selected.length) return
    openModal("deleteMulti", selected);
    setAbleSelect(false);
    setSelected([]);
  };

  const onSelectAll = () => {
    if (allSelected) {
      setSelected([]);
      setAllSelected(false);
    } else {
      setSelected(list.map((el) => el.id));
      setAllSelected(true);
    }
  };

  return (
    <ul className="flex gap-3 flex-wrap">
      <li>
        <button
          onClick={toggleSelect}
          className={`${buttonClass} ${
            ableSelect && "bg-cancel hover:bg-cancel-hover"
          }`}
          type="button"
          data-testid="select-mode-toggle"
        >
          {ableSelect ? "Cancel" : "Select mode"}
        </button>
      </li>
      {ableSelect && (
        <>
          <li>
            <button
              className={`${buttonClass} bg-red-900 hover:bg-red-950`}
              type="button"
              onClick={onDelete}
              data-testid="bulk-delete-button"
            >
              Delete
            </button>
          </li>
          <li className="flex gap-2 items-center">
            <input
              onChange={onSelectAll}
              type="checkbox"
              name="select-all"
              className="w-8 h-8"
              value={ableSelect}
              data-testid="select-all"
            />
            <label htmlFor="select-all">Select All</label>
          </li>
        </>
      )}
    </ul>
  );
}
