import { store } from "@/shared/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { Provider } from "react-redux";

const queryClient = new QueryClient();

interface IProps {
  children?: ReactNode;
}

const Providers = ({ children }: IProps) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
};

export default Providers;
