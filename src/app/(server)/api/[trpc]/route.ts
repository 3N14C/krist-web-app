import { appRouter } from "@/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const handler = (req: Request) => {
  return fetchRequestHandler({
    endpoint: "/api",
    req,
    router: appRouter,
    createContext: ({ resHeaders, req }) => {
      return {
        resHeaders,
        req
      };
    },
    
  });
};

export { handler as DELETE, handler as GET, handler as POST, handler as PUT };
