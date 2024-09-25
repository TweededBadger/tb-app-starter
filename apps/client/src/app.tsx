import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { MetaProvider, Title } from "@solidjs/meta";
import { ErrorBoundary, Suspense } from "solid-js";
import Nav from "./components/Nav";
import "@fontsource-variable/manrope";
import "./app.css";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { DialogProvider } from "./context/DialogContext";
import { DialogManager } from "./components/DialogManager";

const queryClient = new QueryClient();

export const getQueryClient = () => {
  if (typeof window !== "undefined") {
    return queryClient;
  } else {
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 0,
          refetchOnMount: true,
          refetchOnWindowFocus: true,
        },
      },
    });
  }
};

export default function App() {
  return (
    <MetaProvider>
      <ErrorBoundary
        fallback={(err) => (
          <div>
            Error: {err.message}
            <pre>{err.stack}</pre>
          </div>
        )}
      >
        <Title>APP TITLE</Title>
        <QueryClientProvider client={getQueryClient()}>
          {/* <SolidQueryDevtools initialIsOpen={false} /> */}
          <DialogProvider>
            <Router
              root={(props) => (
                <>
                  <Nav />
                  <Suspense>{props.children}</Suspense>

                  <DialogManager />
                </>
              )}
            >
              <FileRoutes />
            </Router>
          </DialogProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </MetaProvider>
  );
}
