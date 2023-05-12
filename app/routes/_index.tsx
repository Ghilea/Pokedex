import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import PokemonList from "~/components/pokemonList";
import {
  addLike,
  getLike,
  getLikes,
  getPokemons,
  deleteLike,
  downloadPokemonFromAPI,
} from "~/api/crud";
import Search from "~/components/search";
import { getSession } from "~/services/session.server";
import { useLoaderData, useActionData, useRevalidator } from "@remix-run/react";
import { useEffect } from "react";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Sök pokémon" }];
};

export default function Index() {
  const { pokemonList, pokemonLikes, userId } = useLoaderData();

  const actionData = useActionData<typeof action>();

  const revalidator = useRevalidator();

  useEffect(() => {
    revalidator.revalidate();
  }, [actionData]);
  
  return (
    <>
      <h1 className="mb-16 text-5xl text-white font-pokemon">Pokémon</h1>
      <div className="w-full sm:max-w-[70%] 2xl:max-w-[40%] sm:max-h-[70%] h-full 2xl:max-h-[50%] flex justify-center items-center flex-col">
        <Search defaultValue={""} />
        <PokemonList
          pokemonList={pokemonList}
          pokemonLikes={pokemonLikes}
          userId={userId}
        />
      </div>
    </>
  );
}

export async function loader({ request }: LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const userId: any = session.get("userId");
  const searchParams: any = session.get("searchParams");

  console.log("session", searchParams);

  const getPokemonsList = await getPokemons();

  if (getPokemonsList.length === 0) {
    await downloadPokemonFromAPI();
  }
  
  return {
    pokemonList: await getPokemons(),
    pokemonLikes: userId ? await getLikes(userId?.id) : null,
    userId: userId?.id,
  };
}

export async function action({ request }: ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const userId: any = session.get("userId");

  session.set("searchParams", data);
  
  const isLiked = await getLike(userId?.id, data.pokemon_id);

  isLiked.length > 0
    ? deleteLike(isLiked[0].id)
    : addLike(data.pokemon_id, userId?.id);
  
   return { message: "reload" };
}
