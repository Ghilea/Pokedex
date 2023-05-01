import InputField from "~/components/forms/inputField";
import Button from "~/components/button";
import { Form, Link } from "@remix-run/react";

const AuthForm = () => {

  return (
    <Form className="flex flex-col w-full gap-5" method="post" id="create-form">
      <InputField
        placeholder="E-post adress"
        label="Epost adress"
        name="username"
        type="email"
      />
      <InputField
        placeholder="Lösenord"
        label="Lösenord"
        type="password"
        name="password"
      />
      <InputField
        placeholder="Lösenord"
        label="Lösenord"
        type="rePassword"
        name="password"
      />
      <div className="flex flex-row items-center justify-end w-full px-2">
        <Button>Skapa</Button>
      </div>
    </Form>
  );
};

export default AuthForm;
