import { useState } from "react";
import { useLoaderData, useFetcher } from "@remix-run/react";
import Button from "~/components/buttons/button";

export const Pagination = () => {
  const { currentPage, listLength } = useLoaderData();

  const [page, setPage] = useState<number>(Number(currentPage));

  const fetcher = useFetcher();

  console.log("test", listLength, page, currentPage);

  return (
    <div className="flex justify-between w-full my-5">
      <input
        name="currentPage"
        onChange={(e) => fetcher.submit(e.currentTarget.form)}
        value={page}
        hidden
      />
      <Button
        onClick={() => setPage(page - 1 || 1)}
        disabled={page === 1 ? true : false}
      >
        Föregående
      </Button>
      <div className="w-full max-w-fit shadow-xl py-2 px-3 flex justify-center items-center gap-1 rounded-md text-white bg-blue-500 bg-opacity-50 hover:bg-opacity-75 transition-all">
        {page}
      </div>
      <Button
        onClick={() => setPage(page + 1)}
        disabled={page * 10 >= listLength ? true : false}
        className={`${
          "bg-opacity-0"
        }`}
      >
        Nästa
      </Button>
    </div>
  );
};
