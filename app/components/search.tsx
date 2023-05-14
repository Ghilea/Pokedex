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
        className="flex items-center justify-start w-full gap-3 mb-3"
      >
        <InputField
          onChange={(e: any) => fetcher.submit(e.currentTarget.form)}
          className="h-10 px-5 bg-slate-400 rounded-xl"
          type="search"
          name="search"
          placeholder="Gör din sökning..."
          defaultValue={search}
        />
        <Button
          type="submit"
          className="w-10 h-10 gap-2 ml-7"
        >
          Sök
        </Button>
      </Form>
      <div className="flex justify-start w-full gap-2 mb-3">
        <Form method="post">
          <input
            name="orderId"
            defaultValue={
              orders.orderId === "asc"
                ? "desc"
                : orders.orderId === "desc"
                ? ""
                : orders.orderId === ""
                ? "asc"
                : "asc"
            }
            hidden
          />
          <Button
            type="submit"
            className="w-[10em] h-10 gap-2"
            icon={
              orders.orderId === "asc"
                ? "/assets/icons/arrowDown.svg"
                : orders.orderId === "desc"
                ? "/assets/icons/arrowUp.svg"
                : ""
            }
          >
            Id
          </Button>
        </Form>
        <Form method="post">
          <input
            name="orderName"
            defaultValue={
              orders.orderName === "asc"
                ? "desc"
                : orders.orderName === "desc"
                ? ""
                : orders.orderName === ""
                ? "asc"
                : "asc"
            }
            hidden
          />
          <Button
            type="submit"
            className="w-[10em] h-10 gap-2"
            icon={
              orders.orderName === "asc"
                ? "/assets/icons/arrowDown.svg"
                : orders.orderName === "desc"
                ? "/assets/icons/arrowUp.svg"
                : ""
            }
          >
            Namn
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Search;
