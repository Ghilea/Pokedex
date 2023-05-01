import { ActionArgs, LoaderArgs, V2_MetaFunction, json } from "@remix-run/node";
import PokemonList from "~/components/pokemonList";
import { addLike, getLikes, getPokemons, deleteLike } from "~/api/crud";
import Search from "~/components/search";
import { useLoaderData, useSearchParams } from "@remix-run/react";
export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export default function Index() {
  const loaderData = useLoaderData();
  const [params] = useSearchParams();

  console.log(loaderData);
  return (
    <>
      <h1 className="mb-16 text-5xl text-white">Pokémon</h1>
      <div className="w-full sm:max-w-[70%] 2xl:max-w-[40%] sm:max-h-[70%] h-full 2xl:max-h-[50%] flex justify-center items-center flex-col">
        <Search param={params} />
        <PokemonList data={loaderData} />
      </div>
    </>
  );
}

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const param = new URLSearchParams(url.search);
  const search = param.get("search");
  const sort = param.get("sort");
  const order = param.get("order");
  const userId = 1;
  const pokemons = await getPokemons(search, sort, order);
  const likes = await getLikes(userId);

  return Promise.all([pokemons.json(), likes.json()]);
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const userId = 1;
  const isLiked = await getLikes(userId).then(
    (res: { json: () => Promise<any> }) => res.json().then((data) => data)
  );
  console.log(isLiked);
  const deleteIt = isLiked.find((o: { id: number; pokemon_id: string; user_id: number }) => {
    if (o.pokemon_id == data.pokemon_id && o.user_id == userId)
      return o.id
  });

  console.log('del',deleteIt);

  return deleteIt !== undefined ? deleteLike(deleteIt.id) : addLike(data.pokemon_id, userId);
}
