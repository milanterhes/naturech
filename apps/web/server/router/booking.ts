import { Payment } from "@naturechill/db";
import { z } from "zod";
import {
  BookingService,
  GetQuoteSchema,
  validateDateRange,
} from "../services/BookingService";
import { authenticatedMiddleware, t } from "../trpc";
import moment from "moment-timezone";

const getBookings = t.procedure.query(async () => {
  const bookings = await BookingService.getBookings();

  return bookings;
});

const book = t.procedure
  .use(authenticatedMiddleware)
  .input(
    z.object({
      startDate: z.number(),
      endDate: z.number(),
      paymentKind: z.nativeEnum(Payment),
    })
  )
  .mutation(async ({ input: { startDate, endDate, paymentKind }, ctx }) => {
    validateDateRange(new Date(startDate), new Date(endDate));

    const start = moment(startDate).tz("Europe/Budapest").hour(14).minute(0);
    const end = moment(endDate).tz("Europe/Budapest").hour(12).minute(0);

    const booking = await BookingService.book({
      startDate: start.toDate(),
      endDate: end.toDate(),
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
