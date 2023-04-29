import InputField from "~/components/forms/inputField";
import Button from "~/components/button";
import { Link } from "@remix-run/react";

const AuthForm = () => {

  return (
    <form className="flex flex-col w-full gap-5" method="post" id="auth-form">
      <InputField label="Användarnamn" name="username" />
      <InputField label="Lösenord" type="password" name="password" />
      <div className="flex flex-row items-center justify-end w-full gap-10 px-16">
        <div className="flex items-center w-full gap-1">
          <Link to={"/createAccount"} className="text-sm">
            Registrera
          </Link>
          /
          <Link to={"/forgotPassword"} className="text-sm">
            Glömt lösenord?
          </Link>
        </div>
        <Button>Logga in</Button>
      </div>
    </form>
  );
};

export default AuthForm;
