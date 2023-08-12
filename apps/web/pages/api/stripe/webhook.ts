import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { Booking, BookingStatus } from "@naturechill/db";
import { prisma } from "../../../server/prisma";
import { getSanitizedConfig } from "@naturechill/utils";
import resend from "../../../utils/resend";
import { BookingConfirmationEmail } from "@naturechill/emails";
import logo from "../../../public/naturechill-logo.png";
import { getBaseUrl } from "../../../utils/trpc";

interface Env {
  STRIPE_SECRET_KEY: string;
}

const env = getSanitizedConfig<Env>({
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ?? "",
});

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

interface BookingConfirmationEmailInput {
  name: string;
  booking: Booking;
  to: string;
}

function sendBookingConfirmationEmail({
  booking,
  name,
  to,
}: BookingConfirmationEmailInput) {
  return resend.sendEmail({
    from: "Nature & Chill Treehouses <info@naturechill.hu>",
    to,
    subject: "Köszönjük a foglalásod!",
    react: BookingConfirmationEmail({
      logo: `${getBaseUrl()}/${logo.src}`,
      intro: "Köszönjük a foglalásodat!",
      salutation: `Kedves ${name}!`,
      timePeriod: `Érkezés: ${booking.startDate.toLocaleDateString()} - Távozás: ${booking.endDate.toLocaleDateString()}`,
      paymentType: `Fizetés módja: ${booking.payment}`,
      bookingId: `Rendelés azonosito: ${
        booking.id
      } (${booking.createdAt.toLocaleDateString()})`,
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    }),
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Webhook received");
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"]!;
    console.log("Stripe Signature:", req.headers["stripe-signature"]);

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err) {
      console.error("Error constructing event:", err);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    console.log(`Received event: ${event.type}`);
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log(
        `Received checkout.session.completed event for session ${session}`
      );

      const paymentIntentId =
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : null;

      try {
        const booking = await prisma.booking.update({
          where: { sessionId: session.id },
          data: { status: BookingStatus.CONFIRMED, paymentIntentId },
        });

        if (session.customer_email) {
          sendBookingConfirmationEmail({
            booking,
            name: session.customer_details?.name ?? "User",
            to: session.customer_email,
          });
        }

        console.log(`Booking updated for session ${session.id}`);
        res.json({ received: true });
      } catch (error) {
        console.error(
          `Error updating booking for session ${session.id}:`,
          error
        );
        res.status(500).send(`Error updating booking: ${error.message}`);
        return;
      }
    } else {
      res.json({ received: true });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
