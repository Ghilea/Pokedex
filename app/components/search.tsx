import InputField from "./forms/inputField";
import Button from "~/components/button";
import { Form, useFetcher } from "@remix-run/react";

interface Props {
  search: any;
  orders: any;
}

const Search = ({ search, orders }: Props) => {
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
            defaultValue={`${orders.sort} ${orders.order}`}
          >
            {/*  "/assets/icons/arrowUp.svg" <img src="/assets/icons/arrowDown.svg" alt="" /> */}
            <option value="id asc">Id fallande</option>
            <option value="id desc">Id stigande</option>
            <option value="name asc">Namn fallande</option>
            <option value="name desc">Namn stigande</option>
          </select>
        </div>
      </Form>
    </>
  );
};

export default Search;
