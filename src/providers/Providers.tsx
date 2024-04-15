"use client";

import { FC, ReactNode, useState } from "react";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "@/trpc-client/client";
import { httpBatchLink } from "@trpc/client";
import { EdgeStoreProvider } from "@/lib/edgestore";

export const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "https://krist-web-app.vercel.app/api",
        }),
      ],
    })
  );

  return (
    <trpc.Provider queryClient={queryClient} client={trpcClient}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" enableSystem>
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
};
