import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import PokemonList from "~/features/pokemonList";
import {
  addLike,
  getLike,
  getLikes,
  getPokemons,
  getAllPokemons,
  deleteLike,
  downloadPokemonFromAPI,
} from "~/api/crud";
import Search from "~/features/pokemonList/components/search";
import { getSession } from "~/services/session.server";
import { useActionData, useRevalidator } from "@remix-run/react";
import { useEffect } from "react";
import { Pagination } from "~/features/pokemonList/components/pagination";
export const meta: V2_MetaFunction = () => {
  return [{ title: "Sök pokémon" }];
};

export default function Index() {
  const actionData = useActionData<typeof action>();

  const revalidator = useRevalidator();

  useEffect(() => {
    revalidator.revalidate();
  }, [actionData]);

  return (
    <div className="w-full flex justify-center items-center flex-col max-w-screen-md mb-36">
      <h1 className="flex justify-center items-center text-2xl md:text-4xl text-white font-pokemon tracking-widest mb-16">
        Gotta Catch ’Em All!
      </h1>

      <Search />
      <PokemonList />
      <Pagination />
    </div>
  );
}

export async function loader({ request }: LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const userId: any = session.get("userId");

  const url = new URL(request.url);
  const searchParams = Object.fromEntries(url.searchParams.entries());

  const checkDBForPokemons = await getAllPokemons();

  if (checkDBForPokemons.length === 0) {
    await downloadPokemonFromAPI();
  }

  const order = searchParams?.order;
  const search = searchParams?.search;
  const page = searchParams?.page;

  const pokemonList =
    searchParams.hasOwnProperty("search") &&
    searchParams.hasOwnProperty("order") &&
    searchParams.hasOwnProperty("page")
      ? await getPokemons(
          search,
          order.toString().split(" ")[0],
          order.toString().split(" ")[1],
          page
        )
      : await getPokemons();

  const lastPage =
    pokemonList.length > 0 && search !== ""
      ? Math.ceil(pokemonList.length / 10)
      : Math.ceil(checkDBForPokemons.length / 10);

  const pokemonLikes = userId ? await getLikes(userId?.id) : null;
  
  return {
    pokemonList: pokemonList,
    pokemonLikes: pokemonLikes,
    userId: userId?.id,
    lastPage: lastPage,
  };
}

export async function action({ request }: ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const userId: any = session.get("userId");

  if (data.hasOwnProperty("pokemon_id")) {
    const isLiked = await getLike(userId?.id, data.pokemon_id);

    isLiked.length > 0
      ? deleteLike(isLiked[0].id)
      : addLike(data.pokemon_id, userId?.id);
  }

  return { message: "refresh" };
}
