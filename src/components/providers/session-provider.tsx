"use client"
import { SessionProvider as Provider } from "next-auth/react";
import { PropsWithChildren } from "react";

function SessionProvider({ children }: PropsWithChildren) {
  return <Provider>{children}</Provider>;
}

export default SessionProvider;
