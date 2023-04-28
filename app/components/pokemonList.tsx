import { useState, useEffect } from "react";
import { getPokemons } from "~/api/crud";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    getPokemons()
      .then((res: any) => res.json())
      .then((data: any) =>
        setPokemons(
          data.map((pokemons: { name: string }, index: number) => {
            return <div
              className="flex items-center px-5 py-3 capitalize bg-red-200 rounded-md"
              key={pokemons.name + index}
            >
              {pokemons.name}
            </div>
          })
        )
      );
  }, []);
  
  return (
    <>
      <h1 className="mb-16 text-3xl">Pokémon</h1>
      <div className="flex flex-col w-full gap-2 text-3xl text-black">
        {pokemons}
      </div>
    </>
  );
};

export default PokemonList;
