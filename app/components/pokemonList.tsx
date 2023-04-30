import { Link } from "@remix-run/react";
import heart from "../../public/assets/icons/heart.svg";
import { colorSelection } from "~/utiles/color-selection";

interface Props {
  data: any;
}

const PokemonList = ({ data }: Props) => {
  return (
    <div className="flex flex-col w-full gap-2 text-3xl text-black">
      {data?.map(
        (
          pokemons: {
            id: string;
            name: string;
            image: string;
            type: string;
          },
          index: number
        ) => {
          return (
            <div
              className={`flex items-center justify-start h-16 gap-3 px-5 py-3 overflow-hidden capitalize rounded-md bg-gradient-to-r relative shadow-lg ${colorSelection(
                pokemons.type
              )}`}
              key={pokemons.name + index}
            >
              <span className="flex items-center justify-center w-5 h-5 p-5 text-lg rounded-full shadow-lg bg-gradient-to-r from-slate-100 to-slate-300">
                #{pokemons.id}
              </span>

              <h2 className="w-full ml-3 text-white">
                <Link to={`/view?${pokemons.id}`}>{pokemons.name}</Link>
              </h2>

              <div>
                <img
                  className="absolute right-[10%] object-cover object-center w-[7em] opacity-70"
                  src={pokemons.image}
                  alt={`${pokemons.name}`}
                />
              </div>
              <div>
                <button className="w-5 h-5">
                  <img src={heart} alt="like" />
                </button>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default PokemonList;
