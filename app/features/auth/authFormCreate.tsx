import InputField from "~/components/forms/inputField";
import Button from "~/components/button";
import { Form } from "@remix-run/react";

const AuthForm = () => {
  return (
    <Form className="flex flex-col w-full gap-5" method="post" id="create-form">
      <InputField
        placeholder="Användarnamn *"
        label="Användarnamn"
        name="username"
        required
      />
      <InputField
        placeholder="E-postadress"
        label="Epost adress"
        name="email"
        type="email"
        required
      />
      <div className="flex gap-5">
        <InputField
          placeholder="Lösenord"
          label="Lösenord"
          type="password"
          name="password"
          required
        />
        <InputField
          placeholder="Repetera Lösenord"
          label="Repetera Lösenord"
          type="password"
          name="repeatPassword"
          required
        />
      </div>

      <div className="flex flex-row items-center justify-end w-full px-2">
        <Button>Skapa</Button>
      </div>
    </Form>
  );
};

export default AuthForm;
