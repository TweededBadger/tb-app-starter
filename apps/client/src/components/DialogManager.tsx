import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import LoginForm from "./LoginForm";
import CreateUserForm from "./CreateUserForm";
import { useDialog } from "~/context/DialogContext";
import { Button } from "./ui/button";
export function DialogManager() {
  const { dialogState, closeDialog, openDialog } = useDialog();

  const handleLoginSuccess = async () => {
    closeDialog();
  };

  return (
    <Dialog
      open={dialogState().isOpen}
      onOpenChange={(isOpen) => !isOpen && closeDialog()}
    >
      <DialogContent class="sm:max-w-[425px]">
        {dialogState().type === "login" && (
          <>
            <DialogHeader>
              <DialogTitle>Sign in to your account</DialogTitle>
            </DialogHeader>
            <LoginForm onLogin={handleLoginSuccess} />

            <div class="flex items-center my-2">
              <div class="flex-grow border-b border-gray-300"></div>
              <div class="mx-4 text-gray-500">or</div>
              <div class="flex-grow border-b border-gray-300"></div>
            </div>
            <Button
              onClick={() => openDialog("createAccount")}
              variant={"outline"}
            >
              Create an account
            </Button>
          </>
        )}
        {dialogState().type === "createAccount" && (
          <>
            <DialogHeader>
              <DialogTitle>Create a new account</DialogTitle>
            </DialogHeader>
            <CreateUserForm
              onSuccess={() => {
                closeDialog();
                openDialog("login");
              }}
            />

            <div class="flex items-center my-2">
              <div class="flex-grow border-b border-gray-300"></div>
              <div class="mx-4 text-gray-500">or</div>
              <div class="flex-grow border-b border-gray-300"></div>
            </div>
            <Button onClick={() => openDialog("login")} variant={"outline"}>
              Sign in
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
