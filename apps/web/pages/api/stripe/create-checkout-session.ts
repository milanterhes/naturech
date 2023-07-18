import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { PrismaClient } from "@naturechill/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, house1, guests, startDate, endDate } = req.body;
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "huf",
              product_data: {
                name: "Luxus Faház, Fakopáncs",
                description: `Guest number: ${guests}`,
              },
              unit_amount: 120000.0,
            },

            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cancel?session_id={CHECKOUT_SESSION_ID}`,
        customer_email: email,
      });
      const prisma = new PrismaClient();
      const newBooking = await prisma.booking.create({
        data: {
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          user: {
            connect: {
              email: email,
            },
          },
          status: "PENDING",
          payment: "CARD",
          paymentAmount: {
            deposit: 120000.0,
            cash: 0,
          },
          sessionId: session.id,
        },
      });
      res.status(200).json({ sessionId: session.id });
    } catch (error) {
      res.status(500).json({ statusCode: 500, message: error.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
