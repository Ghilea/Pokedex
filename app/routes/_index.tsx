import type { V2_MetaFunction } from "@remix-run/node";
import PokemonList from "~/components/pokemonList";
import PokemonView from "~/components/pokemonView";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export default function Index() {
  return (
    <main>
        <PokemonList />
        <PokemonView />
    </main>
  );
}