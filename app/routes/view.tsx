import type { V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
  return [{ title: "namn på pokemon" }];
};

export default function View() {
  return (
   <div> Visa pokemon</div>
  );
}
