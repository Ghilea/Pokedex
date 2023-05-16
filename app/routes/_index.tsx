import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
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
import { getSession, commitSession } from "~/services/session.server";
import { useActionData, useRevalidator } from "@remix-run/react";
import { useEffect } from "react";

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
    </div>
  );
}

export async function loader({ request }: LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const userId: any = session.get("userId");
  const params: any = session.get("params");

  const checkDBForPokemons = await getAllPokemons();

  if (checkDBForPokemons.length === 0) {
    await downloadPokemonFromAPI();
  }

  return {
    pokemonList: await getPokemons(
      params?.search,
      params?.sort,
      params?.order,
      params?.currentPage
    ),
    pokemonLikes: userId ? await getLikes(userId?.id) : null,
    userId: userId?.id,
    search: params?.search,
    sort: params?.sort,
    order: params?.order,
    listLength: checkDBForPokemons.length,
    currentPage: params?.currentPage,
  };
}

export async function action({ request }: ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const userId: any = session.get("userId");

  if (
    data.hasOwnProperty("search") ||
    data.hasOwnProperty("order") ||
    data.hasOwnProperty("currentPage")
  ) {
    const split = data.order.toString().split(" ");
    const sort = split[0];
    const order = split[1];

    session.set("params", {
      search: data.search,
      sort: sort === undefined ? "id" : sort,
      order: order === undefined ? "asc" : order,
      currentPage: Number(data.currentPage),
    });
    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  if (data.hasOwnProperty("pokemon_id")) {
    const isLiked = await getLike(userId?.id, data.pokemon_id);

    isLiked.length > 0
      ? deleteLike(isLiked[0].id)
      : addLike(data.pokemon_id, userId?.id);
  }

  return { message: "refresh" };
}
