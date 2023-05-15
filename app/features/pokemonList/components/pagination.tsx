import { useState } from "react";
import { useLoaderData, useFetcher } from "@remix-run/react";
import Button from "~/components/buttons/button";

export const Pagination = () => {
  const { currentPage, listLength, pokemonList, search } = useLoaderData();

  const [page, setPage] = useState<number>(currentPage);

  const fetcher = useFetcher();

  console.log("test", listLength, pokemonList.length, page, currentPage);

  return (
    <div className="flex justify-between w-full my-5 gap-4">
      <input
        name="currentPage"
        onChange={(e) => fetcher.submit(e.currentTarget.form)}
        value={page}
        hidden
      />
      <Button
        onClick={() => setPage(page - 1 || 1)}
        disabled={
          page < 1 || (page * 10 < pokemonList.length && search !== "")
            ? true
            : false
        }
      >
        Föregående
      </Button>

      <div className="w-full shadow-xl py-2 px-3 flex justify-center items-center gap-1 rounded-md text-white bg-blue-500 bg-opacity-50 hover:bg-opacity-75 transition-all">
        {pokemonList.length !== 0
          ? `Du är på sida ${page} av 
        ${
          pokemonList.length > 0 && search !== ""
            ? Math.ceil(pokemonList.length / 10)
            : Math.ceil(listLength / 10)
        }`
          : "Din söktning gav inget resultat. Gör en ny sökning."}
      </div>

      <Button
        onClick={() => setPage(page + 1)}
        disabled={
          page * 10 > listLength ||
          (page * 10 >= pokemonList.length && search !== "")
            ? true
            : false
        }
        className={`${"bg-opacity-0"}`}
      >
        Nästa
      </Button>
    </div>
  );
};
