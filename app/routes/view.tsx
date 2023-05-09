import type { V2_MetaFunction, LoaderArgs } from "@remix-run/node";
import { getSession } from "~/api/services/session.server";
import { getPokemon, getLike } from "~/api/crud";
import { useLoaderData } from "@remix-run/react";
import { colorSelection } from "~/utiles/color-selection";
import Tag from "~/components/tag";

export const meta: V2_MetaFunction = () => {
  return [{ title: "namn på pokemon" }];
};

export default function View() {
  const data = useLoaderData();
  console.log(data);

  const pokemon = data[0];
  const like = data[1];
  const userId = data[2];

  return (
    <div className="flex flex-col w-full gap-5 text-white">
      <h1 className="flex justify-center text-5xl capitalize">
        {pokemon.name}
      </h1>
      <div className="flex flex-col justify-center gap-10 md:flex-row md:justify-evenly">
        <div className="w-full md:w-[70%] flex justify-center">
          <img width="500" src={pokemon.image} alt={pokemon.name} />
        </div>

        <div className="w-full md:w-[30%] flex flex-col gap-5">
          <h2 className="text-3xl">Information</h2>

          <div className="flex flex-col gap-3">
            <h3>Typ</h3>
            <Tag color={colorSelection(pokemon.type)}>{pokemon.type}</Tag>
          </div>

          <div className="flex flex-col gap-3">
            <h3>Egenskaper</h3>
            <div className="flex gap-3">
              <Tag>{pokemon.weight} kg</Tag>
              <Tag>{pokemon.height} cm</Tag>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3>Färdigheter</h3>
            <div className="flex gap-3">
              {pokemon.abilities.map((skill: string) => {
                return (
                  <Tag className="capitalize" key={skill}>
                    {skill}
                  </Tag>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function loader({ request }: LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const userId: any = session.get("userId");

  const url = new URL(request.url);
  const param = new URLSearchParams(url.search);
  const pokemonId = param.get("id");

  const pokemon = await getPokemon(pokemonId);
  const like = await getLike(userId?.id, pokemonId);

  return Promise.all([pokemon, like, userId?.id]);
}
