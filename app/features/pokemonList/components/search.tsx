import InputField from "../../../components/forms/inputField";
import Button from "~/components/buttons/button";
import {
  Form,
  useSubmit,
  useSearchParams,
} from "@remix-run/react";

const Search = () => {

  const submit = useSubmit();

  const [searchParams, setSearchParams] = useSearchParams();

  const order = searchParams.get("order");
  const search = searchParams.get("search");
  const page = searchParams.get("page");

  return (
    <div className="flex flex-col items-center justify-start max-w-screen-md gap-3 mb-3 w-full">
      <Form
        method="get"
        className="flex flex-col items-center justify-start max-w-screen-md gap-3 mb-3 w-full"
      >
        <div className="flex justify-start w-full gap-2 mb-3">
          <select
            onChange={(e: any) => submit(e.currentTarget.form)}
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
            onChange={(e: any) => submit(e.currentTarget.form)}
            className="h-10 px-5 bg-slate-400 rounded-xl"
            type="search"
            name="search"
            placeholder="Gör din sökning..."
            defaultValue={search}
          />
          <input type="hidden" name="page" defaultValue={`${page || '1'}`} />
          <Button type="submit" className="w-10 h-10 gap-2 ml-7">
            Sök
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Search;
