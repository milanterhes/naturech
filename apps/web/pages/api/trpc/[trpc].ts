import * as trpcNext from "@trpc/server/adapters/next";
import { createContext } from "../../../server/context";
import { appRouter } from "../../../server/router";
import { Logger } from "next-axiom";

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
  onError: async ({ error }) => {
    if (error.code === "INTERNAL_SERVER_ERROR") {
      const log = new Logger();
      const { code, message, name, cause } = error;
      log.error(message, {
        code,
        message,
        name,
        cause,
      });
      await log.flush();
    }
  },
  batching: {
    enabled: false,
  },
});
