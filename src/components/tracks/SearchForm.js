"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import debounce from "lodash.debounce";
import { getGenges } from "@/requests/getGenres";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const SearchForm = () => {
  const { register, control, setValue, handleSubmit, watch } = useForm({
    defaultValues: {
      search: "",
      artist: "",
      genre: "",
      sort: "title",
      order: "asc",
    },
  });

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [genres, setGenres] = useState([]);
  const [loadingGenres, setLoadingGenres] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      setLoadingGenres(true);
      const result = await getGenges();
        setLoadingGenres(false);
        setGenres(result);
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const params = {
      search: searchParams?.get("search") || "",
      artist: searchParams?.get("artist") || "",
      genre: searchParams?.get("genre") || "",
      sort: searchParams?.get("sort") || "title",
      order: searchParams?.get("order") || "asc",
    };

    Object.entries(params).forEach(([key, value]) => {
      setValue(key, value);
    });
  }, [searchParams, setValue]);

  const debouncedUpdateURL = useCallback(
    debounce((values) => {
      const params = new URLSearchParams(searchParams.toString());

      let filterChanged = false;

      ["search", "artist", "genre", "sort", "order"].forEach((key) => {
        const newValue = values[key];
        const oldValue = searchParams.get(key) || "";
        if (newValue !== oldValue) {
          filterChanged = true;
        }
        if (newValue) {
          params.set(key, newValue);
        } else {
          params.delete(key);
        }
      });
      if (filterChanged) {
        params.set("page", "1");
      }
      const newUrl = `${pathname}?${params.toString()}`;
      router.push(newUrl);
    }, 500),
    [pathname, router, searchParams]
  );

  useEffect(() => {
    const subscription = watch((values) => {
      debouncedUpdateURL(values);
    });
    return () => subscription.unsubscribe();
  }, [watch, debouncedUpdateURL]);

  return (
    <div className="mx-auto">
      <form
        className="flex flex-wrap gap-4 p-4 items-end justify-start"
        onSubmit={handleSubmit(() => {})}
      >
        <input
          {...register("search")}
          type="text"
          placeholder="Search by title"
          className="border p-2 rounded w-full sm:w-48 focus:outline-none"
          autoComplete="off"
          data-testid="search-input"
        />
        <input
          {...register("artist")}
          type="text"
          placeholder="Search by artist"
          className="border p-2 rounded w-full sm:w-48 focus:outline-none"
          autoComplete="off"
          data-testid="filter-artist"
        />
        <Controller
          name="genre"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              className="border p-2 rounded w-full sm:w-40 focus:outline-none"
              data-testid="filter-genre"
              disabled={loadingGenres}
              data-loading={loadingGenres}
              aria-disabled={loadingGenres}
            >
              {loadingGenres ? (
                <option value="">loading...</option>
              ) : (
                <>
                  <option value="">All genres</option>
                  {genres.map((el) => (
                    <option key={el} value={el}>
                      {el}
                    </option>
                  ))}
                </>
              )}
            </select>
          )}
        />
        <Controller
          name="sort"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              data-testid="sort-select"
              className="border p-2 rounded w-full sm:w-32 focus:outline-none"
            >
              <option value="title">Title</option>
              <option value="artist">Artist</option>
              <option value="createdAt">Date</option>
              <option value="album">Album</option>
            </select>
          )}
        />
        <Controller
          name="order"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              className="border p-2 rounded w-full sm:w-28 focus:outline-none"
            >
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
            </select>
          )}
        />
      </form>
    </div>
  );
};

export default SearchForm;
