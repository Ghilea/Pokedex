import type { V2_MetaFunction } from "@remix-run/node";
import PokemonList from "~/components/pokemonList";
import { downloadPokemonFromAPI } from "~/api/crud";
export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export default function Index() {
  return (
    <main className="flex items-center justify-center w-full h-full">
      <div className="w-full sm:max-w-[70%] 2xl:max-w-[40%] sm:max-h-[70%] h-full 2xl:max-h-[50%] bg-red-700 sm:bg-white sm:bg-opacity-75 shadow-2xl sm:rounded-2xl flex justify-center items-center flex-col backdrop-blur-md">
        <PokemonList />
      </div>
    </main>
  );
}

export function loader() { 
  downloadPokemonFromAPI();

  return null;
}