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
              className={`flex items-center justify-start h-16 gap-3 px-5 py-3 overflow-hidden capitalize rounded-md bg-gradient-to-r relative ${colorSelection(
                pokemons.type
              )}`}
              key={pokemons.name + index}
            >
              <span className="text-lg">#{pokemons.id}</span>
              <h2>{pokemons.name}</h2>
              <img
                className="absolute right-[10%] object-cover object-center w-[7em] opacity-70"
                src={pokemons.image}
                alt={`${pokemons.name}`}
              />
              <button className="absolute w-10 h-10 right-5">
                <img src={heart} alt="like" />
              </button>
            </div>
          );
        }
      )}
    </div>
  );
};

export default PokemonList;
