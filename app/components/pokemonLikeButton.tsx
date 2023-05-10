import { Form } from "@remix-run/react";
import heart from "../../public/assets/icons/heart.svg";
import redHeart from "../../public/assets/icons/redHeart.svg";

interface Props { 
  data: any;
  id: number;
}

const PokemonLikeButton = ({ data, id }: Props) => {

  return (
    <Form method="post" action="/?index">
      <input name="pokemon_id" value={id} hidden readOnly />
      <button className="w-5 h-5">
        <img
          src={
            data && data?.find((o: { pokemon_id: number }) => o.pokemon_id == id)
              ? redHeart
              : heart
          }
          alt="like"
        />
      </button>
    </Form>
  );
}

export default PokemonLikeButton