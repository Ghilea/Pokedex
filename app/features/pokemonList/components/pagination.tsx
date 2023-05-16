import { useLoaderData } from "@remix-run/react";
import Button from "~/components/buttons/button";
import { useState, useEffect } from "react";

export const Pagination = () => {
  const { currentPage, listLength, pokemonList, search } = useLoaderData();

  const [page, setPage] = useState(currentPage);

  useEffect(() => {
    if (search !== "") {
      setPage(1);
    }
  }, [search]);

  const lastPage =
    pokemonList.length > 0 && search !== ""
      ? Math.ceil(pokemonList.length / 10)
      : Math.ceil(listLength / 10);

  return (
    <div className="flex justify-between w-full my-5 gap-4">
      <input name="currentPage" defaultValue={page} hidden />

      <Button
        onClick={() => setPage((prev: number) => prev - 1 || 1)}
        disabled={
          currentPage === 1 || (page * 10 < pokemonList.length && search !== "")
            ? true
            : false
        }
      >
        Föregående
      </Button>
      <div className="w-full shadow-xl py-2 px-3 flex justify-center items-center gap-1 rounded-md text-white bg-blue-500 bg-opacity-50 hover:bg-opacity-75 transition-all">
        {pokemonList.length !== 0 ? (
          <span className="">
            Sida {!page ? 1 : page} av {lastPage}
          </span>
        ) : (
          "Din söktning gav inget resultat. Gör en ny sökning."
        )}
      </div>

      <Button
        onClick={() => setPage((prev: number) => prev + 1 || page)}
        disabled={(lastPage <= currentPage) ? true : false}
        className={`${"bg-opacity-0"}`}
      >
        Nästa
      </Button>
    </div>
  );
};
