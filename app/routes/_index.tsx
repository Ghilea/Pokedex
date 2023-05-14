import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
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
import { getSession, commitSession } from "~/services/session.server";
import { useLoaderData, useActionData, useRevalidator } from "@remix-run/react";
import { useEffect } from "react";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Sök pokémon" }];
};

export default function Index() {
  const { pokemonList, pokemonLikes, userId, search, orderId, orderName } =
    useLoaderData();

  const actionData = useActionData<typeof action>();

  const revalidator = useRevalidator();

  useEffect(() => {
    revalidator.revalidate();
  }, [actionData]);

  return (
    <>
      <h1 className="mb-16 text-5xl text-white font-pokemon">Pokémon</h1>
      <div className="w-full sm:max-w-[70%] 2xl:max-w-[40%] sm:max-h-[70%] h-full 2xl:max-h-[50%] flex justify-center items-center flex-col">
        <Search search={search} orders={{ orderId, orderName }} />
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
  const params: any = session.get("params");

  const checkDBForPokemons = await getPokemons();

  if (checkDBForPokemons.length === 0) {
    await downloadPokemonFromAPI();
  }

  return {
    pokemonList: await getPokemons(
      params?.search,
      params?.orderId,
      params?.orderName
    ),
    pokemonLikes: userId ? await getLikes(userId?.id) : null,
    userId: userId?.id,
    search: params?.search,
    orderId: params?.orderId,
    orderName: params?.orderName,
  };
}

export async function action({ request }: ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const userId: any = session.get("userId");
  const params: any = session.get("params");

  if ((data.search === '') || data.search || (data.orderId === '') || data.orderId || (data.orderName === '') || data.orderName) {
    session.set("params", {
      search: data.search === undefined ? params.search : data.search,
      orderId: data.orderId === undefined ? "" : data.orderId,
      orderName: data.orderName === undefined ? "" : data.orderName,
    });
    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } else {
    const isLiked = await getLike(userId?.id, data.pokemon_id);

    isLiked.length > 0
      ? deleteLike(isLiked[0].id)
      : addLike(data.pokemon_id, userId?.id);
  }

  return { message: "refresh" };
}
