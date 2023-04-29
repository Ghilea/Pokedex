import { Form } from "@remix-run/react";

const Sort = () => {
  return (
    <Form
      className="flex flex-row items-center justify-between w-full gap-3 mb-3"
      id="search-form"
    >
    <select
        className="flex items-center w-full h-10 px-5 bg-slate-400 rounded-xl"
        name="sortPokemon"
        id="sortPokemon"
      >
        <option value="">Sortera på</option>
        <option value="type">Typ</option>
        <option value="name">Namn</option>
        <option value="likes">Likes</option>
        <option value="pokemonId">Id</option>
      </select>
    </Form>
  );
};

export default Sort;
