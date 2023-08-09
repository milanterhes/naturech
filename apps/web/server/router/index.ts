import { t } from "../trpc";
import { authRouter } from "./auth";
import bookingRouter from "./booking";
import { contactRouter } from "./contact";

export const appRouter = t.router({
  auth: authRouter,
  booking: bookingRouter,
  contact: contactRouter,
});

export type AppRouter = typeof appRouter;
