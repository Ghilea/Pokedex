import InputField from "./forms/inputField";
import Button from "~/components/button";
import { Form } from "@remix-run/react";

interface Props {
  search: any;
}

const Search = ({ search }: Props) => {
  return (
    <Form
      className="flex flex-row items-center justify-between w-full gap-3 mb-3"
      id="search-form"
    >
      <InputField
        className="h-10 px-5 bg-slate-400 rounded-xl"
        type="search"
        name="search"
        placeholder="Gör din sökning..."
        defaultValue={search}
      />

      <Button>Sök</Button>
    </Form>
  );
};

export default Search;
