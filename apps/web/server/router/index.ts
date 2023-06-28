import { t } from "../trpc";
import { authRouter } from "./auth";
import bookingRouter from "./booking";

export const appRouter = t.router({
  auth: authRouter,
  booking: bookingRouter,
});

export type AppRouter = typeof appRouter;
