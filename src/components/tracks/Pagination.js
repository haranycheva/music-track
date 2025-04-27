"use client";

import { textClass } from "@/classes/text";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ maxPage }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const nextPage = () => {
    if (page >= maxPage) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page + 1));
    router.push(`${pathname}?${params.toString()}`);
  };

  const prevPage = () => {
    if (page <= 0) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page - 1));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div
      className="flex gap-10 mt-15 justify-center items-center"
      data-testid="pagination"
    >
      <button
        disabled={page <= 1}
        onClick={prevPage}
        type="button"
        className="cursor-pointer"
        data-testid="pagination-prev"
      >
        <ArrowLeftCircleIcon
          className={`h-13 w-13 text-blue-500 ${
            page <= 1 ? "text-player cursor-default" : ""
          }`}
        />
      </button>
      <p className={`${textClass}`}>{page}</p>
      <button
        disabled={page >= maxPage}
        onClick={nextPage}
        type="button"
        className="cursor-pointer"
        data-testid="pagination-next"
      >
        <ArrowRightCircleIcon
          className={`h-13 w-13 text-blue-500 ${
            page >= maxPage ? "text-player cursor-default" : ""
          }`}
        />
      </button>
    </div>
  );
}
