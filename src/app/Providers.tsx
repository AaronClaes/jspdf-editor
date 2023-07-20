"use client";

import { SnackbarProvider } from "notistack";
import { FC, ReactNode } from "react";

type ProviderProps = {
  children: ReactNode;
};

const Providers: FC<ProviderProps> = ({ children }) => {
  return (
    <SnackbarProvider
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      maxSnack={3}
      autoHideDuration={4000}
    >
      {children}
    </SnackbarProvider>
  );
};

export default Providers;
