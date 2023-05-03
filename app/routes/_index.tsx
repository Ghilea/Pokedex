import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import PokemonList from "~/components/pokemonList";
import { addLike, getLikes, getPokemons, deleteLike } from "~/api/crud";
import Search from "~/components/search";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { getSession } from "~/api/services/session.server";
import Paginate from "~/components/paginate";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Sök pokémon" }];
};

export default function Index() {
  const data = useLoaderData();
  const [params] = useSearchParams();

  return (
    <>
      <h1 className="mb-16 text-5xl text-white font-pokemon">Pokémon</h1>
      <div className="w-full sm:max-w-[70%] 2xl:max-w-[40%] sm:max-h-[70%] h-full 2xl:max-h-[50%] flex justify-center items-center flex-col">
        <Search param={params} />
        <PokemonList data={data} />
        <Paginate />
      </div>
    </>
  );
}

export async function loader({ request }: LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const userId: any = session.get("userId");
  
  const url = new URL(request.url);
  const param = new URLSearchParams(url.search);
  const search = param.get("search");
  const sort = param.get("sort");
  const order = param.get("order");

  const pokemons = await getPokemons(search, sort, order);
  const likes = await getLikes(userId?.id);

  return Promise.all([pokemons.json(), likes.json(), userId?.id]);
}

export async function action({ request }: ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const userId: any = session.get("userId");
  const isLiked = await getLikes(userId?.id).then(
    (res: { json: () => Promise<any> }) => res.json().then((data) => data)
  );

  const deleteIt = isLiked.find(
    (o: { id: number; pokemon_id: string; user_id: number }) => {
      if (o.pokemon_id == data.pokemon_id && o.user_id == userId?.id) {
        return o.id;
      }
    }
  );

  return deleteIt !== undefined
    ? deleteLike(deleteIt.id)
    : addLike(data.pokemon_id, userId?.id);
}
