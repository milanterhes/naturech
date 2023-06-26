import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { verifyToken } from "./jwt";
import { TokenPayload } from "../utils/client-jwt";

interface ContextPayload {
  user?: TokenPayload;
}

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
export async function createContextInner(
  opts: trpcNext.CreateNextContextOptions
): Promise<ContextPayload> {
  const token = opts?.req.cookies?.token;
  const result = {};

  if (token) {
    try {
      const payload = verifyToken(token);
      Object.assign(result, { user: payload });
    } catch (error) {
      console.error("Failed to verify token", error);
    }
  }

  return result;
}

export type Context = trpc.inferAsyncReturnType<typeof createContextInner>;

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext(
  opts: trpcNext.CreateNextContextOptions
): Promise<Context> {
  // for API-response caching see https://trpc.io/docs/caching

  return await createContextInner(opts);
}
