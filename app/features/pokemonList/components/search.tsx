import InputField from "../../../components/forms/inputField";
import { useSearchParams } from "@remix-run/react";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const order = searchParams.get("order");
  const search = searchParams.get("search");
  const page = Number(searchParams.get("page"));

  const handleOrder = (value: string) => {
    setSearchParams(
      new URLSearchParams({
        order: String(value),
        search: String(search || ""),
        page: String(page || "1"),
      }).toString()
    );
  };

  const handleSearch = (value: number | string) => {
    setSearchParams(
      new URLSearchParams({
        order: String(order || "pokemonId asc"),
        search: String(value),
        page: String(1),
      }).toString()
    );
  };

  return (
    <div className="flex flex-col items-center justify-start max-w-screen-md gap-3 mb-3 w-full">
      <div className="flex flex-col items-center justify-start max-w-screen-md gap-3 mb-3 w-full">
        <div className="flex justify-start w-full gap-2 mb-3">
          <select
            onChange={(e: any) => handleOrder(e.target.value)}
            name="order"
            defaultValue={`${order}`}
            className="w-full max-w-fit shadow-xl py-2 px-3 flex justify-center items-center gap-1 rounded-md text-white bg-blue-500 bg-opacity-50 hover:bg-opacity-75 transition-all"
          >
            <option value="pokemonId asc">&darr; Id</option>
            <option value="name asc">&darr; Namn</option>
            <option value="pokemonId desc">&uarr; Id</option>
            <option value="name desc">&uarr; Namn</option>
          </select>
        </div>
        <div className="flex w-full gap-2">
          <InputField
            onChange={(e: any) => handleSearch(e.target.value)}
            className="h-10 px-5 bg-slate-400 rounded-xl"
            type="search"
            name="search"
            placeholder="Gör din sökning..."
            defaultValue={search}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
