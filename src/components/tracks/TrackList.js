import useTrackStore from "@/store/tracksStore";
import TrackItem from "./trackEl/TrackItem";
import { useState } from "react";
import Image from "next/image";
import { textClass } from "@/classes/text";
import LoadingList from "./loadings/LoadingList";

export default function TrackList() {
  const list = useTrackStore((state) => state.tracks);
  const [isPlaying, setIsPlaying] = useState(null);
  const loading = useTrackStore((state) => state.loading);
  return loading ? (
    <LoadingList />
  ) : list?.length > 0 ? (
    <ul className="flex flex-wrap gap-15 justify-center pt-10 items-center">
      {list.map((el) => (
        <TrackItem
          key={el.id}
          track={el}
          playing={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      ))}
    </ul>
  ) : (
    <div className="flex flex-col gap-5 justify-center items-center p-5">
      <Image
        src="/cannot-find.png"
        alt="Coudn`t find picture"
        placeholder="blur"
        blurDataURL="/cannot-find.png"
        width={300}
        height={300}
        className="rounded-[5px] block w-[300px] h-[300px] "
      />
      <p className={`${textClass}`}>
        Sorry we couldn`t find anything by your request
      </p>
    </div>
  );
}
