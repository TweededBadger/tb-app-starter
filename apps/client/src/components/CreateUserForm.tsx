import { createForm, required, email, minLength } from "@modular-forms/solid";
import { Show } from "solid-js";
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
  TextFieldErrorMessage,
} from "./ui/text-field";
import { Button } from "./ui/button";
import { createUserMutation } from "~/lib/pocketbaseQuery";
import { useQueryClient } from "@tanstack/solid-query";

type CreateUserForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

type Props = {
  onSuccess?: () => void;
};

export default function CreateUserForm(props: Props) {
  const queryClient = useQueryClient();
  const [, { Form, Field }] = createForm<CreateUserForm>();
  const createUser = createUserMutation(queryClient);

  const handleSubmit = async (values: CreateUserForm) => {
    await createUser.mutateAsync(values);
    props.onSuccess?.();
  };

  return (
    <Form onSubmit={handleSubmit} class="space-y-4">
      <Field name="firstName" validate={[required("First name is required")]}>
        {(field, props) => (
          <TextField>
            <TextFieldLabel>First Name</TextFieldLabel>
            <TextFieldInput {...props} type="text" />
            <Show when={field.error}>
              <TextFieldErrorMessage>{field.error}</TextFieldErrorMessage>
            </Show>
          </TextField>
        )}
      </Field>

      <Field name="lastName" validate={[required("Last name is required")]}>
        {(field, props) => (
          <TextField>
            <TextFieldLabel>Last Name</TextFieldLabel>
            <TextFieldInput {...props} type="text" />
            <Show when={field.error}>
              <TextFieldErrorMessage>{field.error}</TextFieldErrorMessage>
            </Show>
          </TextField>
        )}
      </Field>

      <Field
        name="email"
        validate={[
          required("Email is required"),
          email("Invalid email format"),
        ]}
      >
        {(field, props) => (
          <TextField>
            <TextFieldLabel>Email</TextFieldLabel>
            <TextFieldInput {...props} type="email" />
            <Show when={field.error}>
              <TextFieldErrorMessage>{field.error}</TextFieldErrorMessage>
            </Show>
          </TextField>
        )}
      </Field>

      <Field
        name="password"
        validate={[
          required("Password is required"),
          minLength(8, "Password must be at least 8 characters"),
        ]}
      >
        {(field, props) => (
          <TextField>
            <TextFieldLabel>Password</TextFieldLabel>
            <TextFieldInput {...props} type="password" />
            <Show when={field.error}>
              <TextFieldErrorMessage>{field.error}</TextFieldErrorMessage>
            </Show>
          </TextField>
        )}
      </Field>

      <Field
        name="passwordConfirm"
        validate={[required("Please confirm your password")]}
      >
        {(field, props) => (
          <TextField>
            <TextFieldLabel>Confirm Password</TextFieldLabel>
            <TextFieldInput {...props} type="password" />
            <Show when={field.error}>
              <TextFieldErrorMessage>{field.error}</TextFieldErrorMessage>
            </Show>
          </TextField>
        )}
      </Field>

      <Button type="submit" disabled={createUser.isPending}>
        {createUser.isPending ? "Creating..." : "Create Account"}
      </Button>

      <Show when={createUser.isError}>
        <p class="text-red-500">{createUser.error?.message}</p>
      </Show>
    </Form>
  );
}
