import { Link, Form } from "@remix-run/react";
import heart from "../../public/assets/icons/heart.svg";
import redHeart from "../../public/assets/icons/redHeart.svg";
import { colorSelection } from "~/utiles/color-selection";
interface Props {
  data: any;
}

const PokemonList = ({ data }: Props) => {
  return (
    <div className="flex flex-col w-full gap-2 text-3xl text-black">
      {data[0]?.map(
        (
          pokemons: {
            id: number;
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
                  className="object-cover object-center w-[7em] opacity-70"
                  src={pokemons.image}
                  alt={`${pokemons.name}`}
                />
              </div>
              <Form method="post">
                <input name="pokemon_id" value={pokemons.id} hidden readOnly />
                <button className="w-5 h-5">
                  <img
                    src={
                      data[1].find(
                        (o: { pokemon_id: number }) =>
                          o.pokemon_id == pokemons.id
                      )
                        ? redHeart
                        : heart
                    }
                    alt="like"
                  />
                </button>
              </Form>
            </div>
          );
        }
      )}
    </div>
  );
};

export default PokemonList;
