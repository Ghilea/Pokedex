import { V2_MetaFunction, redirect } from "@remix-run/node";
import AuthForm from "~/features/auth/authFormCreate";
import { authControllerCreate } from "~/features/auth/authController";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Skapa konto" }];
};

export default function CreateAccount() {
  return (
    <>
      <h1 className="mb-16 text-5xl text-white">Skapa konto</h1>
      <div className="flex flex-col items-center justify-center w-full h-full max-w-[40em]">
        <AuthForm />
      </div>
    </>
  );
}

interface ActionRequest {
  request: Request;
}
export async function action({ request }: ActionRequest) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const validation = await authControllerCreate(data);

  return validation
    ? redirect("/Login")
    : "Användarnamn eller lösenord är felaktigt";
}
