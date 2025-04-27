import LoadingItem from "./LoadingItem";

export default function LoadingList() {
  return (
    <ul
      className="flex flex-wrap gap-15 justify-center pt-10 items-center"
      data-testid="loading-tracks"
    >
      <LoadingItem />
      <LoadingItem />
      <LoadingItem />
      <LoadingItem />
      <LoadingItem />
      <LoadingItem />
      <LoadingItem />
      <LoadingItem />
      <LoadingItem />
      <LoadingItem />
      <LoadingItem />
      <LoadingItem />
    </ul>
  );
}
