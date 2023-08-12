import { Payment } from "@naturechill/db";
import { z } from "zod";
import {
  BookingService,
  GetQuoteSchema,
  validateDateRange,
} from "../services/BookingService";
import { authenticatedMiddleware, t } from "../trpc";
import moment from "moment-timezone";
import Stripe from "stripe";

const CreateCheckoutSessionSchema = z.object({
  guests: z.number(),
  startDate: z.number(),
  endDate: z.number(),
  origin: z.string(),
  email: z.string(),
  amount: z.number(),
});

type CreateCheckoutSessionInput = z.infer<typeof CreateCheckoutSessionSchema>;

const createCheckoutSession = async ({
  guests,
  startDate,
  endDate,
  origin,
  email,
  amount,
}: CreateCheckoutSessionInput) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-11-15",
  });

  try {
    const start = moment(startDate).tz("Europe/Budapest").format("L");
    const end = moment(endDate).tz("Europe/Budapest").format("L");
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "huf",
            product_data: {
              name: "Luxus Faház, Fakopáncs",
              description: `Foglalás: ${start} - ${end}. ${guests} Vendég`,
            },
            unit_amount: amount,
          },

          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel?session_id={CHECKOUT_SESSION_ID}`,
      customer_email: email,
    });
    return session;
  } catch (error) {
    throw new Error("Could not create session");
  }
};

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
      guests: z.number(),
    })
  )
  .mutation(
    async ({ input: { startDate, endDate, paymentKind, guests }, ctx }) => {
      validateDateRange(new Date(startDate), new Date(endDate));

      const start = moment(startDate).tz("Europe/Budapest").hour(14).minute(0);
      const end = moment(endDate).tz("Europe/Budapest").hour(12).minute(0);

      const booking = await BookingService.book({
        startDate: start.toDate(),
        endDate: end.toDate(),
        paymentKind,
        email: ctx.user!.email,
      });

      const session = await createCheckoutSession({
        amount: booking.paymentAmount.deposit,
        email: ctx.user!.email,
        endDate,
        startDate,
        guests,
        origin: ctx.origin ?? "",
      });

      return session.id;
    }
  );

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
