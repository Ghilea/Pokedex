import InputField from "./forms/inputField";
import Button from "~/components/button";
import { Form, useFetcher } from "@remix-run/react";
import { useState } from "react";

interface Props {
  defaultValue: any;
}

const Search = ({ defaultValue }: Props) => {
  const [sort, setSort] = useState<string>("id");
  const [order, setOrder] = useState<boolean>(true);
  
  const handleClickId = (e: any) => {
    if (sort === "id" && order) {
      setOrder(false);
    } else {
      setOrder(true);
    }

    setSort("id");

    fetcher.submit(e.currentTarget.form);
  };

  const handleClickName = (e: any) => {
    if (sort === "name" && order) {
      setOrder(false);
    } else {
      setOrder(true);
    }

    setSort("name");

    fetcher.submit(e.currentTarget.form);
  };

  const fetcher = useFetcher();

  return (
    <Form
      method="post"
      className="flex flex-col items-center justify-start w-full gap-3 mb-3"
    >
      <InputField
        onChange={(e: any) => fetcher.submit(e.currentTarget.form)}
        className="h-10 px-5 bg-slate-400 rounded-xl"
        type="search"
        name="search"
        placeholder="Gör din sökning..."
   
        defaultValue={defaultValue}
      />

      <input name="sort" defaultValue={sort} hidden />
      <input name="order" defaultValue={order ? "asc" : "desc"} hidden />

      <div className="flex justify-start w-full gap-2">
        <Button
          type="button"
          onClick={(e: any) => handleClickId(e)}
          className="w-10 h-10 gap-2 ml-7"
          icon={
            sort == "id"
              ? order
                ? "/assets/icons/arrowDown.svg"
                : "/assets/icons/arrowUp.svg"
              : null
          }
        >
          Id
        </Button>
        <Button
          type="button"
          onClick={(e: any) => handleClickName(e)}
          className="w-10 h-10 gap-2 ml-7"
          icon={
            sort == "name"
              ? order
                ? "/assets/icons/arrowDown.svg"
                : "/assets/icons/arrowUp.svg"
              : null
          }
        >
          Namn
        </Button>
      </div>
    </Form>
  );
};

export default Search;
