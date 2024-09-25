// src/contexts/DialogContext.tsx
import { createContext, useContext, JSX, createSignal } from "solid-js";

type DialogType = "login" | "createAccount" | "createTimeline" | "other";

type DialogContextType = {
  openDialog: (type: DialogType) => void;
  closeDialog: () => void;
  dialogState: () => { isOpen: boolean; type: DialogType | null };
};

const DialogContext = createContext<DialogContextType>({
  openDialog: () => {},
  closeDialog: () => {},
  dialogState: () => ({ isOpen: false, type: null }),
});

export function DialogProvider(props: { children: JSX.Element }) {
  const [dialogState, setDialogState] = createSignal<{
    isOpen: boolean;
    type: DialogType | null;
  }>({
    isOpen: false,
    type: null,
  });

  const openDialog = (type: DialogType) => {
    setDialogState({ isOpen: true, type });
  };

  const closeDialog = () => {
    setDialogState({ isOpen: false, type: null });
  };

  return (
    <DialogContext.Provider
      value={{
        openDialog,
        closeDialog,
        dialogState,
      }}
    >
      {props.children}
    </DialogContext.Provider>
  );
}

export function useDialog() {
  return useContext(DialogContext);
}
