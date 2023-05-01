import InputField from "~/components/forms/inputField";
import Button from "~/components/button";
import { Form, Link } from "@remix-run/react";

const AuthForm = () => {

  return (
    <Form className="flex flex-col w-full gap-5" method="post" id="login-form">
      <InputField
        placeholder="E-post adress"
        label="E-post adress"
        name="username"
        type="email"
      />
      <InputField
        placeholder="Lösenord"
        label="Lösenord"
        type="password"
        name="password"
      />
      <div className="flex flex-row items-center justify-end w-full px-2">
        <div className="flex items-center w-full gap-1 text-white">
          <Link to={"/createAccount"} className="text-sm">
            Registrera
          </Link>
          /
          <Link to={"/login"} className="text-sm">
            Glömt lösenord?
          </Link>
        </div>
        <Button>Logga in</Button>
      </div>
    </Form>
  );
};

export default AuthForm;
