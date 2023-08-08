import { Payment } from "@naturechill/db";
import { z } from "zod";
import {
  BookingService,
  GetBookingsSchema,
  GetQuoteSchema,
  validateDateRange,
} from "../services/BookingService";
import { authenticatedMiddleware, t } from "../trpc";

const getBookings = t.procedure
  .input(GetBookingsSchema)
  .query(async ({ input: { startDate, endDate } }) => {
    validateDateRange(new Date(startDate), new Date(endDate));
    const bookings = await BookingService.getBookings({
      startDate,
      endDate,
    });

    return bookings;
  });

const book = t.procedure
  .use(authenticatedMiddleware)
  .input(
    z.object({
      startDate: z.string().nonempty(),
      endDate: z.string().nonempty(),
      paymentKind: z.nativeEnum(Payment),
    })
  )
  .mutation(async ({ input: { startDate, endDate, paymentKind }, ctx }) => {
    validateDateRange(new Date(startDate), new Date(endDate));

    const booking = await BookingService.book({
      startDate,
      endDate,
      paymentKind,
      email: ctx.user!.email,
    });

    return booking;
  });

const getQuote = t.procedure
  .input(GetQuoteSchema)
  .query(async ({ input: { startDate, endDate, paymentKind } }) => {
    validateDateRange(new Date(startDate), new Date(endDate));

    const totalCost = BookingService.calculateTotalCost(
      new Date(startDate),
      new Date(endDate),
      paymentKind
    );

    return {
      amount: totalCost,
    };
  });

const bookingRouter = t.router({
  getBookings,
  book,
  getQuote,
});

export default bookingRouter;
