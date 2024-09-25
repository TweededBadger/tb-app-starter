import { useLocation } from "@solidjs/router";
import { Match, Switch, createSignal, onCleanup, onMount } from "solid-js";
import {
  createRefreshUserQuery,
  createLogoutMutation,
} from "~/lib/pocketbaseQuery";
import { Button } from "./ui/button";
import { useQueryClient } from "@tanstack/solid-query";
import { useDialog } from "~/context/DialogContext";

export default function Nav() {
  const location = useLocation();
  const { openDialog } = useDialog();

  const refreshUserQuery = createRefreshUserQuery();
  const queryClient = useQueryClient();
  const logoutMutation = createLogoutMutation(queryClient);

  const handleLogout = async () => {
    await logoutMutation.mutate();
  };

  const active = (path: string) =>
    path == location.pathname
      ? "border-sky-600"
      : "border-transparent hover:border-sky-600";

  onMount(() => {
    const [attempts, setAttempts] = createSignal(0);
    const maxAttempts = 5; // Adjust as needed

    const checkInterval = setInterval(() => {
      setAttempts((a) => a + 1);

      if (refreshUserQuery?.refetch) {
        clearInterval(checkInterval);
        refreshUserQuery.refetch();
      } else if (attempts() >= maxAttempts) {
        clearInterval(checkInterval);
        console.error(
          "Failed to get refreshUserQuery.refetch after multiple attempts"
        );
      }
    }, 100);
    onCleanup(() => clearInterval(checkInterval));
  });

  const userName = () => {
    if (!refreshUserQuery?.data) {
      return;
    }
    return `${refreshUserQuery?.data?.firstName} ${refreshUserQuery?.data?.lastName}`;
  };

  return (
    <nav class="bg-sky-800">
      <ul class="container flex items-center p-3 text-gray-200 ">
        <li
          class={` ${active("/")} mx-1.5 sm:mx-6 flex-grow font-bold text-lg`}
        >
          <a href="/">Home</a>
        </li>
        <Switch>
          <Match when={!!refreshUserQuery?.data}>
            {userName()}
            <Button onClick={handleLogout} class="ml-2">
              Logout
            </Button>
          </Match>
          <Match when={!refreshUserQuery?.data}>
            <Button onClick={() => openDialog("login")}>Sign in</Button>
          </Match>
        </Switch>
      </ul>
    </nav>
  );
}
