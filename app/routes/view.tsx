import type { V2_MetaFunction, LoaderArgs, ActionArgs } from "@remix-run/node";
import { getSession } from "~/services/session.server";
import { getPokemon, getLike, addLike, deleteLike } from "~/api/crud";
import {
  useLoaderData,
  useActionData,
  useRevalidator,
  NavLink,
} from "@remix-run/react";
import { colorSelection } from "~/utiles/color-selection";
import Tag from "~/features/Tag";
import { ProgressBar } from "~/components/progressBar";
import PokemonLikeButton from "~/features/likes/components/likeButton";
import { useEffect } from "react";
import goBackIcon from "public/assets/icons/arrowLeft.svg";
export const meta: V2_MetaFunction = () => {
  return [{ title: "Pokemon" }];
};

export default function View() {
  const { pokemon, like, userId } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const revalidator = useRevalidator();

  useEffect(() => {
    revalidator.revalidate();
  }, [actionData]);

  return pokemon.map((item: any) => {
    return (
      <div key={item.name} className="flex flex-col w-full gap-5 text-white">
        <NavLink
          className="flex items-center justify-center w-10 h-10 text-4xl rounded-full hover:opacity-50"
          to="/"
        >
          <img src={goBackIcon} alt="Tillbaka" />
        </NavLink>
        <h1 className="flex justify-center text-5xl capitalize mt-24 mb-36">
          {item.name}
        </h1>
        <div className="flex flex-col justify-center gap-10 md:flex-row md:justify-evenly">
          <div className="w-full flex justify-center">
            <img width="500" src={item.image} alt={item.name} />
          </div>

          <div className="w-full flex flex-col gap-5">
            <h2 className="text-3xl">Information</h2>
            <p className="text-sm">(Kom ihåg att gilla dina älsklingar)</p>
            {userId && <PokemonLikeButton data={like} id={item.id} />}

            <div className="flex flex-col gap-3">
              <h3>Typ</h3>
              <Tag color={colorSelection(item.type)}>{item.type}</Tag>
            </div>

            <div className="flex flex-col gap-3">
              <h3>Egenskaper</h3>
              <div className="flex flex-wrap gap-3">
                <Tag>{item.weight} kg</Tag>
                <Tag>{item.height} Höjd</Tag>
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
                      name={state.name}
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
  const pokemonId = param.get("pokemon_id");

  const pokemon = await getPokemon(pokemonId);
  const like = await getLike(userId?.id, pokemonId);

  return { pokemon: pokemon, like: like, userId: userId?.id };
}

export async function action({ request }: ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const userId: any = session.get("userId");

  const isLiked = await getLike(userId?.id, data.pokemon_id);

  isLiked.length > 0
    ? deleteLike(isLiked[0].id)
    : addLike(data.pokemon_id, userId?.id);

  return { message: "refresh" };
}
