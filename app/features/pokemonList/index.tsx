import { Link, useLoaderData } from "@remix-run/react";
import { colorSelection } from "~/utiles/color-selection";
import PokemonLikeButton from "../likes/components/likeButton";

const PokemonList = () => {
  const { pokemonList, pokemonLikes, userId } = useLoaderData();

  return (
    <div className="flex flex-col w-full gap-2 text-3xl text-black">
      {pokemonList?.map(
        (
          pokemons: {
            pokemonId: number;
            name: string;
            image: string;
            type: string;
          },
          index: number
        ) => {
          return (
            <div
              className={`flex items-center justify-start h-24 gap-3 px-5 py-3 overflow-hidden capitalize rounded-md relative shadow-lg sm:duration-300 ${colorSelection(
                pokemons.type
              )} hover:opacity-50`}
              key={pokemons.name + index}
            >
              <span className="flex items-center justify-center w-5 h-5 p-5 text-lg rounded-full shadow-lg bg-gradient-to-r from-slate-100 to-slate-300">
                #{pokemons.pokemonId}
              </span>

              <h2 className="w-full ml-3 text-white">
                <Link to={`/view?pokemon_id=${pokemons.pokemonId}`}>
                  {pokemons.name}
                </Link>
              </h2>

              <div>
                <img
                  className="object-cover object-center w-[7em] opacity-70"
                  src={pokemons.image}
                  alt={pokemons.name}
                />
              </div>
              {userId && (
                <PokemonLikeButton
                  data={pokemonLikes}
                  id={pokemons.pokemonId}
                />
              )}
            </div>
          );
        }
      )}
    </div>
  );
};

export default PokemonList;
