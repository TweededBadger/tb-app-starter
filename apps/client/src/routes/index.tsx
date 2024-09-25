import { For, Match, Switch } from "solid-js";
import { Button } from "~/components/ui/button";
import { useDialog } from "~/context/DialogContext";
import { createRefreshUserQuery } from "~/lib/pocketbaseQuery";

export default function Home() {
  const { openDialog } = useDialog();

  const refreshUserQuery = createRefreshUserQuery();

  const userName = () => {
    if (!refreshUserQuery?.data) {
      return;
    }
    return `${refreshUserQuery?.data?.firstName} ${refreshUserQuery?.data?.lastName}`;
  };

  return (
    <main class=" mb-4">
      <div class=" full-w flex justify-center lg:p-20 md:p-10 px-4 py-20 ">
        <div class="w-screen-lg ">
          <Switch>
            <Match when={!!refreshUserQuery?.data}>
              <>Hello {userName()}!</>
            </Match>
            <Match when={!refreshUserQuery?.data}>
              <div class="flex flex-col align-middle items-center">
                <h2 class="text-4xl font-bold mb-2">
                  Create an account or login
                </h2>
                <div>
                  <Button
                    class="text-lg"
                    onClick={() => openDialog("createAccount")}
                  >
                    Create Account
                  </Button>
                  <span class="px-2">or</span>
                  <Button class="text-lg" onClick={() => openDialog("login")}>
                    Sign in
                  </Button>
                </div>
              </div>
            </Match>
          </Switch>
        </div>
      </div>
    </main>
  );
}
