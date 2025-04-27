"use client";

import { buttonClass } from "@/classes/button";
import { inputFieldClass } from "@/classes/input-field";
import { getGenges } from "@/requests/getGenres";
import trackSchema from "@/schemas/createTrackSchemas";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTrack } from "@/requests/createTrack";
import useModalStore from "@/store/modalSrore";
import useTrackStore from "@/store/tracksStore";
import { textClass } from "@/classes/text";
import { summonToast } from "@/helpers/summonToast";

export default function CreateTrackForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      artist: "",
      album: "",
      genres: [],
    },
    resolver: zodResolver(trackSchema, { async: true }),
  });

  const closeModal = useModalStore((state) => state.closeModal);
  const list = useTrackStore((state) => state.tracks);
  const setTrackList = useTrackStore((state) => state.setTracks);
  const [genres, setGenres] = useState([]);
  const setLoading = useTrackStore((state) => state.setLoading);
  const [loadingGenres, setLoadingGenres] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoadingGenres(true);
      const data = await getGenges();
      const editedData = data.map((el) => ({ value: el, label: el }));
      setLoadingGenres(false);
      setGenres(editedData);
    }
    fetchData();
  }, []);

  const submit = async (data) => {
    data.genres = data.genres.map(({ value }) => value);
    closeModal();
    setLoading(true);
    summonToast(createTrack, [data], {
      loading: "Creating track...",
      success: "Track created!",
    })
      .then((result) => {
        setTrackList([result, ...list]);
        reset();
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <h3 className={`${textClass}`}>Add a new track ♭</h3>
      <form
        data-testid="track-form"
        className="items-center flex flex-col sm:gap-4 gap-2 text-blue-500"
        onSubmit={handleSubmit(submit)}
      >
        <div className="w-full">
          <label className="block sm:text-lg text-sm font-semibold">
            Title of the track
          </label>
          <input
            data-testid="input-title"
            className={`${inputFieldClass} ${
              errors.title ? "border-red-500 focus:outline-red-500" : ""
            }`}
            placeholder="Enter title of the track"
            {...register("title")}
          />
          {errors.title && (
            <p data-testid="error-title" className="text-red-500 text-sm mt-1">
              {errors.title.message}
            </p>
          )}
        </div>
        <div className="w-full">
          <label className="block sm:text-lg text-sm font-semibold">
            Artist
          </label>
          <input
            data-testid="input-artist"
            className={`${inputFieldClass} ${
              errors.artist ? "border-red-500 focus:outline-red-500" : ""
            }`}
            placeholder="Enter artist that created it"
            {...register("artist")}
          />
          {errors.artist && (
            <p data-testid="error-artist" className="text-red-500 text-sm mt-1">
              {errors.artist.message}
            </p>
          )}
        </div>
        <div className="w-full">
          <label className="block sm:text-lg text-sm font-semibold">
            Genres
          </label>
          <Controller
            name="genres"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                data-testid="genre-selector"
                name="genres"
                options={genres}
                className={`basic-multi-select w-full text-sm`}
                classNamePrefix="select"
                isLoading={loadingGenres}
                data-loading={loadingGenres}
                styles={{
                  menuList: (base) => ({
                    ...base,
                    maxHeight: "150px",
                  }),
                }}
              />
            )}
          />
          {errors.genres && (
            <p data-testid="error-genre" className="text-red-500 text-sm mt-1">
              {errors.genres.message}
            </p>
          )}
        </div>
        <div className="w-full">
          <label className="block sm:text-lg text-sm font-semibold">
            Album
          </label>
          <input
            data-testid="input-album"
            className={` ${inputFieldClass} ${
              errors.album ? "border-red-500 focus:outline-red-500" : ""
            } `}
            placeholder="What album your track belongs to?"
            {...register("album")}
          />
          {errors.album && (
            <p className="text-red-500 text-sm mt-1">{errors.album.message}</p>
          )}
        </div>
        <div className="w-full">
          <label className="block sm:text-lg text-sm font-semibold">
            Track cover
          </label>
          <input
            data-testid="input-cover-image"
            className={`${inputFieldClass} ${
              errors.coverImage ? "border-red-500 focus:outline-red-500" : ""
            }`}
            placeholder="Enter url for the cover of the track"
            {...register("coverImage")}
          />
          {errors.coverImage && (
            <p
              data-testid="error-cover-image"
              className="text-red-500 text-sm mt-1"
            >
              {errors.coverImage.message}
            </p>
          )}
        </div>
        <button
          data-testid="submit-button"
          className={`${buttonClass} sm:w-[50%] w-[100%] text-xl`}
          type="submit"
        >
          Submit
        </button>
      </form>
    </>
  );
}
