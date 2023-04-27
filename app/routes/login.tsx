import type { V2_MetaFunction } from "@remix-run/node";
import AuthForm from "~/features/auth/authForm";
import loginCss from "~/styles/components/login.css";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Logga in" }];
};

export default function Login() {
  return (
    <main className="flex items-center justify-center w-full h-full">
      <div className="w-full sm:max-w-[70%] 2xl:max-w-[40%] sm:max-h-[70%] h-full 2xl:max-h-[50%] bg-red-700 sm:bg-white sm:bg-opacity-75 shadow-2xl sm:rounded-2xl flex justify-center items-center flex-col backdrop-blur-md">
        <AuthForm />
      </div>
    </main>
  );
}

interface ActionRequest {
  request: Request;
}
export async function actions({ request }: ActionRequest) {
  const formData = await request.formData();
  console.log(formData);
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: loginCss,
    },
  ];
}
