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
              className={`flex gap-3 items-center justify-between h-24 px-4 py-3 overflow-hidden capitalize rounded-md relative shadow-lg sm:duration-300 ${colorSelection(
                pokemons.type
              )} hover:opacity-50`}
              key={pokemons.name + index}
            >
              <div className="sm:flex items-center justify-center hidden sm:w-fit max-w-5 h-5 p-5 text-lg rounded-full shadow-lg bg-gradient-to-r from-slate-100 to-slate-300">
                #{pokemons.pokemonId}
              </div>

              <div className="w-full text-white overflow-hidden truncate text-left">
                <Link to={`/view?pokemon_id=${pokemons.pokemonId}`}>
                  {pokemons.name}
                </Link>
              </div>

              <div className="w-0 sm:w-36 sm:h-auto">
                <img
                  className="object-cover object-center w-36 h-auto opacity-70"
                  src={pokemons.image}
                  alt={pokemons.name}
                />
              </div>

              {userId && (
                <div className="w-16 flex justify-center items-center">
                  <PokemonLikeButton
                    data={pokemonLikes}
                    id={pokemons.pokemonId}
                  />
                </div>
              )}
            </div>
          );
        }
      )}
    </div>
  );
};

export default PokemonList;
