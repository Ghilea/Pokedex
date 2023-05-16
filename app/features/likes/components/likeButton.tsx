import { Form } from "@remix-run/react";
import heart from "public/assets/icons/heart.svg";
import redHeart from "public/assets/icons/redHeart.svg";

interface Props {
  data: any;
  id: number;
  className?: string;
}

const LikeButton = ({ data, id, className}: Props) => {

  return (
    <Form method="post">
      <input name="pokemon_id" value={id} hidden readOnly />
      <button type="submit" className={`${className}`}>
        <img
          className="w-5 h-5 transition-all"
          src={
            data &&
            data?.find((o: { pokemon_id: number }) => o.pokemon_id == id)
              ? redHeart
              : heart
          }
          alt="like"
        />
      </button>
    </Form>
  );
};

export default LikeButton;
