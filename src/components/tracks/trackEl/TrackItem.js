"use client";

import Image from "next/image";
import ButtonList from "./ButtonList";
import { useEffect, useState } from "react";
import AudioPlayer from "./AudioPlayer";
import { getFile } from "@/requests/getFile";
import Selected from "./Selected";
import useSelectedStore from "@/store/selectedStore";

export default function TrackItem({ track, playing, setIsPlaying }) {
  const isPlaying = playing === track.id;
  const [fileSrc, setFileSrc] = useState(null);
  const selected = useSelectedStore((state) => state.selected);
  const ableSelect = useSelectedStore((state) => state.ableSelect);
  const [isSelected, setIsSelected] = useState(
    selected.some((el) => el === track.id)
  );

  useEffect(() => {
    setIsSelected(selected.some((el) => el === track.id));
  }, [selected, track.id]);

  useEffect(() => {
    if (track?.audioFile) {
      async function fetchData() {
        const data = await getFile(track.id, track.audioFile);
        setFileSrc(data);
      }
      fetchData();
    } else {
      setFileSrc(null);
    }
  }, [track?.audioFile]);

  return (
    <li
      className={`${
        isSelected ? "bg-blue-400" : "bg-blue-500"
      }  relative px-4 list-none reex flex-col pt-4 rounded-[10px] hover:bg-blue-400 ransition-colors duration-200 parent`}
      data-testid={`track-item-${track.id}`}
    >
      {ableSelect && <Selected
        isSelected={isSelected}
        setIsSelected={setIsSelected}
        id={track.id}
      />}
      <div className="mb-2 relative">
        <Image
          src={track.coverImage || "/no-image.jpg"}
          placeholder="blur"
          blurDataURL={track.coverImage || "/no-image.jpg"}
          alt="Track cover"
          width={200}
          height={200}
          className="rounded-[5px] block w-[200px] h-[200px]"
        />
        <ul className="child absolute top-1 left-1 flex gap-[2px] max-w-[80%] flex-wrap opacity-0  transition-opacity duration-200">
          {track.genres.map((el) => (
            <li
              key={el}
              className="text-almond text-sm bg-blue-400 p-[2px] rounded-[5px]"
            >
              {el}
            </li>
          ))}
        </ul>
      </div>
      <h5
        className="text-white font-semibold text-md break-all"
        data-testid={`track-item-${track.id}-title`}
      >
        {track.title}
      </h5>
      <p
        className="text-white break-all"
        data-testid={`track-item-${track.id}-artist`}
      >
        {track.artist}
      </p>
      <AudioPlayer
        id={track.id}
        src={fileSrc}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <ButtonList audioFile={fileSrc} track={track} />
    </li>
  );
}
