import InputField from "./forms/inputField";
import Button from "~/components/button";
import { Form } from "@remix-run/react";
import { useSubmit } from "@remix-run/react";
import { useState } from "react";

interface Props {
  param: any
 }

const Search = ({ param }: Props) => {
  const [sort, setSort] = useState<string>("id");
  const submit = useSubmit();
  
  const handleClickId = () => {
    setSort("id");
  }
  
  const handleClickName = () => {
    setSort("name");
  };
  
  const handleOnChange = (e: any, sort: string) => {
    submit({ search: e.target.value, sort: sort}, { method: "GET" });
  };
  
  return (
    <Form
      className="flex flex-col items-center justify-start w-full gap-3 mb-3"
      id="search-form"
    >
      <InputField
        className="h-10 px-5 bg-slate-400 rounded-xl"
        type="search"
        name="search"
        placeholder="Gör din sökning..."
        defaultValue={param.get('search')}
        onChange={(e: any) => handleOnChange(e, sort)}
      />

      <input name='sort' defaultValue={sort} hidden/>

      <div className="flex justify-start w-full gap-2">
        <Button
          onClick={() => handleClickId()}
          className="w-10 h-10 gap-2 ml-7"
        >
          Id
        </Button>
        <Button
          onClick={() => handleClickName()}
          className="w-10 h-10 gap-2 ml-7"
        >
          Namn
        </Button>
      </div>
    </Form>
  );
};

export default Search;
