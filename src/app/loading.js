import { SyncLoader } from "react-spinners";

export default function Loading() {
  return (
    <div
      data-testid="loading-indicator"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 w-screen h-screen"
    >
      <SyncLoader color="#ab2346" size={100} />
    </div>
  );
}
