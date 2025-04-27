"use client";

import useModalStore from "@/store/modalSrore";
import {
  ArrowUpTrayIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

export default function ButtonList({ track, audioFile }) {
  const openModal = useModalStore((state) => state.openModal);

  const handleDelete = () => {
    openModal("delete", track);
  };

  const handleEdit = () => {
    openModal("edit", track);
  };

  const handleFileInteraction = () => {
    openModal("file", {id: track.id, audioFile});
  };

  return (
    <ul className="list-none flex justify-end">
      <li>
        <button
          onClick={handleFileInteraction}
          type="button"
          className="cursor-pointer p-1 pb-0"
          data-testid={`upload-track-${track.id}`}
        >
          <ArrowUpTrayIcon className="h-5 w-5 text-almond" />
        </button>
      </li>
      <li>
        <button
          onClick={handleDelete}
          type="button"
          className="cursor-pointer p-1 pb-0"
          data-testid={`delete-track-{$id}`}
        >
          <TrashIcon className="h-5 w-5 text-almond" />
        </button>
      </li>
      <li>
        <button
          onClick={handleEdit}
          type="button"
          className="cursor-pointer p-1"
          data-testid={`edit-track-${track.id}`}
        >
          <PencilSquareIcon className="h-5 w-5 text-almond" />
        </button>
      </li>
    </ul>
  );
}
