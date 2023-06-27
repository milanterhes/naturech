import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";
import { createContext } from "./context";

export const t = initTRPC.context<typeof createContext>().create({
  transformer: superjson,
});

export const authenticatedMiddleware = t.middleware(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to perform this action",
    });
  }

  const user = ctx.user;

  return next({
    ctx: {
      ...ctx,
      user,
    },
  });
});
