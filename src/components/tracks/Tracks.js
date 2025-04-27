"use client";

import { getTracks } from "@/requests/getTracks";
import { useEffect, useState } from "react";
import TrackList from "./TrackList";
import useTrackStore from "@/store/tracksStore";
import SearchForm from "./SearchForm";
import { useSearchParams } from "next/navigation";
import Pagination from "./Pagination";
import Multiselect from "./Multiselect";

export default function Tracks() {
  const [maxPage, setMaxPage] = useState(null);
  const setTrackList = useTrackStore((state) => state.setTracks);
  const setLoading = useTrackStore((state) => state.setLoading);
  const searchParams = useSearchParams();

  const search = searchParams?.get("search") || "";
  const artist = searchParams?.get("artist") || "";
  const genre = searchParams?.get("genre") || "";
  const sort = searchParams?.get("sort") || "title";
  const order = searchParams?.get("order") || "asc";
  const page = searchParams?.get("page") || "1";

  useEffect(() => {
    async function fetchData() {
      const data = await getTracks({
        search,
        artist,
        genre,
        sort,
        order,
        page,
      });
      setTrackList(data.data);
      setMaxPage(Math.ceil(data.meta.total / data.meta.limit));
      setLoading(false);
    }
    fetchData();
  }, [search, artist, genre, sort, order, page]);

  return (
    <div className="pb-10">
      <SearchForm />
      <Multiselect />
      <TrackList />
      <Pagination maxPage={maxPage} />
    </div>
  );
}
