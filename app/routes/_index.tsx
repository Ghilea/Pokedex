import type { V2_MetaFunction } from "@remix-run/node";
import PokemonList from "~/components/pokemonList";
import { getPokemons } from "~/api/crud";
import Search from "~/components/search";
import Sort from "~/components/sort";
import { useLoaderData, useSearchParams } from "@remix-run/react";
export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export default function Index() {
  const data = useLoaderData();
  const [params] = useSearchParams();

  console.log("data", data);
  console.log("params", params.get("search"));

  return (
    <main className="flex items-center justify-center w-full h-full">
      <div className="w-full sm:max-w-[70%] 2xl:max-w-[40%] sm:max-h-[70%] h-full 2xl:max-h-[50%] bg-red-700 sm:bg-white sm:bg-opacity-75 shadow-2xl sm:rounded-2xl flex justify-center items-center flex-col backdrop-blur-md">
        <h1 className="mb-16 text-3xl">Pokémon</h1>
        <Sort />
        <Search search={params.get("search")} />
        {data.length > 0 && <PokemonList data={data} />}
      </div>
    </main>
  );
}

interface ActionRequest {
  request: Request;
}

export function loader({ request }: ActionRequest) {
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);
  
  return getPokemons(search.get("search"));
}