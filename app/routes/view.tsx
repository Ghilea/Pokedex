import type { V2_MetaFunction, LoaderArgs } from "@remix-run/node";
import { getSession } from "~/services/session.server";
import { getPokemon, getLike } from "~/api/crud";
import { useLoaderData } from "@remix-run/react";
import { colorSelection } from "~/utiles/color-selection";
import Tag from "~/components/tag";
import { ProgressBar } from "~/components/progressBar";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Pokemon" }];
};

export default function View() {
  const { pokemon, like, userId } = useLoaderData();

  return pokemon.map((item: any) => {
    return (
      <div key={item.name} className="flex flex-col w-full gap-5 text-white">
        <h1 className="flex justify-center text-5xl capitalize">{item.name}</h1>
        <div className="flex flex-col justify-center gap-10 md:flex-row md:justify-evenly">
          <div className="w-full md:w-[70%] flex justify-center">
            <img width="500" src={item.image} alt={item.name} />
          </div>

          <div className="w-full md:w-[30%] flex flex-col gap-5">
            <h2 className="text-3xl">Information</h2>

            <div className="flex flex-col gap-3">
              <h3>Typ</h3>
              <Tag color={colorSelection(item.type)}>{item.type}</Tag>
            </div>

            <div className="flex flex-col gap-3">
              <h3>Egenskaper</h3>
              <div className="flex flex-wrap gap-3">
                <Tag>{item.weight} kg</Tag>
                <Tag>{item.height} cm</Tag>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h3>Färdigheter</h3>
              <div className="flex flex-wrap gap-3">
                {JSON.parse(item.abilities).map((skill: string) => {
                  return (
                    <Tag className="capitalize" key={skill}>
                      {skill}
                    </Tag>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h3>Status</h3>
              <div className="flex flex-wrap gap-3">
                {JSON.parse(item.stats).map((state: any) => {
                  return (
                    <ProgressBar
                      progress={100}
                      amount={state.amount}
                      key={state.name}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
}

export async function loader({ request }: LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const userId: any = session.get("userId");

  const url = new URL(request.url);
  const param = new URLSearchParams(url.search);
  const pokemonId = param.get("pokemonId");
  console.log("id", pokemonId);
  const pokemon = await getPokemon(pokemonId);
  const like = await getLike(userId?.id, pokemonId);

  return { pokemon: pokemon, like: like, userId: userId?.id };
}
