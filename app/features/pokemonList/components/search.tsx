import InputField from "../../../components/forms/inputField";
import Button from "~/components/buttons/button";
import { Form, useFetcher, useLoaderData } from "@remix-run/react";
import { Pagination } from "./pagination";

const Search = () => {
  const { search, sort, order } = useLoaderData();

  const fetcher = useFetcher();

  return (
    <>
      <Form
        method="post"
        className="flex flex-col items-center justify-start w-full gap-3 mb-3"
      >
        <div className="flex w-full gap-2">
          <InputField
            onChange={(e: any) => fetcher.submit(e.currentTarget.form)}
            className="h-10 px-5 bg-slate-400 rounded-xl"
            type="search"
            name="search"
            placeholder="Gör din sökning..."
            defaultValue={search}
          />
          <Button type="submit" className="w-10 h-10 gap-2 ml-7">
            Sök
          </Button>
        </div>

        <div className="flex justify-start w-full gap-2 mb-3">
          <select
            name="order"
            onChange={(e) => fetcher.submit(e.currentTarget.form)}
            defaultValue={`${sort} ${order}`}
            className="w-full max-w-fit shadow-xl py-2 px-3 flex justify-center items-center gap-1 rounded-md text-white bg-blue-500 bg-opacity-50 hover:bg-opacity-75 transition-all"
          >
            <option value="pokemonId asc">&darr; Id</option>
            <option value="name asc">&darr; Namn</option>
            <option value="pokemonId desc">&uarr; Id</option>
            <option value="name desc">&uarr; Namn</option>
          </select>
        </div>
        
          <Pagination />
      </Form>
    </>
  );
};

export default Search;
