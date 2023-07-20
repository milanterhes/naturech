import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { PrismaClient, BookingStatus } from "@naturechill/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"]!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
      res.json({ received: true });
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    console.log(`Received event: ${event.type}`);
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log(session);

      const prisma = new PrismaClient();
      try {
        await prisma.booking.update({
          where: { sessionId: session.id },
          data: { status: BookingStatus.CONFIRMED },
        });

        console.log(`Booking updated for session ${session.id}`);
      } catch (error) {
        console.error(
          `Error updating booking for session ${session.id}:`,
          error
        );
        res.status(500).send(`Error updating booking: ${error.message}`);
        return;
      }
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
