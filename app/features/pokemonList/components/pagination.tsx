import { useLoaderData, useSearchParams } from "@remix-run/react";
import Button from "~/components/buttons/button";

export const Pagination = () => {
  const { pokemonList, lastPage } = useLoaderData();

  const [searchParams, setSearchParams] = useSearchParams();

  const order = searchParams.get("order");
  const search = searchParams.get("search");
  const page = Number(searchParams.get("page"));

  const handleClick = (value: number) => {
    setSearchParams(
      new URLSearchParams({
        order: String(order || "pokemonId asc"),
        search: String(search || ""),
        page: String(value),
      }).toString()
    );
  };

  return (
    <div className="flex justify-center w-full my-5 gap-4 text-sm">
      <input name="page" defaultValue={`${page || "1"}`} hidden />

      <Button
        type="button"
        onClick={() => {
          handleClick(page - 1 || 1);
        }}
        disabled={
          !page ||
          page === 1 ||
          (page * 10 < pokemonList.length && search !== "")
            ? true
            : false
        }
      >
        Föregående
      </Button>

      <Button
        type="button"
        onClick={() => {
          handleClick(page !== 0 ? page + 1 : 2);
        }}
        disabled={lastPage <= page ? true : false}
      >
        Nästa
      </Button>
    </div>
  );
};
