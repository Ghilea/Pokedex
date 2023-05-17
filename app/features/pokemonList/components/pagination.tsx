import { Form, useLoaderData, useSearchParams } from "@remix-run/react";
import Button from "~/components/buttons/button";
import { useState } from "react";

export const Pagination = () => {
  const { currentPage, listLength, pokemonList } = useLoaderData();

  const [searchParams, setSearchParams] = useSearchParams();

  const order = searchParams.get("order");
  const search = searchParams.get("search");
  const page = searchParams.get("page");

  const [sPage, setSPage] = useState<any>(page);

  const lastPage =
    pokemonList.length > 0 && search !== ""
      ? Math.ceil(pokemonList.length / 10)
      : Math.ceil(listLength / 10);

  return (
    <Form method="get">
      <div className="flex justify-center w-full my-5 gap-4 text-sm">
        <input
          name="order"
          defaultValue={`${order || "pokemonId asc"}`}
          hidden
        />
        <input name="search" defaultValue={`${search || ""}`} hidden />
        <input name="page" defaultValue={`${sPage || "1"}`} hidden />

        <Button
          onClick={() => setSPage(page ? Number(page) - 1 : 1)}
          disabled={
            !page || page === "1" ||
            (currentPage * 10 < pokemonList.length && search !== "")
              ? true
              : false
          }
        >
          Föregående
        </Button>

        <Button
          onClick={() => setSPage(page ? Number(page) + 1 : 2)}
          disabled={lastPage <= currentPage ? true : false}
          className={`${"bg-opacity-0"}`}
        >
          Nästa
        </Button>
      </div>
    </Form>
  );
};
