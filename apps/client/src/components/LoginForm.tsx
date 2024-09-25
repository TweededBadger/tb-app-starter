import { JSX, Show } from "solid-js";

import { Button } from "./ui/button";
import { TextField, TextFieldInput } from "~/components/ui/text-field";
import { createLoginMutation } from "~/lib/pocketbaseQuery";
import { useQueryClient } from "@tanstack/solid-query";

type Props = {
  onLogin?: () => void;
};

export default function LoginForm(props: Props) {
  const queryClient = useQueryClient();
  const loginMutation = createLoginMutation(queryClient);

  const handleSubmit: JSX.EventHandler<HTMLFormElement, SubmitEvent> = async (
    event
  ) => {
    event.preventDefault();

    const form = event.currentTarget;
    const emailInput = form.querySelector<HTMLInputElement>(
      'input[name="email"]'
    );
    const passwordInput = form.querySelector<HTMLInputElement>(
      'input[name="password"]'
    );

    if (!emailInput || !passwordInput) {
      console.error("Email or password input not found");
      return;
    }

    const username = emailInput.value;
    const password = passwordInput.value;

    if (!username || !password) {
      console.error("Email or password is missing");
      return;
    }

    const result = await loginMutation.mutateAsync({ username, password });
    if (result) {
      props.onLogin?.();
    }
  };

  return (
    <>
      <form class="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <TextField>
          <TextFieldInput type="email" name="email" />
        </TextField>
        <TextField>
          <TextFieldInput
            placeholder="Password"
            type="password"
            name="password"
          />
        </TextField>
        <Button type="submit" size="lg">
          Login
        </Button>
        <Show when={loginMutation.isPending}>
          <div>Loading...</div>
        </Show>
        <Show when={loginMutation.isError}>
          <div>Error: {loginMutation.error?.message}</div>
        </Show>
      </form>
    </>
  );
}
